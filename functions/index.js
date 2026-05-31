"use strict";

const crypto = require("node:crypto");
const {promisify} = require("node:util");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore, FieldValue} = require("firebase-admin/firestore");
const {setGlobalOptions} = require("firebase-functions");
const {HttpsError, onCall} = require("firebase-functions/https");

initializeApp();

setGlobalOptions({
  maxInstances: 10,
  region: "asia-east1",
});

const db = getFirestore();
const scrypt = promisify(crypto.scrypt);

const SHARES = "shares";
const SHORT_ID_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const SHORT_ID_LENGTH = 8;
const MAX_SHORT_ID_ATTEMPTS = 8;
const MAX_NAME_LENGTH = 40;
const MIN_PASSWORD_LENGTH = 4;
const MAX_PASSWORD_LENGTH = 64;
const MAX_PATTERN_CODE_LENGTH = 200 * 1024;
const PASSWORD_SALT_BYTES = 16;
const PASSWORD_KEYLEN = 32;

function requireAuth(context) {
  const uid = context.auth?.uid;
  if (!uid) {
    throw new HttpsError("unauthenticated", "Please sign in before sharing patterns.");
  }
  return uid;
}

function requireObject(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new HttpsError("invalid-argument", "Request data must be an object.");
  }
  return value;
}

function normalizeName(value) {
  const name = String(value || "").trim();
  if (!name) return "未命名图纸";
  return name.slice(0, MAX_NAME_LENGTH);
}

function normalizePassword(value, field = "password") {
  const password = String(value || "");
  if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
    throw new HttpsError(
      "invalid-argument",
      `${field} must be ${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH} characters.`,
    );
  }
  return password;
}

function normalizePatternCode(value) {
  const patternCode = String(value || "").trim();
  if (!patternCode) {
    throw new HttpsError("invalid-argument", "patternCode is required.");
  }
  if (patternCode.length > MAX_PATTERN_CODE_LENGTH) {
    throw new HttpsError("invalid-argument", "patternCode is too large.");
  }
  return patternCode;
}

function normalizeShortId(value) {
  const shortId = String(value || "").trim();
  const pattern = new RegExp(`^[${SHORT_ID_ALPHABET}]{${SHORT_ID_LENGTH}}$`);
  if (!pattern.test(shortId)) {
    throw new HttpsError("invalid-argument", "Invalid share code.");
  }
  return shortId;
}

function makeShortId() {
  let output = "";
  for (let i = 0; i < SHORT_ID_LENGTH; i += 1) {
    const index = crypto.randomInt(SHORT_ID_ALPHABET.length);
    output += SHORT_ID_ALPHABET[index];
  }
  return output;
}

async function hashPassword(password, saltHex = null) {
  const salt = saltHex ? Buffer.from(saltHex, "hex") : crypto.randomBytes(PASSWORD_SALT_BYTES);
  const hash = await scrypt(password, salt, PASSWORD_KEYLEN);
  return {
    algorithm: "scrypt",
    hash: hash.toString("hex"),
    salt: salt.toString("hex"),
  };
}

async function verifyPassword(password, share) {
  if (share.passwordAlgorithm !== "scrypt" || !share.passwordSalt || !share.passwordHash) {
    return false;
  }
  const hashed = await hashPassword(password, share.passwordSalt);
  const expected = Buffer.from(share.passwordHash, "hex");
  const actual = Buffer.from(hashed.hash, "hex");
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

function publicSharePayload(shortId, share) {
  return {
    shortId,
    name: share.name,
    patternCode: share.patternCode,
    createdAt: share.createdAt?.toMillis?.() || null,
    updatedAt: share.updatedAt?.toMillis?.() || null,
    version: share.version || 1,
  };
}

async function createShareDocument(data, uid) {
  const name = normalizeName(data.name);
  const patternCode = normalizePatternCode(data.patternCode);
  const password = normalizePassword(data.password);
  const passwordEntry = await hashPassword(password);

  for (let attempt = 0; attempt < MAX_SHORT_ID_ATTEMPTS; attempt += 1) {
    const shortId = makeShortId();
    const ref = db.collection(SHARES).doc(shortId);
    const created = await db.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(ref);
      if (snapshot.exists) return false;
      transaction.set(ref, {
        ownerUid: uid,
        name,
        patternCode,
        passwordHash: passwordEntry.hash,
        passwordSalt: passwordEntry.salt,
        passwordAlgorithm: passwordEntry.algorithm,
        status: "active",
        version: 1,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });
      return true;
    });
    if (created) return {shortId, name};
  }

  throw new HttpsError("resource-exhausted", "Could not create a unique share code.");
}

exports.createShare = onCall(async (request) => {
  const uid = requireAuth(request);
  const data = requireObject(request.data);
  return createShareDocument(data, uid);
});

exports.getShare = onCall(async (request) => {
  const data = requireObject(request.data);
  const shortId = normalizeShortId(data.shortId);
  const password = normalizePassword(data.password);
  const snapshot = await db.collection(SHARES).doc(shortId).get();

  if (!snapshot.exists) {
    throw new HttpsError("permission-denied", "Invalid share code or password.");
  }

  const share = snapshot.data();
  if (share.status !== "active" || !(await verifyPassword(password, share))) {
    throw new HttpsError("permission-denied", "Invalid share code or password.");
  }

  return publicSharePayload(shortId, share);
});

exports.updateSharePassword = onCall(async (request) => {
  const uid = requireAuth(request);
  const data = requireObject(request.data);
  const shortId = normalizeShortId(data.shortId);
  const currentPassword = normalizePassword(data.currentPassword, "currentPassword");
  const nextPassword = normalizePassword(data.nextPassword, "nextPassword");
  const ref = db.collection(SHARES).doc(shortId);
  const snapshot = await ref.get();

  if (!snapshot.exists) {
    throw new HttpsError("not-found", "Share not found.");
  }

  const share = snapshot.data();
  if (share.ownerUid !== uid) {
    throw new HttpsError("permission-denied", "Only the owner can change this password.");
  }
  if (share.status !== "active" || !(await verifyPassword(currentPassword, share))) {
    throw new HttpsError("permission-denied", "Current password is incorrect.");
  }

  const passwordEntry = await hashPassword(nextPassword);
  await ref.update({
    passwordHash: passwordEntry.hash,
    passwordSalt: passwordEntry.salt,
    passwordAlgorithm: passwordEntry.algorithm,
    updatedAt: FieldValue.serverTimestamp(),
  });

  return {shortId, updated: true};
});
