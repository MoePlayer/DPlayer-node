const logger = require('../utils/logger');

module.exports = async (ctx) => {
    const body = ctx.request.body;

    const dan = new ctx.mongodb({
        player: body.id,
        author: body.author,
        time: body.time,
        text: body.text,
        color: body.color,
        type: body.type,
        ip: ctx.ips[0] || ctx.ip,
        referer: ctx.headers.referer,
        date: +new Date(),
    });
    try {
        const data = await dan.save();
        ctx.body = JSON.stringify({
            code: 0,
            data,
        });
        ctx.redis.del(`danmaku${data.player}`);
    }
    catch (err) {
        logger.error(err);
        ctx.body = JSON.stringify({
            code: 1,
            msg: `Database error: ${err}`,
        });
    }
};