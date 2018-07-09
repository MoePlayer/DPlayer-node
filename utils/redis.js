const logger = require('./logger');
const config = require('../config');
const redis = require('redis');
const { promisify } = require('util');

const options = {
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password,
};
if (!options.password) {
    delete options.password;
}
const client = redis.createClient(options);

client.on('error', (e) => {
    logger.error('Redis error: ', e);
});

client.on('connect', () => {
    logger.info('Redis connected');
});

const getAsync = promisify(client.get).bind(client);

module.exports = {
    set: (key, value, maxAge = 30 * 24 * 60 * 60) => {
        logger.info('Set redis: ' + key);
        client.setex(key, maxAge, value);
    },
    get: async (key) => await getAsync(key),
    del: (key) => {
        client.del(key);
    },
};