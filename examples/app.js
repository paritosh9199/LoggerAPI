const { log, getIp } = require('../app.js');

// log(msg, level, ip, method, route)
var levels = {
    "err": "error",
    "wrn": "warn",
    "info": "info",
    "verb": "verbose",
    "debg": "debug",
    "sly": "silly"
}
msg = "some rand message";
errmsg = "some error message";
ip = "::1";
method = "POST";
route = "/test";
level = "info";
levelerr = "error";


for (var i = 0; i < 10; i++) {
    // log(msg + " " + i, levels.err, ip, method, route)
    // log(msg + " " + i, levels.wrn, ip, method, route)
    log(msg + " " + i, levels.info, ip, method, route)
    // log(msg + " " + i, levels.verb, ip, method, route)
    // log(msg + " " + i, levels.debg, ip, method, route)
    // log(msg + " " + i, levels.sly, ip, method, route)
}