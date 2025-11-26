const { Router } = require("express");
const { handleUserSignup, handleUserSignin, handleUserLogout, upload } = require("../controllers/user");
const { requireAuth } = require("../middlewares/authentication");

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
router.get("/data", requireAuth, (req, res) => res.json(req.user));

module.exports = router;