const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const ejs = require("ejs");

const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const expenseRoute = require("./routes/expense");

const app = express();
const PORT = 8001;

mongoose.connect("mongodb://localhost:27017/expenseDB")
    .then((e) => console.log("MongoDB connected"));

app.use(cors({
    origin: 'http://localhost:3000',
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public/js")));
app.use(express.static(path.join(__dirname, '../react-app/build', 'index.html')));

app.use("/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/expense", expenseRoute);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));