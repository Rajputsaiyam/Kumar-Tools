const crypto = require("crypto");

const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || "kumar_tools_super_admin_secret_key_2026";

/**
 * Generate a cryptographically signed HMAC token for the admin session
 */
function generateAdminToken(payload) {
  const expiresAt = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days session
  const data = JSON.stringify({ ...payload, exp: expiresAt });
  const b64Data = Buffer.from(data).toString("base64url");
  const signature = crypto.createHmac("sha256", ADMIN_SECRET).update(b64Data).digest("base64url");
  return `${b64Data}.${signature}`;
}

/**
 * Verify HMAC signed admin token
 */
function verifyAdminToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return null;
  const [b64Data, signature] = token.split(".");
  if (!b64Data || !signature) return null;

  const expectedSig = crypto.createHmac("sha256", ADMIN_SECRET).update(b64Data).digest("base64url");
  if (expectedSig !== signature) return null;

  try {
    const payload = JSON.parse(Buffer.from(b64Data, "base64url").toString());
    if (payload.exp && Date.now() > payload.exp) {
      return null; // Expired
    }
    return payload;
  } catch (e) {
    return null;
  }
}

/**
 * Express middleware to restrict routes to only verified Admin
 */
function requireAdminAuth(req, res, next) {
  const headerToken = req.headers["x-admin-token"] || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!headerToken) {
    return res.status(401).json({
      success: false,
      message: "Access Denied: Kumar Tools Admin Portal is restricted to authorized personnel.",
    });
  }

  const payload = verifyAdminToken(headerToken);
  if (!payload) {
    return res.status(401).json({
      success: false,
      message: "Session expired or invalid admin credentials. Please log in again.",
    });
  }

  req.admin = payload;
  next();
}

module.exports = {
  generateAdminToken,
  verifyAdminToken,
  requireAdminAuth,
};
