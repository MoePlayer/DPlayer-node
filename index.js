const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const logger = require('./utils/logger');
const config = require('./config');

const mongodb = require('./utils/mongodb');
const redis = require('./utils/redis');

const onerror = require('./middleware/onerror');
const header = require('./middleware/header.js');
const accessControl = require('./middleware/access-control.js');

const router = require('./router');

process.on('uncaughtException', (e) => {
    logger.error('uncaughtException: ' + e);
});

logger.info('🎉 DPlayer start! Cheers!');

const app = new Koa();
app.proxy = true;
app.context.mongodb = mongodb;
app.context.redis = redis;

app.use(bodyParser());
app.use(onerror);
app.use(header);
app.use(accessControl);
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.port);
logger.info('Listening Port ' + config.port);