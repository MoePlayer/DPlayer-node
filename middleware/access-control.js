const blacklist = (process.env.BLACKLIST && process.env.BLACKLIST.split(',')) || [];
const whitelist = process.env.WHITELIST && process.env.WHITELIST.split(',');

module.exports = async (ctx, next) => {
    const ip = ctx.ips[0] || ctx.ip;
    const referer = ctx.request.headers.referer;

    const refererAllowed = (whitelist && whitelist.indexOf(referer) !== -1) || blacklist.indexOf(referer) === -1;
    const ipAllowed = (whitelist && whitelist.indexOf(ip) !== -1) || blacklist.indexOf(ip) === -1;

    if (refererAllowed && ipAllowed) {
        await next();
    } else {
        ctx.response.status = 403;

        ctx.body = JSON.stringify({
            code: 1,
            msg: `${!refererAllowed ? '该站点' : '你的 IP '}没有访问权限`,
        });
    }
};
