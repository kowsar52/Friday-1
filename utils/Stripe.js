const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);
const ConnectApp = require("../Model/ConnectedApp");
const User = require('../Model/User');

const StripeData = async(availableApp,connectedApp,id) => {
    const user = await User.findOne({_id:id})
    if(connectedApp.length <= 0){
        console.log("first inside block")
        const account = await stripe.accounts.create({
            country: 'US',
            type: 'express',
            capabilities: {card_payments: {requested: true}, transfers: {requested: true}},
            business_type: 'individual',
            business_profile: {url: 'https://example.com'},
          });
       
        console.log("🚀 ~ file: Stripe.js:23 ~ StripeData ~ account", account)
        
    }
};

module.exports = StripeData;
