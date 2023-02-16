const router = require("express").Router();

const { addConection, getUserConnect, getApp, createPayment } = require("../Controller/connectedController");
const auth = require("../middleware/auth");

router.post("/addConnection",auth,addConection);
router.get("/getConnectedUser",auth,getUserConnect);
router.get("/getApp/:appId",auth,getApp);
router.post("/createPayment",auth,createPayment);

module.exports = router;