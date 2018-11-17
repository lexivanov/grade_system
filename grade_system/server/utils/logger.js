const fs = require('fs');
const constants = require('../utils/constants.js');
const logFile = __dirname + '/../log.txt';

exports.log = function (message) {

    const resultMessage = '(' + new Date().toISOString() + '): ' + message + '\n';

    fs.stat(logFile, function (err, stats) {
        if (err) {
            if (err.code === constants.errorCodes.noFile) {
                fs.writeFile(logFile, '', function (err) {
                    if (err) throw err;
                });
            } else {
                throw err;
            }
        }
    });

    fs.appendFile(logFile, resultMessage, function (err) {
        if (err) throw err;
    });
};