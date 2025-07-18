const { Router } = require("express");
const { handleUserSignup, handleUserSignin, handleUserLogout, upload } = require("../controllers/user");
const router = Router();

router.get("/signup", (req, res) => {
    return res.render("signup");
})

router.get("/signin", (req, res) => {
    return res.render("signin");
})

router.post("/signup", upload.single("profileImage"), handleUserSignup);
router.post("/signin", handleUserSignin);
router.get("/logout", handleUserLogout);

module.exports = router;