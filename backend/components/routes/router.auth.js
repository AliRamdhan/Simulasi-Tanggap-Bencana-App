const {
  authRegister,
  authLogin,
  authLogout,
  authHome,
} = require("../controller/controller.auth");
const router = require("express").Router();
const passport = require("../../middleware/middleware.passport.jwt");
router.post("/auth/register", authRegister);
router.post("/auth/login", authLogin);
router.post("/auth/logout", authLogout);
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login to Google, please try again later!",
  }),
  (req, res) => {
    console.log("User: ", req.user);
    res.send("Thank you for signing in!");
  }
);

router.get(
  "/auth/home",
  passport.authenticate("jwt", { session: false }),
  authHome
);

module.exports = router;
