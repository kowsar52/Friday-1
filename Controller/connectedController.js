const ConnectApp = require("../Model/ConnectedApp");
const ErrorHandler = require("../utils/errorHandling");
const catchAsyncError = require("../middleware/catchAsyncError");
const App = require("../Model/App");

const OAuthClient = require("intuit-oauth");

exports.addConection = catchAsyncError(async (req, res) => {
  const { _id } = req.user;
  const { extra, appId } = req.body;

  const data = await ConnectApp.create({
    userId: _id,
    appId,
    extra,
  });

  return res
    .status(201)
    .json({ success: true, message: "App Connected Successfully" });
});

exports.getUserConnect = catchAsyncError(async (req, res) => {
  const { _id } = req.user;

  const data = await ConnectApp.find({ userId: _id });
  return res.status(201).json({ success: true, data });
});

exports.getApp = catchAsyncError(async (req, res) => {
  const { _id } = req.user;
  const { appId } = req.params;
  if (!appId) {
    return res
      .status(403)
      .json({ success: false, message: "App is not exists.." });
  }
  const connectedApp = await ConnectApp.find({ userId: _id, appId })
    .populate("userId")
    .populate("appId");
  // console.log("🚀 ~ file: connectedController.js:34 ~ exports.getApp=catchAsyncError ~ connectedApp", connectedApp)
  const availableApp = await App.findOne({ _id: appId });

  //  Inside this section user's data is not available in any App.
  if (connectedApp.length) {
    if (availableApp.name === "Stripe") {
      console.log("inside the Stripe book");

      if (connectedApp.length <= 0) {
        console.log("first inside block");
        const account = await stripe.accounts.create({
          type: "custom",
          country: "US",
          email: user.email,
          capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
          },
        });
        console.log("🚀 ~ file: Stripe.js:23 ~ StripeData ~ account", account);

        const createConntcedapp = await ConnectApp.create({
          userId: user._id,
          appId: availableApp._id,
          extra: account.id,
        });

        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: "https://127.0.0.1/user/apps/new-list",
          return_url: "https://127.0.0.1/user/apps/new-list",
          type: "account_onboarding",
        });
        return res
          .status(400)
          .json({ sucess: true, message: "App is created sucessfully..." });
      } else {
        const loginLink = await stripe.accounts.createLoginLink(
          connectedApp.extra
        );
        return res
          .status(400)
          .json({ sucess: false, message: "App is alerdyCreated" });
      }
    } else if (availableApp.name === "Quick Books") {
        const authUri = oauthClient.authorizeUri({
            scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
            state: 'testState',
          }); 
          
    
          const parseRedirect = authUri.url;
          const authToken = '';
    
          oauthClient
            .createToken(parseRedirect)
            .then(function (authResponse) {
                console.log('The Token is  ' + JSON.stringify(authResponse.getJson()));
                authToken = authResponse.getJson();
            })
            .catch(function (e) {
                console.error('The error message is :' + e.originalMessage);
                console.error(e.intuit_tid);
            });
    
          var QuickBooks = require('node-quickbooks')
    
          const oauthClient = new OAuthClient({
            authmode: "oauth2",
            clientId: "ABh9JbwlY0i1N40oXrl05mTT02ThphQwy6AZfHccYHeBaZe1mm",
            clientSecret: "G6jlLsMiQyB5yWNmZnW2XE5GG8YQSMS6Rm5Uauu0",
            environment: "sandbox" || "production",
            redirectUri: "https://127.0.0.1/user/apps/quickbooks/sucess",
            scope: "com.intuit.quickbooks.accounting",
            basUrl: "development",
          });
    }
  } else {
    //  Inside this section user's data is available in App Table.
    if (availableApp.name === "Stripe") {
      if (connectedApp.length <= 0) {
        console.log("first inside block");
        const account = await stripe.accounts.create({
          type: "custom",
          country: "US",
          email: user.email,
          capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
          },
        });
        console.log("🚀 ~ file: Stripe.js:23 ~ StripeData ~ account", account);

        const createConntcedapp = await ConnectApp.create({
          userId: user._id,
          appId: availableApp._id,
          extra: account.id,
        });

        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: "https://127.0.0.1/user/apps/new-list",
          return_url: "https://127.0.0.1/user/apps/new-list",
          type: "account_onboarding",
        });
        return res
          .status(400)
          .json({ sucess: true, message: "App is created sucessfully..." });
      } else {
        const loginLink = await stripe.accounts.createLoginLink(
          connectedApp.extra
        );
        return res
          .status(400)
          .json({ sucess: false, message: "App is alerdyCreated" });
      }
    } else if (availableApp.name === "Quick Books") {

        
      const authUri = oauthClient.authorizeUri({
        scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
        state: 'testState',
      }); 
      

      const parseRedirect = authUri.url;
      const authToken = '';

      oauthClient
        .createToken(parseRedirect)
        .then(function (authResponse) {
            console.log('The Token is  ' + JSON.stringify(authResponse.getJson()));
            authToken = authResponse.getJson();
        })
        .catch(function (e) {
            console.error('The error message is :' + e.originalMessage);
            console.error(e.intuit_tid);
        });

      var QuickBooks = require('node-quickbooks')

      const oauthClient = new OAuthClient({
        authmode: "oauth2",
        clientId: "ABh9JbwlY0i1N40oXrl05mTT02ThphQwy6AZfHccYHeBaZe1mm",
        clientSecret: "G6jlLsMiQyB5yWNmZnW2XE5GG8YQSMS6Rm5Uauu0",
        environment: "sandbox" || "production",
        redirectUri: "https://127.0.0.1/user/apps/quickbooks/sucess",
        scope: "com.intuit.quickbooks.accounting",
        basUrl: "development",
      });
    }
  }
});
