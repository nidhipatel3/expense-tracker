const { validateToken } = require("../services/authentication");
const User = require("../models/user");

// handle authentication
function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {

        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next();
        }
        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) { }

        return next();
    }
}

// get user
async function getUser(req, res) {
    const user = await User.findById(req.user.id);
    res.json(user);
}

module.exports = {
    checkForAuthenticationCookie,
    getUser,
}