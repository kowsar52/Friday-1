const router = require("express").Router();
const multer = require('multer')
const path = require('path');
const { addApp, getAllApp } = require("../Controller/appController");

const imageStorage = multer.diskStorage({
    destination: 'images', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
    }
});
const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg)$/)) { 
         return cb(new Error('Please upload a Image'))
       }
     cb(undefined, true)
  }
})

router.post("/addApp",imageUpload.single('image'), addApp);
router.get("/getApps",getAllApp);

module.exports = router;