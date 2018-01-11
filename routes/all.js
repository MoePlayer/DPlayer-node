var logger = require('../tools/logger');
var blank = require('../tools/blank');

module.exports = function (req, res, next) {

    if (req.headers.referer && blank(req.headers.referer)) {
        logger.info(`Reject all form ${req.headers.referer} for black referer.`);
        res.send(`{"code": 6, "msg": "black referer"}`);
        return;
    }
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Cache-control', 'no-cache');

    if (req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
};