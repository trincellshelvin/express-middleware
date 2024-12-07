const logRequestInfo = (req, res, next) => {
    console.log(`Request Headers: ${JSON.stringify(req.headers)}`);
    console.log(`Request Params: ${JSON.stringify(req.params)}`);
    console.log(`Request Query: ${JSON.stringify(req.query)}`);
    next();
};

export default logRequestInfo;

