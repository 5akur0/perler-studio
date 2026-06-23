const crypto = require("crypto");
const cloud = require("@cloudbase/node-sdk");

const app = cloud.init({ env: cloud.SYMBOL_CURRENT_ENV });
const db = app.database();
const _ = db.command;

const SHARES = "shares";
const GALLERY_SUBMISSIONS = "gallery_submissions";
const GALLERY_ITEMS = "gallery_items";
const SHORT_ID_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const SHORT_ID_LENGTH = 8;
const MAX_SHORT_ID_ATTEMPTS = 8;
const DEFAULT_NAME = "Untitled Pattern";
const MAX_NAME_LENGTH = 40;
const MAX_AUTHOR_LENGTH = 24;
// 64KB covers the worst-case 90×90 board (RLE ≈ 32KB + a 4096-char palette
// header + headroom) while denying multi-hundred-KB storage-abuse payloads.
const MAX_PATTERN_CODE_LENGTH = 64 * 1024;
// Largest snap-together board the studio renders (3×3 tiles of 30). Mirrors
// MAX_PATTERN_DIMENSION in src/pattern-code.js; rectangles are legal.
const MAX_PATTERN_DIMENSION = 90;
const MAX_PATTERN_CELLS = MAX_PATTERN_DIMENSION * MAX_PATTERN_DIMENSION;
const SHARE_TTL_DAYS = 7;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_PER_IP = 12;
const ADMIN_RATE_LIMIT_WINDOW_MS = 60 * 1000;
const ADMIN_RATE_LIMIT_MAX_PER_IP = 30;
const ADMIN_AUTH_WINDOW_MS = 10 * 60 * 1000;
const ADMIN_AUTH_MAX_FAILURES = 5;
const ADMIN_LOCK_MS = 15 * 60 * 1000;
const CLEANUP_INTERVAL_MS = 15 * 60 * 1000;
const CLEANUP_BATCH_SIZE = 200;
let lastCleanupAt = 0;
const RATE_LIMITS = "rate_limits";
const ADMIN_GUARDS = "admin_guards";

const DEFAULT_ALLOWED_ORIGINS = [
  "https://beam-prod-d7g2xz88ee6532631-1438742199.ap-shanghai.app.tcloudbase.com",
  "https://beam-prod-d7g2xz88ee6532631-1438742199.tcloudbaseapp.com",
  "https://perler-studio.pages.dev",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

function getAllowedOrigins() {
  const raw = String(process.env.ALLOWED_ORIGINS || "");
  const envOrigins = raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return new Set(envOrigins.length ? envOrigins : DEFAULT_ALLOWED_ORIGINS);
}

function pickAllowedOrigin(event) {
  const headers = event?.headers || {};
  const origin = String(headers.origin || headers.Origin || "").trim();
  if (!origin) return "";
  return getAllowedOrigins().has(origin) ? origin : "";
}

function responseHeaders(event) {
  const origin = pickAllowedOrigin(event);
  const headers = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "access-control-allow-methods": "POST,OPTIONS",
    "access-control-allow-headers": "content-type,x-admin-token",
    vary: "origin",
  };
  if (origin) headers["access-control-allow-origin"] = origin;
  return headers;
}

function json(event, data, statusCode = 200, extraHeaders = {}) {
  return {
    statusCode,
    headers: { ...responseHeaders(event), ...extraHeaders },
    body: JSON.stringify(data),
  };
}

function error(event, status, code, message, extra = {}, extraHeaders = {}) {
  return json(event, { ok: false, error: { code, message, ...extra } }, status, extraHeaders);
}

function createHttpError(statusCode, code, message, extra = {}, extraHeaders = {}) {
  const err = new Error(message);
  err.statusCode = statusCode;
  err.errorCode = code;
  err.errorExtra = extra;
  err.errorHeaders = extraHeaders;
  return err;
}

function hashText(value) {
  return crypto.createHash("sha256").update(String(value || "")).digest("hex");
}

