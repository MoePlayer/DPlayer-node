const mongoose = require('mongoose');
const config = require('../config');
const logger = require('./logger');

mongoose.connect(`mongodb://${(config.mongodb.username && config.mongodb.password) ? `${config.mongodb.username}:${config.mongodb.password}@` : ''}${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`);

const db = mongoose.connection;
db.on('error', (e) => {
    logger.error('Mongodb error: ', e);
});
db.once('open', () => {
    logger.info('Mongodb connected');
});

const danmakuSchema = new mongoose.Schema({
    player: {
        type: String,
        index: true,
    },
    author: String,
    time: Number,
    text: String,
    color: Number,
    type: Number,
    ip: String,
    referer: String,
    date: Number,
});
const danmaku = mongoose.model('dan', danmakuSchema);

module.exports = danmaku;