const { validateToken } = require("../services/authentication");

function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = validateToken(token);
        if (!payload || !payload._id) {
            return res.status(401).json({ message: "Invalid token payload" });
        }
        req.userId = payload._id;
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = { requireAuth };