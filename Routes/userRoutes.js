const router = require("express").Router();
const auth = require("../middleware/auth");

const { Register, Login, userDetail } = require("../Controller/userContoller");

router.post("/register",Register);
router.post("/login",Login);
router.get("/singleUser",auth,userDetail);


module.exports = router;