const express = require("express");
const path = require("path");
const ejs = require("ejs");

const app = express();
const PORT = 8001;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public/js")));

app.get("/", (req, res) => {
    return res.render("home");
})

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));