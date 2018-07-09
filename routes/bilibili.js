const fetch = require('node-fetch');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const aid = ctx.request.query.aid;
    let cid = ctx.request.query.cid;

    if (!cid && aid) {
        cid = await ctx.redis.get(`v3bilibiliaid2cid${aid}`);
        if (!cid) {
            const res = await fetch(`http://www.bilibili.com/widget/getPageList?aid=${aid}`);
            const result = await res.json();
            cid = result[0].cid;
            ctx.redis.set(`v3bilibiliaid2cid${aid}`, cid);
        }
    }
    let data = await ctx.redis.get(`v3bilibilicid2dan${cid}`);
    if (data) {
        ctx.response.set('X-Koa-Redis', 'true');
        data = JSON.parse(data);
    } else {
        const res = await fetch(`https://api.bilibili.com/x/v1/dm/list.so?oid=${cid}`);
        const result = await res.text();
        const $ = cheerio.load(result.replace(/[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]/g, ''), {
            xmlMode: true
        });
        data = $('d').map((i, el) => {
            const item = $(el);
            const p = item.attr('p').split(',');
            let type = 0;
            if (p[1] === '4') {
                type = 2;
            }
            else if (p[1] === '5') {
                type = 1;
            }
            return [[parseFloat(p[0]), type, parseInt(p[3]), p[6], item.text()]];
        }).get();
        ctx.redis.set(`v3bilibilicid2dan${cid}`, JSON.stringify(data), 10 * 60);
        ctx.response.set('X-Koa-Origin', 'true');
    }
    ctx.body = JSON.stringify({
        code: 0,
        data: data,
    });
};