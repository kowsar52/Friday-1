const stripe = require('stripe')('sk_test_51LXJpASAuIUQMsyA4WGDZt3ZmzlojxYTSFkYBZVOLR6xIxqHLV6UdgrNlvxB2OkR9XglObDeWzCyN9zkoN26DFEM00q5byfGmu');
const ConnectApp = require("../Model/ConnectedApp");
const User = require('../Model/User');

const StripeData = async(availableApp,connectedApp,id) => {
    // console.log("🚀 ~ file: Stripe.js:5 ~ StripeData ~ id", id)
    // console.log("🚀 ~ file: Stripe.js:5 ~ StripeData ~ availableApp", availableApp)
    // console.log("🚀 ~ file: Stripe.js:5 ~ StripeData ~ connectedApp", connectedApp)

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
