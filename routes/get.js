function htmlEncode (str) {
    return str ? str.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2f;') : '';
}

module.exports = async (ctx) => {
    const { id, limit } = ctx.request.query;

    let data = await ctx.redis.get(`danmaku${id}`);
    if (data) {
        data = JSON.parse(data);
        if (limit) {
            data = data.slice(-1 * parseInt(limit));
        }
        ctx.response.set('X-Koa-Redis', 'true');
    } else {
        data = await ctx.mongodb.find({ player: id }) || [];
        ctx.redis.set(`danmaku${id}`, JSON.stringify(data));
        if (limit) {
            data = data.slice(-1 * parseInt(limit));
        }
        ctx.response.set('X-Koa-Mongodb', 'true');
    }
    ctx.body = JSON.stringify({
        code: 0,
        data: data.map((item) => [item.time || 0, item.type || 0, item.color || 16777215, htmlEncode(item.author) || 'DPlayer', htmlEncode(item.text) || '']),
    });
};