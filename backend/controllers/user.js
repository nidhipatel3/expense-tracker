const User = require("../models/user");
const multer = require("multer");
const path = require("path");

// handle user profile image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(`./public/uploads/`));
    },
    filename: function (req, file, cb) {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

// handle user signup
async function handleUserSignup(req, res) {
    const { fullName, email, password } = req.body;
    await User.create({
        fullName,
        email,
        password,
        profileImageURL: `/uploads/${req.file.filename}`
    });
    return res.redirect("/");
}

// handle user signin
async function handleUserSignin(req, res) {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        return res.cookie("token", token).redirect("/");
    } catch (error) {
        return res.render("signin", {
            error: "Incorrect Email or Password",
        });
    }
}

// handle user logout
async function handleUserLogout(req, res) {
    res.clearCookie("token").redirect("/");
}

module.exports = {
    handleUserSignup,
    handleUserSignin,
    handleUserLogout,
    upload,
}