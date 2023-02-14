const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// abUser
// Password123

const db = () =>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log(`Backend Connected Successfully..`)
    })
    .catch((err) =>{
        console.log(`Error => ${err}`)
    })
};

module.exports = db;