// Keyed hash for stored client IPs. A bare SHA-256 over IPv4 (≈4B values) is
// brute-forceable, so HMAC with a server secret blocks dictionary reversal. If
// IP_HASH_SECRET is unset we fall back to the plain hash — still better than the
// previous plaintext, and avoids hard-failing submissions on a missing env var.
function hashIp(value) {
  const secret = String(process.env.IP_HASH_SECRET || "");
  if (!secret) return hashText(value);
  return crypto.createHmac("sha256", secret).update(String(value || "")).digest("hex");
}

function rateLimitDocId(scope, ip) {
  return `${scope}_${hashText(ip).slice(0, 32)}`;
}

function firstDoc(result) {
  const data = result?.data;
  if (Array.isArray(data)) return data[0] || null;
  return data || null;
}

function timingSafeTokenEquals(a, b) {
  const aDigest = crypto.createHash("sha256").update(String(a || "")).digest();
  const bDigest = crypto.createHash("sha256").update(String(b || "")).digest();
  return crypto.timingSafeEqual(aDigest, bDigest);
}

function rateLimitRetryAfterSeconds(windowMs, windowStartMs) {
  return Math.max(1, Math.ceil((windowStartMs + windowMs - Date.now()) / 1000));
}

async function consumeRateLimit(scope, ip, windowMs, maxPerWindow) {
  const docId = rateLimitDocId(scope, ip);
  const now = Date.now();
  const nowIso = new Date(now).toISOString();
  return db.runTransaction(async (transaction) => {
    const doc = transaction.collection(RATE_LIMITS).doc(docId);
    const snap = await doc.get();
    const current = firstDoc(snap) || {};
    let windowStartMs = Number(current.windowStartMs) || now;
    let count = Number(current.count) || 0;
    if (!Number.isFinite(windowStartMs) || now - windowStartMs >= windowMs) {
      windowStartMs = now;
      count = 0;
    }
    count += 1;
    const next = {
      scope,
      ipHash: hashText(ip),
      windowStartMs,
      count,
      windowMs,
      maxPerWindow,
      updatedAt: nowIso,
      lastSeenAt: nowIso,
    };
    await doc.set(next);
    if (count > maxPerWindow) {
      throw createHttpError(
        429,
        "rate_limited",
        "Too many requests.",
        { retryAfterSeconds: rateLimitRetryAfterSeconds(windowMs, windowStartMs) },
        { "retry-after": String(rateLimitRetryAfterSeconds(windowMs, windowStartMs)) },
      );
    }
    return next;
  });
}

async function readAdminGuard(ip) {
  const docId = rateLimitDocId("admin", ip);
  const result = await db.collection(ADMIN_GUARDS).doc(docId).get();
  return firstDoc(result) || { docId };
}

async function recordAdminFailure(ip) {
  const docId = rateLimitDocId("admin", ip);
  const now = Date.now();
  const nowIso = new Date(now).toISOString();
  return db.runTransaction(async (transaction) => {
    const doc = transaction.collection(ADMIN_GUARDS).doc(docId);
    const snap = await doc.get();
    const raw = firstDoc(snap) || {};
    // Strip _id so doc.set() doesn't try to overwrite the immutable primary key.
    const { _id: _ignored, ...current } = raw;
    let failWindowStartMs = Number(current.failWindowStartMs) || now;
    let failCount = Number(current.failCount) || 0;
    if (!Number.isFinite(failWindowStartMs) || now - failWindowStartMs >= ADMIN_AUTH_WINDOW_MS) {
      failWindowStartMs = now;
      failCount = 0;
    }
    failCount += 1;
    const next = {
      ...current,
      scope: "admin",
      ipHash: hashText(ip),
      failWindowStartMs,
      failCount,
      updatedAt: nowIso,
      lastFailureAt: nowIso,
      lastSeenAt: nowIso,
    };
    if (failCount >= ADMIN_AUTH_MAX_FAILURES) {
      next.lockedUntilMs = now + ADMIN_LOCK_MS;
      next.lockReason = "auth_failure";
      next.failWindowStartMs = now;
      next.failCount = 0;
    }
    await doc.set(next);
    return next;
  });
}

async function clearAdminFailures(ip) {
  const docId = rateLimitDocId("admin", ip);
  const nowIso = new Date().toISOString();
  await db.collection(ADMIN_GUARDS).doc(docId).set({
    scope: "admin",
    ipHash: hashText(ip),
    failWindowStartMs: Date.now(),
    failCount: 0,
    lockedUntilMs: 0,
    lockReason: "",
    updatedAt: nowIso,
    lastSuccessAt: nowIso,
    lastSeenAt: nowIso,
  });
}

