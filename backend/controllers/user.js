const User = require("../models/user");
const multer = require("multer");
const path = require("path");
const { createTokenForUser } = require("../services/authentication");

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
    try {

        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(400).send("All fields are required.");
        }

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ error: "Email already registered" });

        const user = await User.create({
            fullName,
            email,
            password,
            profileImageURL: req.file ? `/uploads/${req.file.filename}` : undefined
        });

        const token = createTokenForUser(user);
        return res.status(201).json({ user, token });
    } catch (err) {
        console.error('Signup Error:', err);
        return res.status(500).send(err.message);
    }
}

// handle user signin
async function handleUserSignin(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: "Email and password required" });

        const user = await User.findOne({ email });
        if (!user || !user.comparePassword(password)) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = createTokenForUser(user);
        return res.status(200).json({ user, token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

// handle user logout
async function handleUserLogout(req, res) {
    return res.status(200).json({ message: "Logout successful" });
}

module.exports = {
    handleUserSignup,
    handleUserSignin,
    handleUserLogout,
    upload,
}