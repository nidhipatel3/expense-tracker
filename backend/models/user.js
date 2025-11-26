const { Schema, model } = require("mongoose");
const { randomBytes, createHmac } = require("crypto");

// create schema for user
const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        salt: {
            type: String,
        },
        password: {
            type: String,
            required: true
        },
        profileImageURL: {
            type: String,
            required: false
        },
        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        }
    },
    { timestamps: true }
);

// hashed password
userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
        .update(this.password)
        .digest("hex");
    this.salt = salt;
    this.password = hashedPassword;
    next();
});

// Compare password
userSchema.methods.comparePassword = function (password) {
    const hashed = createHmac("sha256", this.salt).update(password).digest("hex");
    return hashed === this.password;
};

const User = model('user', userSchema);

module.exports = User;