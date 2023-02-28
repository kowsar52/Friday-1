const App = require("../Model/App");

exports.addApp = async(req,res) =>{
    const dataApp = {
        name: req.body.name,
        description: req.body.description,
        image: req.file?.filename,
        price: req.body.price,
        interval: req.body.interval,
        trial_period_days: req.body.trial_period_days,
        currency: req.body.currency,
        category: req.body.category,
        public_key: req.body.public_key,
        secreat_key: req.body.secreat_key,
        url: req.body.url
    }
    try {
        const data = await App.create(dataApp);
        return res.status(201).json({success:true,message:"App Added Successfully..", data});
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