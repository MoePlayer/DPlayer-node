var fs = require('fs');
var blanklist = fs.readFileSync('blacklist').toString().split('\n');

module.exports = function (text) {
    for (var i = 0; i < blanklist.length; i++) {
        if (new RegExp(blanklist[i]).test(text)) {
            return true;
        }
    }
    return false;
}