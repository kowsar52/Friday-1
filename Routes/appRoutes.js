const router = require("express").Router();

const { addApp, getAllApp } = require("../Controller/appController");

router.post("/addApp",addApp);
router.get("/getApps",getAllApp);

module.exports = router;