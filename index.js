const express = require("express");
const path = require("path");
const ejs = require("ejs");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/user");
const expenseRoute = require('./routes/expense');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const app = express();
const PORT = 8001;

mongoose.connect("mongodb://localhost:27017/expenseDB")
    .then((e) => console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public/js")));

app.get("/", (req, res) => {
    return res.render("home", {
        user: req.user,
    });
});

app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));