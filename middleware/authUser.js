const authUser = (req, res, next) => {
    console.log("You are now logged in..");
    req.user = {
        name: "Santa",
        age: 205
    };
    next();
};

const logRequestDetails = (req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    console.log(`Request body: ${JSON.stringify(req.body)}`);
    next();
};

module.exports = {
    authUser,
    logRequestDetails
};

//written this way as export: {authUser} was screaming at me and would not let me proceed.