const SHORT_ID_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const SHORT_ID_LENGTH = 8;
const MAX_SHORT_ID_ATTEMPTS = 8;
const DEFAULT_NAME = "Untitled Pattern";
const MAX_NAME_LENGTH = 40;
const MAX_PATTERN_CODE_LENGTH = 200 * 1024;
const SHARE_TTL_DAYS = 7;

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "POST,OPTIONS",
      "access-control-allow-headers": "content-type",
    },
  });
}

function errorResponse(status, code, message) {
  return jsonResponse({ ok: false, error: { code, message } }, status);
}

function addDays(date, days) {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

function normalizeName(value) {
  const name = String(value || "").trim();
  return (name || DEFAULT_NAME).slice(0, MAX_NAME_LENGTH);
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
  const bytes = new Uint8Array(SHORT_ID_LENGTH);
  crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < SHORT_ID_LENGTH; i += 1) {
    out += SHORT_ID_ALPHABET[bytes[i] % SHORT_ID_ALPHABET.length];
  }
  return out;
}

async function createShare(env, payload) {
  const name = normalizeName(payload.name);
  const patternCode = normalizePatternCode(payload.patternCode);

  for (let attempt = 0; attempt < MAX_SHORT_ID_ATTEMPTS; attempt += 1) {
    const shortId = randomShortId();
    const nowDate = new Date();
    const now = nowDate.toISOString();
    const expiresAt = addDays(nowDate, SHARE_TTL_DAYS).toISOString();
    const result = await env.SHARE_DB.prepare(
      `INSERT OR IGNORE INTO shares
        (short_id, name, pattern_code, password_hash, password_salt, password_alg, manage_hash, manage_salt, manage_alg, status, created_at, updated_at, expires_at)
       VALUES
        (?1, ?2, ?3, '', '', '', '', '', '', 'active', ?4, ?4, ?5)`
    )
      .bind(
        shortId,
        name,
        patternCode,
        now,
        expiresAt,
      )
      .run();

    if (result.meta?.changes === 1) {
      return { shortId, name, expiresAt };
    }
  }

  throw new Error("Failed to allocate unique short code.");
}

async function openShare(env, payload) {
  const shortId = normalizeShortId(payload.shortId);
  const row = await env.SHARE_DB.prepare(
    `SELECT short_id, name, pattern_code, status, created_at, updated_at, expires_at
     FROM shares WHERE short_id = ?1`
  )
    .bind(shortId)
    .first();

  if (!row || row.status !== "active") {
    throw new Error("Invalid share code.");
  }
  if (new Date(row.expires_at).getTime() <= Date.now()) {
    await env.SHARE_DB.prepare(
      `UPDATE shares SET status = 'expired', updated_at = ?1 WHERE short_id = ?2`
    )
      .bind(new Date().toISOString(), shortId)
      .run();
    throw new Error("Share code has expired.");
  }
  return {
    shortId: row.short_id,
    name: row.name,
    patternCode: row.pattern_code,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    expiresAt: row.expires_at,
  };
}

async function cleanupExpiredShares(env) {
  const now = new Date().toISOString();
  const result = await env.SHARE_DB.prepare(
    `DELETE FROM shares WHERE expires_at <= ?1 OR status = 'expired'`
  )
    .bind(now)
    .run();
  return { deleted: result.meta?.changes || 0 };
}

async function parseJson(request) {
  try {
    return await request.json();
  } catch {
    throw new Error("Invalid JSON body.");
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return jsonResponse({ ok: true });
    if (request.method !== "POST") return errorResponse(405, "method_not_allowed", "Use POST.");

    try {
      if (url.pathname === "/api/share/create") {
        const payload = await parseJson(request);
        const data = await createShare(env, payload);
        return jsonResponse({ ok: true, data });
      }
      if (url.pathname === "/api/share/open") {
        const payload = await parseJson(request);
        const data = await openShare(env, payload);
        return jsonResponse({ ok: true, data });
      }
      return errorResponse(404, "not_found", "API route not found.");
    } catch (error) {
      return errorResponse(400, "bad_request", error.message || "Request failed.");
    }
  },
  async scheduled(controller, env) {
    await cleanupExpiredShares(env);
  },
};
