const logger = require('../utils/logger');

module.exports = async (ctx) => {
    const body = ctx.request.body;

    const dan = new ctx.mongodb({
        id: body.id,
        author: body.author,
        time: body.time,
        text: body.text,
        color: body.color,
        type: body.type,
        ip: ctx.ips[0] || ctx.ip,
        referer: ctx.headers.referer
    });
    dan.save((err, data) => {
        if (err) {
            logger.error(err);
            ctx.body = JSON.stringify({
                code: 1,
                msg: 'Database error',
            });
        }
        else {
            ctx.body = JSON.stringify({
                code: 0,
                data,
            });
            ctx.redis.del(`danmaku${data.id}`);
        }
    });
};