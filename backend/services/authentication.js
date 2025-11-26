const JWT = require("jsonwebtoken");
const secret = "abc@123";

// create token
function createTokenForUser(user) {
    const payload = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role
    };
    return JWT.sign(payload, secret, { expiresIn: "7d" });
}

// validate token
function validateToken(token) {
    try {
        return JWT.verify(token, secret);
    } catch (error) {
        throw new Error("Invalid token");
    }
}

module.exports = { createTokenForUser, validateToken };