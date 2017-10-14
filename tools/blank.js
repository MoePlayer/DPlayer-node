var fs = require('fs');
var blanklist = fs.readFileSync('blacklist').toString().split('\n');

module.exports = function (text) {
    return blanklist.indexOf(text.split(',')[0]) !== -1;
}