async function consumeAdminRequestBudget(ip) {
  await consumeRateLimit("admin_request", ip, ADMIN_RATE_LIMIT_WINDOW_MS, ADMIN_RATE_LIMIT_MAX_PER_IP);
}

function normalizeName(value) {
  const cleaned = String(value || "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim();
  const normalized = (cleaned || DEFAULT_NAME).slice(0, MAX_NAME_LENGTH);
  if (/[<>"'`\\]/.test(normalized)) {
    throw new Error("name contains unsafe characters.");
  }
  return normalized;
}

function normalizePatternCode(value) {
  const patternCode = String(value || "").trim();
  if (!patternCode) throw new Error("patternCode is required.");
  if (patternCode.length > MAX_PATTERN_CODE_LENGTH) throw new Error("patternCode is too large.");
  return patternCode;
}

function normalizeAuthor(value) {
  const cleaned = String(value || "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, MAX_AUTHOR_LENGTH);
  if (/[<>"'`\\]/.test(cleaned)) {
    throw new Error("author contains unsafe characters.");
  }
  return cleaned;
}

// Single bounds/semantic check shared by share-create AND gallery-submit so the
// server never accepts a code the client (src/pattern-code.js, same 90×90 /
// 8100-cell limit) would refuse to decode. Rectangles are allowed: boards are
// 30×30 tiles snapped together into any bounding box up to 3×3 tiles, so a
// finished work can legitimately be 90×30. The pattern code always serialises
// that bounding rectangle (absent tiles are empty cells), which is exactly what
// these dimensions bound — capping width*height also disarms RLE expansion on
// decode. `width`/`height` are returned so callers can persist the true shape
// instead of a single lossy `size`.
function parseShareCode(patternCode) {
  const code = normalizePatternCode(patternCode);
  const match = code.match(/^BEAM1:(\d+)x(\d+):[^:]{1,4096}:[0-9A-Za-z.]+$/);
  if (!match) throw new Error("Invalid pattern code.");
  const width = Number.parseInt(match[1], 10);
  const height = Number.parseInt(match[2], 10);
  if (
    !width ||
    !height ||
    width > MAX_PATTERN_DIMENSION ||
    height > MAX_PATTERN_DIMENSION ||
    width * height > MAX_PATTERN_CELLS
  ) {
    throw new Error("Invalid pattern size.");
  }
  return { patternCode: code, width, height, size: Math.max(width, height) };
}

function normalizeShortId(value) {
  const shortId = String(value || "").trim();
  const pattern = new RegExp(`^[${SHORT_ID_ALPHABET}]{${SHORT_ID_LENGTH}}$`);
  if (!pattern.test(shortId)) throw new Error("Invalid share code.");
  return shortId;
}

function randomShortId() {
  let out = "";
  for (let i = 0; i < SHORT_ID_LENGTH; i += 1) {
    out += SHORT_ID_ALPHABET[Math.floor(Math.random() * SHORT_ID_ALPHABET.length)];
  }
  return out;
}

function parseBody(event) {
  if (!event || event.body == null) return {};
  if (typeof event.body === "object") return event.body;
  if (typeof event.body === "string") {
    const body = event.body.trim();
    if (!body) return {};
    return JSON.parse(body);
  }
  return {};
}

function getPath(event, context) {
  const p = event?.path || context?.httpContext?.path || context?.httpContext?.url || "/";
  const onlyPath = String(p).split("?")[0].replace(/\/+$/, "");
  return onlyPath || "/";
}

function isCreatePath(path) {
  return path.endsWith("/api/share/create") || path.endsWith("/share/create") || path.endsWith("/create");
}

function isOpenPath(path) {
  return path.endsWith("/api/share/open") || path.endsWith("/share/open") || path.endsWith("/open");
}

function isGallerySubmitPath(path) {
  return path.endsWith("/api/gallery/submit") || path.endsWith("/gallery/submit");
}

function isGalleryListPath(path) {
  return path.endsWith("/api/gallery/list") || path.endsWith("/gallery/list");
}

function isGalleryPendingPath(path) {
  return path.endsWith("/api/gallery/pending") || path.endsWith("/gallery/pending");
}

function isGalleryApprovePath(path) {
  return path.endsWith("/api/gallery/approve") || path.endsWith("/gallery/approve");
}

function isGalleryRejectPath(path) {
  return path.endsWith("/api/gallery/reject") || path.endsWith("/gallery/reject");
}

function isGalleryUnpublishPath(path) {
  return path.endsWith("/api/gallery/unpublish") || path.endsWith("/gallery/unpublish");
}

function isGalleryDeletePath(path) {
  return path.endsWith("/api/gallery/delete") || path.endsWith("/gallery/delete");
}

function nowIso() {
  return new Date().toISOString();
}

function expireIso() {
  return new Date(Date.now() + SHARE_TTL_DAYS * 24 * 60 * 60 * 1000).toISOString();
}

function clientIp(event, context) {
  // 平台注入的来源 IP 不可被客户端伪造，优先采用——否则攻击者可用伪造的
  // X-Forwarded-For 每请求换 IP，绕过 admin 锁定（5 次/15 分钟）与限流（12 次/分钟）。
  const platformIp = String(context?.requestContext?.sourceIp || context?.httpContext?.sourceIp || "").trim();
  if (platformIp) return platformIp;
  // 仅当平台未提供来源 IP（如本地调试）时才回退到可伪造的头部。
  const headers = event?.headers || {};
  const forwarded = String(headers["x-forwarded-for"] || headers["X-Forwarded-For"] || "").trim();
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = String(headers["x-real-ip"] || headers["X-Real-Ip"] || "").trim();
  if (realIp) return realIp;
  return "unknown";
}

async function cleanupCollectionWhere(filter) {
  const result = await db.collection(SHARES).where(filter).limit(CLEANUP_BATCH_SIZE).get();
  const rows = result.data || [];
  await Promise.all(rows.map((row) => (row?._id ? db.collection(SHARES).doc(row._id).remove() : null)));
  return rows.length;
}

async function maybeCleanupExpiredShares() {
  const now = Date.now();
  if (now - lastCleanupAt < CLEANUP_INTERVAL_MS) return;
  lastCleanupAt = now;
  const nowStr = new Date(now).toISOString();
  await cleanupCollectionWhere({ status: "expired" });
  const expired = await db.collection(SHARES).where({ expiresAt: _.lte(nowStr) }).limit(CLEANUP_BATCH_SIZE).get();
  const rows = expired.data || [];
  if (!rows.length) return;
  await Promise.all(
    rows.map((row) => (
      row?._id
        ? db.collection(SHARES).doc(row._id).update({ status: "expired", updatedAt: nowStr })
        : null
    )),
  );
  await cleanupCollectionWhere({ status: "expired" });
}

async function createShare(payload) {
  const name = normalizeName(payload.name);
  const { patternCode } = parseShareCode(payload.patternCode);

  for (let i = 0; i < MAX_SHORT_ID_ATTEMPTS; i += 1) {
    const shortId = randomShortId();
    const exists = await db.collection(SHARES).where({ shortId }).limit(1).get();
    if (exists.data && exists.data.length) continue;

    const createdAt = nowIso();
    const expiresAt = expireIso();
    await db.collection(SHARES).add({
      shortId,
      name,
      patternCode,
      status: "active",
      createdAt,
      updatedAt: createdAt,
      expiresAt,
    });
    return { shortId, name, expiresAt };
  }

  throw new Error("Failed to allocate unique short code.");
}

async function openShare(payload) {
  const shortId = normalizeShortId(payload.shortId);
  const result = await db.collection(SHARES).where({ shortId }).limit(1).get();
  const row = result.data && result.data[0];
  if (!row || row.status !== "active") throw new Error("Invalid share code.");

  if (new Date(row.expiresAt).getTime() <= Date.now()) {
    if (row._id) {
      await db.collection(SHARES).doc(row._id).update({ status: "expired", updatedAt: nowIso() });
    }
    throw new Error("Share code has expired.");
  }
  return {
    shortId: row.shortId,
    name: row.name,
    patternCode: row.patternCode,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
    expiresAt: row.expiresAt,
  };
}

async function requireAdmin(event, payload, context) {
  const configured = String(process.env.ADMIN_TOKEN || "").trim();
  if (!configured) throw new Error("Admin token is not configured.");
  const headers = event?.headers || {};
  // The token must travel in the header, never the JSON body — body payloads are
  // the thing gateways and function logs capture. Reject body tokens outright so
  // a stale client can't silently leak the secret into logs.
  if (payload && payload.adminToken != null) {
    throw createHttpError(400, "admin_token_in_body", "Send the admin token in the x-admin-token header, not the body.");
  }
  const provided = String(headers["x-admin-token"] || headers["X-Admin-Token"] || "").trim();
  const ip = clientIp(event, context);
  await consumeAdminRequestBudget(ip);
  const guard = await readAdminGuard(ip);
  const lockedUntilMs = Number(guard?.lockedUntilMs) || 0;
  if (lockedUntilMs > Date.now()) {
    const retryAfterSeconds = Math.max(1, Math.ceil((lockedUntilMs - Date.now()) / 1000));
    throw createHttpError(
      429,
      "admin_locked",
      "Too many failed admin attempts. Please wait and try again.",
      { retryAfterSeconds },
      { "retry-after": String(retryAfterSeconds) },
    );
  }
  if (!provided || !timingSafeTokenEquals(provided, configured)) {
    const next = await recordAdminFailure(ip);
    const nextLockedUntilMs = Number(next?.lockedUntilMs) || 0;
    if (nextLockedUntilMs > Date.now()) {
      const retryAfterSeconds = Math.max(1, Math.ceil((nextLockedUntilMs - Date.now()) / 1000));
      throw createHttpError(
        429,
        "admin_locked",
        "Too many failed admin attempts. Please wait and try again.",
        { retryAfterSeconds },
        { "retry-after": String(retryAfterSeconds) },
      );
    }
    throw createHttpError(401, "unauthorized", "Unauthorized.");
  }
  await clearAdminFailures(ip);
}

function publicGalleryItem(row) {
  return {
    id: row.publicId || row._id || "",
    name: row.name,
    author: row.author || "",
    patternCode: row.patternCode,
    size: row.size,
    // Persisted shape; fall back to the square `size` for legacy rows.
    width: row.width ?? row.size,
    height: row.height ?? row.size,
    publishedAt: row.publishedAt,
  };
}

async function submitGallery(payload, event, context) {
  const name = normalizeName(payload.name || "投稿图纸");
  const author = normalizeAuthor(payload.author);
  // Same bounds as share-create and the client decoder; rectangles preserved.
  const { patternCode, width, height, size } = parseShareCode(payload.patternCode);
  const createdAt = nowIso();
  const result = await db.collection(GALLERY_SUBMISSIONS).add({
    name,
    author,
    patternCode,
    size,
    width,
    height,
    status: "pending",
    createdAt,
    updatedAt: createdAt,
    // Store a keyed hash, not the raw IP — abuse triage only needs to correlate,
    // and a bare SHA-256 over the tiny IPv4 space is trivially reversed.
    clientIpHash: hashIp(clientIp(event, context)),
  });
  return { id: result?.id || result?._id || "", status: "pending", createdAt };
}

async function listGallery(payload) {
  const limit = Math.max(1, Math.min(96, Number.parseInt(payload.limit, 10) || 48));
  // Order in the DB so .limit() keeps the newest rows, not an arbitrary slice.
  // The JS sort stays as a defensive fallback in case CloudBase ignores orderBy
  // without a matching index.
  const result = await db.collection(GALLERY_ITEMS)
    .where({ status: "published" })
    .orderBy("publishedAt", "desc")
    .limit(limit)
    .get();
  const rows = (result.data || [])
    .sort((a, b) => String(b.publishedAt || "").localeCompare(String(a.publishedAt || "")));
  return { items: rows.map(publicGalleryItem) };
}

async function listPendingGallery(payload, event, context) {
  await requireAdmin(event, payload, context);
  const limit = Math.max(1, Math.min(96, Number.parseInt(payload.limit, 10) || 48));
  // Newest-first in the DB so .limit() keeps the most recent submissions;
  // JS sort remains as a defensive fallback (see listGallery).
  const result = await db.collection(GALLERY_SUBMISSIONS)
    .where({ status: "pending" })
    .orderBy("createdAt", "desc")
    .limit(limit)
    .get();
  return {
    items: (result.data || [])
      .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")))
      .map((row) => ({
        id: row._id,
        name: row.name,
        author: row.author || "",
        patternCode: row.patternCode,
        size: row.size,
        width: row.width ?? row.size,
        height: row.height ?? row.size,
        status: row.status,
        createdAt: row.createdAt,
      })),
  };
}

async function approveGallery(payload, event, context) {
  await requireAdmin(event, payload, context);
  const id = String(payload.id || "").trim();
  if (!id) throw new Error("id is required.");
  const result = await db.collection(GALLERY_SUBMISSIONS).doc(id).get();
  const submission = result.data && (Array.isArray(result.data) ? result.data[0] : result.data);
  if (!submission || submission.status !== "pending") throw new Error("Submission not found.");
  const now = nowIso();
  // Atomically claim the submission before publishing. The conditional update
  // only matches while status is still "pending", so concurrent double-clicks or
  // retries lose the race (updated === 0) and cannot create duplicate public
  // items. Publish only after winning the claim.
  const claim = await db.collection(GALLERY_SUBMISSIONS)
    .where({ _id: id, status: "pending" })
    .update({ status: "approved", reviewedAt: now, updatedAt: now });
  if (!claim || !claim.updated) throw new Error("Submission already processed.");
  const publicId = `gal-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
  try {
    await db.collection(GALLERY_ITEMS).add({
      publicId,
      submissionId: id,
      name: submission.name,
      author: submission.author || "",
      patternCode: submission.patternCode,
      size: submission.size,
      width: submission.width ?? submission.size,
      height: submission.height ?? submission.size,
      status: "published",
      createdAt: submission.createdAt,
      publishedAt: now,
      updatedAt: now,
    });
  } catch (publishError) {
    // The claim already flipped the submission to "approved". If publishing the
    // public item fails we'd otherwise leave an "approved" submission with no
    // gallery item — lost, not just unpublished. Compensate by releasing the
    // claim back to "pending" so the next review attempt can retry cleanly.
    await db.collection(GALLERY_SUBMISSIONS).doc(id).update({
      status: "pending",
      reviewedAt: "",
      updatedAt: nowIso(),
    });
    throw publishError;
  }
  return { id, publicId, status: "approved" };
}

async function rejectGallery(payload, event, context) {
  await requireAdmin(event, payload, context);
  const id = String(payload.id || "").trim();
  if (!id) throw new Error("id is required.");
  const now = nowIso();
  await db.collection(GALLERY_SUBMISSIONS).doc(id).update({
    status: "rejected",
    reviewedAt: now,
    updatedAt: now,
  });
  return { id, status: "rejected" };
}

async function getDoc(collection, docId) {
  if (!docId) return null;
  const snap = await db.collection(collection).doc(docId).get();
  const data = snap?.data;
  if (Array.isArray(data)) return data[0] || null;
  return data || null;
}

async function removeDocIfExists(collection, docId) {
  const row = await getDoc(collection, docId);
  if (!row) return false;
  await db.collection(collection).doc(docId).remove();
  return true;
}

// Move a published gallery item back to the pending review queue ("-").
async function unpublishGallery(payload, event, context) {
  await requireAdmin(event, payload, context);
  const publicId = String(payload.publicId || payload.id || "").trim();
  if (!publicId) throw new Error("publicId is required.");
  const result = await db.collection(GALLERY_ITEMS).where({ publicId }).limit(1).get();
  const item = (result.data || [])[0];
  if (!item) throw new Error("Gallery item not found.");
  const now = nowIso();
  if (item._id) await db.collection(GALLERY_ITEMS).doc(item._id).remove();
  let submissionId = item.submissionId || "";
  // Reactivate the source submission if it still exists; otherwise recreate one
  // so the pattern reappears in the pending queue rather than vanishing.
  const existing = submissionId ? await getDoc(GALLERY_SUBMISSIONS, submissionId) : null;
  if (existing) {
    await db.collection(GALLERY_SUBMISSIONS).doc(submissionId).update({
      status: "pending",
      reviewedAt: "",
      updatedAt: now,
    });
  } else {
    const added = await db.collection(GALLERY_SUBMISSIONS).add({
      name: item.name,
      author: item.author || "",
      patternCode: item.patternCode,
      size: item.size,
      status: "pending",
      createdAt: item.createdAt || now,
      updatedAt: now,
    });
    submissionId = added?.id || added?._id || "";
  }
  return { publicId, submissionId, status: "pending" };
}

// Permanently remove a submission and/or its published gallery item ("🗑").
async function deleteGallery(payload, event, context) {
  await requireAdmin(event, payload, context);
  const publicId = String(payload.publicId || "").trim();
  const submissionId = String(payload.id || "").trim();
  if (!publicId && !submissionId) throw new Error("id or publicId is required.");
  let removed = 0;
  let linkedSubmissionId = submissionId;
  if (publicId) {
    const result = await db.collection(GALLERY_ITEMS).where({ publicId }).limit(1).get();
    const item = (result.data || [])[0];
    if (item?._id) {
      await db.collection(GALLERY_ITEMS).doc(item._id).remove();
      removed += 1;
    }
    if (!linkedSubmissionId && item?.submissionId) linkedSubmissionId = item.submissionId;
  }
  if (submissionId) {
    // Also drop any published item still pointing at this submission.
    const items = await db.collection(GALLERY_ITEMS).where({ submissionId }).get();
    await Promise.all(
      (items.data || []).map((row) => (row?._id ? db.collection(GALLERY_ITEMS).doc(row._id).remove() : null)),
    );
    removed += (items.data || []).length;
  }
  if (linkedSubmissionId && (await removeDocIfExists(GALLERY_SUBMISSIONS, linkedSubmissionId))) {
    removed += 1;
  }
  return { removed, status: "deleted" };
}

exports.main = async (event, context) => {
  const method = String(event?.httpMethod || context?.httpContext?.httpMethod || "").toUpperCase();
  const path = getPath(event, context);

  if (method === "OPTIONS") return json(event, { ok: true });
  if (method !== "POST") return error(event, 405, "method_not_allowed", "Use POST.");

  try {
    const payload = parseBody(event);
    await maybeCleanupExpiredShares();

    if (isCreatePath(path)) {
      const ip = clientIp(event, context);
      await consumeRateLimit("share_create", ip, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_PER_IP);
      const data = await createShare(payload);
      return json(event, { ok: true, data });
    }

    if (isOpenPath(path)) {
      const data = await openShare(payload);
      return json(event, { ok: true, data });
    }

    if (isGalleryListPath(path)) {
      const data = await listGallery(payload);
      return json(event, { ok: true, data });
    }

    if (isGallerySubmitPath(path)) {
      const ip = clientIp(event, context);
      await consumeRateLimit("gallery_submit", ip, RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_PER_IP);
      const data = await submitGallery(payload, event, context);
      return json(event, { ok: true, data });
    }

    if (isGalleryPendingPath(path)) {
      const data = await listPendingGallery(payload, event, context);
      return json(event, { ok: true, data });
    }

    if (isGalleryApprovePath(path)) {
      const data = await approveGallery(payload, event, context);
      return json(event, { ok: true, data });
    }

    if (isGalleryRejectPath(path)) {
      const data = await rejectGallery(payload, event, context);
      return json(event, { ok: true, data });
    }

    if (isGalleryUnpublishPath(path)) {
      const data = await unpublishGallery(payload, event, context);
      return json(event, { ok: true, data });
    }

    if (isGalleryDeletePath(path)) {
      const data = await deleteGallery(payload, event, context);
      return json(event, { ok: true, data });
    }

    return error(event, 404, "not_found", "API route not found.");
  } catch (e) {
    const status = Number(e?.statusCode) || 400;
    const code = String(e?.errorCode || "bad_request");
    const extra = e?.errorExtra || {};
    const extraHeaders = e?.errorHeaders || {};
    return error(event, status, code, e?.message || "Request failed.", extra, extraHeaders);
  }
};
