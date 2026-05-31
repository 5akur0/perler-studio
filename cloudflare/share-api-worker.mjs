const SHORT_ID_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const SHORT_ID_LENGTH = 8;
const MAX_SHORT_ID_ATTEMPTS = 8;
const DEFAULT_NAME = "Untitled Pattern";
const MAX_NAME_LENGTH = 40;
const MIN_PASSWORD_LENGTH = 4;
const MAX_PASSWORD_LENGTH = 64;
const MAX_PATTERN_CODE_LENGTH = 200 * 1024;
const PBKDF2_ITERATIONS = 100000;
const SALT_BYTES = 16;
const DERIVED_KEY_BYTES = 32;

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

function normalizePassword(value, fieldName = "password") {
  const password = String(value || "");
  if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
    throw new Error(`${fieldName} must be ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} characters.`);
  }
  return password;
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

function randomBase64Url(bytesLength = 24) {
  const bytes = new Uint8Array(bytesLength);
  crypto.getRandomValues(bytes);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function bytesToHex(bytes) {
  return [...bytes].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function hexToBytes(hex) {
  if (hex.length % 2 !== 0) throw new Error("Invalid hex.");
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i += 1) {
    out[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

async function pbkdf2Hex(secret, saltHex) {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const salt = saltHex ? hexToBytes(saltHex) : crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations: PBKDF2_ITERATIONS,
    },
    keyMaterial,
    DERIVED_KEY_BYTES * 8,
  );
  return {
    saltHex: bytesToHex(salt),
    hashHex: bytesToHex(new Uint8Array(bits)),
  };
}

async function hashPassword(password, saltHex = null) {
  const { saltHex: nextSaltHex, hashHex } = await pbkdf2Hex(password, saltHex);
  return { algorithm: "pbkdf2-sha256", saltHex: nextSaltHex, hashHex };
}

async function hashManageToken(token, saltHex = null) {
  const { saltHex: nextSaltHex, hashHex } = await pbkdf2Hex(token, saltHex);
  return { algorithm: "pbkdf2-sha256", saltHex: nextSaltHex, hashHex };
}

function timingSafeEqualHex(aHex, bHex) {
  if (!aHex || !bHex || aHex.length !== bHex.length) return false;
  let diff = 0;
  for (let i = 0; i < aHex.length; i += 1) diff |= aHex.charCodeAt(i) ^ bHex.charCodeAt(i);
  return diff === 0;
}

async function verifyPassword(secret, storedHashHex, storedSaltHex) {
  const candidate = await hashPassword(secret, storedSaltHex);
  return timingSafeEqualHex(candidate.hashHex, storedHashHex);
}

async function verifyManageToken(secret, storedHashHex, storedSaltHex) {
  const candidate = await hashManageToken(secret, storedSaltHex);
  return timingSafeEqualHex(candidate.hashHex, storedHashHex);
}

async function createShare(env, payload) {
  const name = normalizeName(payload.name);
  const patternCode = normalizePatternCode(payload.patternCode);
  const password = normalizePassword(payload.password);
  const manageToken = randomBase64Url(24);
  const passwordHash = await hashPassword(password);
  const manageHash = await hashManageToken(manageToken);

  for (let attempt = 0; attempt < MAX_SHORT_ID_ATTEMPTS; attempt += 1) {
    const shortId = randomShortId();
    const now = new Date().toISOString();
    const result = await env.SHARE_DB.prepare(
      `INSERT OR IGNORE INTO shares
        (short_id, name, pattern_code, password_hash, password_salt, password_alg, manage_hash, manage_salt, manage_alg, status, created_at, updated_at)
       VALUES
        (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, 'active', ?10, ?10)`
    )
      .bind(
        shortId,
        name,
        patternCode,
        passwordHash.hashHex,
        passwordHash.saltHex,
        passwordHash.algorithm,
        manageHash.hashHex,
        manageHash.saltHex,
        manageHash.algorithm,
        now,
      )
      .run();

    if (result.meta?.changes === 1) {
      return { shortId, name, manageToken };
    }
  }

  throw new Error("Failed to allocate unique short code.");
}

async function openShare(env, payload) {
  const shortId = normalizeShortId(payload.shortId);
  const password = normalizePassword(payload.password);
  const row = await env.SHARE_DB.prepare(
    `SELECT short_id, name, pattern_code, password_hash, password_salt, status, created_at, updated_at
     FROM shares WHERE short_id = ?1`
  )
    .bind(shortId)
    .first();

  if (!row || row.status !== "active") {
    throw new Error("Invalid share code or password.");
  }
  const ok = await verifyPassword(password, row.password_hash, row.password_salt);
  if (!ok) {
    throw new Error("Invalid share code or password.");
  }
  return {
    shortId: row.short_id,
    name: row.name,
    patternCode: row.pattern_code,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

async function updateSharePassword(env, payload) {
  const shortId = normalizeShortId(payload.shortId);
  const manageToken = String(payload.manageToken || "").trim();
  const currentPassword = normalizePassword(payload.currentPassword, "currentPassword");
  const nextPassword = normalizePassword(payload.nextPassword, "nextPassword");
  if (!manageToken) throw new Error("manageToken is required.");

  const row = await env.SHARE_DB.prepare(
    `SELECT short_id, status, password_hash, password_salt, manage_hash, manage_salt
     FROM shares WHERE short_id = ?1`
  )
    .bind(shortId)
    .first();
  if (!row || row.status !== "active") throw new Error("Share not found.");

  const [manageOk, currentPasswordOk] = await Promise.all([
    verifyManageToken(manageToken, row.manage_hash, row.manage_salt),
    verifyPassword(currentPassword, row.password_hash, row.password_salt),
  ]);
  if (!manageOk) throw new Error("Not allowed to manage this share.");
  if (!currentPasswordOk) throw new Error("Current password is incorrect.");

  const nextHash = await hashPassword(nextPassword);
  const now = new Date().toISOString();
  await env.SHARE_DB.prepare(
    `UPDATE shares
     SET password_hash = ?1, password_salt = ?2, password_alg = ?3, updated_at = ?4
     WHERE short_id = ?5`
  )
    .bind(nextHash.hashHex, nextHash.saltHex, nextHash.algorithm, now, shortId)
    .run();

  return { shortId, updated: true };
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
      if (url.pathname === "/api/share/password") {
        const payload = await parseJson(request);
        const data = await updateSharePassword(env, payload);
        return jsonResponse({ ok: true, data });
      }
      return errorResponse(404, "not_found", "API route not found.");
    } catch (error) {
      return errorResponse(400, "bad_request", error.message || "Request failed.");
    }
  },
};
