var url = require('url');
var logger = require('../../tools/logger');
var danmaku = require('../../models/danmaku');
var redis = require('../../tools/redis');

module.exports = function (req, res) {
    res.header('content-type', 'application/json; charset=utf-8');

    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var query = url.parse(req.url, true).query;
    var id = query.id;
    var max = query.max;

    redis.client.get(`v2get${id}`, function (err, reply) {
        if (reply) {
            logger.info(`v2: DPlayer id ${id} form redis, IP: ${ip}`);

            var data = JSON.parse(reply);

            res.send(JSON.stringify({
                code: 0,
                danmaku: max ? data.slice(0, max) : data
            }));
        }
        else {
            logger.info(`v2: DPlayer id ${id} form mongodb, IP: ${ip}`);

            danmaku.find({ player: id }, function (err, data) {
                if (err) {
                    logger.error(err);
                }

                redis.set(`v2get${id}`, JSON.stringify(data));

                var data = max ? data.slice(data.length - max, data.length) : data;

                var typeMap = {
                    'right': 0,
                    'top': 1,
                    'bottom': 2
                }
                res.send(JSON.stringify({
                    code: 0,
                    danmaku: data.map(item => [item.time, typeMap[item.type], item.color, item.author, item.text])
                }));
            })
        }
    });
};