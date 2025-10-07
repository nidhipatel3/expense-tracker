const { Router } = require("express");
const { handleUserSignup, handleUserSignin, handleUserLogout, upload } = require("../controllers/user");
const { getUser } = require("../middlewares/authentication");
const router = Router();

router.get("/signup", (req, res) => {
    return res.render("signup");
})

router.get("/signin", (req, res) => {
    return res.render("signin");
})

router.post("/signup", upload.single("profileImage"), handleUserSignup);
router.post("/signin", handleUserSignin);
router.post("/logout", handleUserLogout);
router.get("/data", getUser);

module.exports = router;