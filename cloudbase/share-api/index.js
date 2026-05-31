const cloud = require("@cloudbase/node-sdk");

const app = cloud.init({ env: cloud.SYMBOL_CURRENT_ENV });
const db = app.database();
const _ = db.command;

const SHARES = "shares";
const SHORT_ID_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const SHORT_ID_LENGTH = 8;
const MAX_SHORT_ID_ATTEMPTS = 8;
const DEFAULT_NAME = "Untitled Pattern";
const MAX_NAME_LENGTH = 40;
const MAX_PATTERN_CODE_LENGTH = 200 * 1024;
const SHARE_TTL_DAYS = 7;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_PER_IP = 12;
const CLEANUP_INTERVAL_MS = 15 * 60 * 1000;
const CLEANUP_BATCH_SIZE = 200;

const createRateMap = new Map();
let lastCleanupAt = 0;

const DEFAULT_ALLOWED_ORIGINS = [
  "https://beam-prod-d7g2xz88ee6532631-1438742199.ap-shanghai.app.tcloudbase.com",
  "https://beam-prod-d7g2xz88ee6532631-1438742199.tcloudbaseapp.com",
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
    "access-control-allow-headers": "content-type",
    vary: "origin",
  };
  if (origin) headers["access-control-allow-origin"] = origin;
  return headers;
}

function json(event, data, statusCode = 200) {
  return {
    statusCode,
    headers: responseHeaders(event),
    body: JSON.stringify(data),
  };
}

function error(event, status, code, message) {
  return json(event, { ok: false, error: { code, message } }, status);
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

function nowIso() {
  return new Date().toISOString();
}

function expireIso() {
  return new Date(Date.now() + SHARE_TTL_DAYS * 24 * 60 * 60 * 1000).toISOString();
}

function clientIp(event, context) {
  const headers = event?.headers || {};
  const forwarded = String(headers["x-forwarded-for"] || headers["X-Forwarded-For"] || "").trim();
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = String(headers["x-real-ip"] || headers["X-Real-Ip"] || "").trim();
  if (realIp) return realIp;
  return String(context?.requestContext?.sourceIp || context?.httpContext?.sourceIp || "unknown");
}

function hitCreateRateLimit(ip) {
  const now = Date.now();
  for (const [key, value] of createRateMap.entries()) {
    if (now - value.windowStart >= RATE_LIMIT_WINDOW_MS) createRateMap.delete(key);
  }
  const key = ip || "unknown";
  const record = createRateMap.get(key);
  if (!record || now - record.windowStart >= RATE_LIMIT_WINDOW_MS) {
    createRateMap.set(key, { windowStart: now, count: 1 });
    return false;
  }
  record.count += 1;
  createRateMap.set(key, record);
  return record.count > RATE_LIMIT_MAX_PER_IP;
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
  const patternCode = normalizePatternCode(payload.patternCode);

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
      if (hitCreateRateLimit(ip)) {
        return error(event, 429, "rate_limited", "Too many requests.");
      }
      const data = await createShare(payload);
      return json(event, { ok: true, data });
    }

    if (isOpenPath(path)) {
      const data = await openShare(payload);
      return json(event, { ok: true, data });
    }

    return error(event, 404, "not_found", "API route not found.");
  } catch (e) {
    return error(event, 400, "bad_request", e?.message || "Request failed.");
  }
};
