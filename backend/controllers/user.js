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

    if (!fullName || !email || !password) {
        return res.status(400).send("All fields are required.");
    }
    try {
        await User.create({
            fullName,
            email,
            password,
            profileImageURL: req.file ? `/uploads/${req.file.filename}` : undefined
        });
        return res.redirect("/");

    } catch (err) {
        console.error('Signup Error:', err);
        return res.status(500).send(err.message);
    }
}

// handle user signin
async function handleUserSignin(req, res) {

    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Lax',
        });

        const user = await User.findOne({ email });
        return res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        return res.status(401).json({ error: "Incorrect Email or Password" });
    }
}

// handle user logout
async function handleUserLogout(req, res) {

    res.set('Cache-Control', 'no-store');
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: 'Lax',
    });
    return res.status(200).json({ message: 'Logout successful' });
}

module.exports = {
    handleUserSignup,
    handleUserSignin,
    handleUserLogout,
    upload,
}