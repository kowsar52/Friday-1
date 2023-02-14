const App = require("../Model/App");

exports.addApp = async(req,res) =>{
    const {name,description,image,price,interval,trial_period_days,currency,category,public_key,secreat_key,url} = req.body;
    try {
        const data = await App.create({
            name,description,image,price,interval,trial_period_days,currency,category,public_key,secreat_key,url
        });

        return res.status(201).json({success:true,message:"App Added Successfully.."});
    } catch (error) {
        return res.status(500).json({error})
    }
};

exports.getAllApp = async(req,res) =>{
    try {
        const data = await App.find().sort({name: 'asc' });
        return res.status(201).json({success:true,data});
    } catch (error) {
        return res.status(500).json({error})
    }
}