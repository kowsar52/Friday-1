const express = require("express");
const db = require("./config/db");
const app = express();
const cors = require("cors");
require("dotenv").config();
const errormiddleware = require("./middleware/error");
const userRoutes = require("./Routes/userRoutes");
const appRoutes = require("./Routes/appRoutes");
const conectedAppRoutes  = require("./Routes/connctedAppRoutes");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

db();

app.use("/api/v1/user",userRoutes);
app.use("/api/v1/app",appRoutes);
app.use("/api/v1/connect",conectedAppRoutes);

app.get("/",(req,res)=>{
    res.status(200).json({msg:"Hello it's working"})
});


app.use(errormiddleware);


app.listen(port,()=>{
    console.log(`Server is listing on ${port}`);
});