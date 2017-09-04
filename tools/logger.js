var log4js = require('log4js');
log4js.configure({
    appenders: {
        DPlayer: {
            type: 'file',
            filename: 'logs/DPlayer.log',
            maxLogSize: 20480,
            backups: 3,
            compress: true
        },
        console: {
            type: 'console'
        }
    },
    categories: { default: { appenders: ['DPlayer', 'console'], level: 'INFO' } }
});
var logger = log4js.getLogger('DPlayer');

module.exports = logger;