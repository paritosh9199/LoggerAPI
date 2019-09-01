var winston = require('winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const { promisify } = require('util');


function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = (a.getDate()).toString();
    var hour = (a.getHours()).toString();
    var min = (a.getMinutes()).toString();
    var sec = (a.getSeconds()).toString();


    if (date.length == 1) {
        date = '0' + date;
    }
    if (hour.length == 1) {
        hour = '0' + hour;
    }
    if (min.length == 1) {
        min = '0' + min;
    }
    if (sec.length == 1) {
        sec = '0' + sec;
    }

    var time = date + '-' + month + '-' + year + ' T' + hour + ':' + min + ':' + sec;
    // var smallTime = month + ' ' + date + ' \'' + year
    return time;
}


const myMsg = printf(info => {
    // return `[${info.timestamp}] ${info.level}: ${info.message}`;
    return `[${timeConverter(Date.now())}] ${info.level}: ${info.message}`;
    // return `[${Date.now()}] ${info.level}: ${info.message}`;
});

const getIp = (req) => {
    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop() ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    if (ip.substr(0, 7) == "::ffff:") {
        ip = ip.substr(7);
    }
    return ip;
}

const logRequest = (msg = null, level = null, ip = null, method = null, route = null) => {
    if (level == null) {
        level = "info";
    }
    var message = "";
    if (ip != null && ip != "") {
        message = ` ip="${ip}" `;
    }
    if (method != null && method != "") {
        message += ` method="${method}" `;
    }
    if (route != null && route != "") {
        message += ` route="${route}" `;
    }
    if (route != null && route != "") {
        message += ` msg="${msg}" `;

    }
    logger.log(level, message);
}
module.exports = {
    getIp, logRequest
}
const myCustomLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        verbose: 3,
        debug: 4,
        silly: 5
    },
    colors: {
        error: 'red',
        warn: 'yellow',
        info: 'green',
        verbose: 'blue',
        debug: 'cyan',
        silly: 'white'
    }
};
winston.addColors(myCustomLevels.colors);

const logger = createLogger({
    levels: myCustomLevels.levels,
    format: format.combine(
        timestamp(),
        myMsg
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'API_logs.log' }),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
});
