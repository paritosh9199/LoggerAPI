var { env, makeid } = require('./config/config');
const express = require('express');
const app = express();
// const ejs = require('ejs')
const cors = require('cors');
const bodyParser = require('body-parser');
// const _ = require('lodash');

var Fingerprint = require('express-fingerprint')
var session = require('express-session');
// var fs = require('fs');
const path = require('path');
var { mongoose } = require('./db/mongoose');

var { Log } = require('./models/log');
var { Cipher } = require('./libs/cipher');
var { getIp } = require('./middleware/logger');
// var { auth, auth_semi, auth_s2 } = require('./middleware/auth');


app.use(Fingerprint({
    parameters: [
        // Defaults
        Fingerprint.useragent,
        Fingerprint.acceptHeaders,
        Fingerprint.geoip,

        // Additional parameters
        // function(next) {
        // 	// ...do something...
        // 	next(null,{
        // 	'param1':'value1'
        // 	})
        // },
        // function(next) {
        // 	// ...do something...
        // 	next(null,{
        // 	'param2':'value2'
        // 	})
        // },

    ]
}))


app.use(session({
    secret: makeid(12),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))

app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// app.set('views', __dirname + '/views');
app.use('/api/v1/docs', express.static(__dirname + '/documentation'));
app.set('port', (process.env.PORT || 5000))



/**
 * @api {get} / Index Route
 * @apiVersion 1.0.0
 * @apiGroup Analytics
 * @apiDescription This route redirects the request to <code> /fhash </code>
 * 
 */
app.get('/', (req, res) => {
    res.redirect('/fhash');
    // res.send("hey")
});



/**
 * @api {get} /fhash BrowserFingerprint Route
 * @apiVersion 1.0.0
 * @apiGroup Analytics
 * @apiDescription This route returns the fingerprint data of the browser through which the request has been sent.
 * 
 *
 * @apiSuccess {String} hash (Unique) Hash of browser fingerprint
 * @apiSuccess {Object} component  Useragent data, Accept-Headers data
 * @apiSuccess {Object} geoip  IP Locale data
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "hash": "b44f487ae520ea5baeec1b226e993437",
 *       "components": {
 *          "useragent": {
 *              "browser": {
 *                 "family": "Firefox",
 *                 "version": "68"
 *              },
 *              "device": {
 *                 "family": "Other",
 *                 "version": "0"
 *              },
 *              "os": {
 *                 "family": "Windows",
 *                 "major": "10",
 *                 "minor": "0"
 *              }
 *          },
 *          "acceptHeaders": {
 *              "accept": "text/html,application/xhtml+xml,application/xml;q=0.9;q=0.8",
 *              "language": "en-US,en;q=0.5"
 *          },
 *          "geoip": {
 *              "country": null
 *          }
 *        }
 *      }
 * 
 * 
 */
app.get('/fhash', (req, res) => {
    res.send(req.fingerprint);
    // res.send("hey")
});

/**
 * @api {get} /api/:version/analytics.js Analytics.js Route
 * @apiVersion 0.0.1
 * @apiGroup Analytics
 * @apiIgnore Not finished Method
 * @apiDescription Serve the <code> analytics.js </code> file 
 * 
 * @apiParam {String} version="v1" version of the API
 * 
 * 
 * @apiError InvalidVersion The <code> :version </code> is incorrect
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Invalid Version!"
 *     }
 * 
 */
app.get('/api/:version/analytics.js', (req, res) => {
    var v = req.params.version;
    if (v == "v1") {
        res.sendFile(path.join(__dirname + '/libs/analytics.min.js'));
    } else {
        res.status(400).send({success:false, error:"Invalid Version!"});
    }
});



/**
 * @api {post} /api/:version/track Track/Log Activity Route
 * @apiVersion 1.0.0
 * @apiGroup Analytics
 * @apiDescription This route does the actual tracking of the user. It collects user tracking data and stores it in the Database.
 * It stores data as an Object.
 * 
<br> Sample snapshot of input data to be sent: <br><code>
{<br>
&nbsp;&nbsp;"message_type":<\MessageType\>,<br>
&nbsp;&nbsp;"method":\<Method\>,<br>
&nbsp;&nbsp;"route_path":\<RoutePath\>,<br>
&nbsp;&nbsp;"resource_id": \<ResourceID\><br>
}</code><br>
<br>Sample database snapshot:<br>
<code>
{<br>
&nbsp;&nbsp;"_id" : \<ObjectID\>,<br>
&nbsp;&nbsp;"resource_id" : \<ResourceID\>,<br>
&nbsp;&nbsp;"resource_location" : \<Location\>,<br>
&nbsp;&nbsp;"secret" : \<Hash\>,<br>
&nbsp;&nbsp;"log" : [ <br>
&nbsp;&nbsp;&nbsp;&nbsp;{<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"timestamp" : \<Timestamp\>,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"message_type" : \<MessageType\>,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"_id" : \<ObjectID\>,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"ip" : \<IPv4\>,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"method" : \<Method\>,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"route_path" : \<RoutePath\>,<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"hash" : \<Hash\><br>
&nbsp;&nbsp;&nbsp;&nbsp;}<br>
&nbsp;&nbsp;],<br>
&nbsp;&nbsp;"__v" : 0<br>
}</code><br>
 * @apiParam {String} version="v1" version of the API
 * @apiParam {String} resource_id Resource Unique Id.
 * @apiParam {String} message_type="info" Type of tracking data to be stored in database.
 * @apiParam {String} method="get" Method used for formulating the request which is being tracked.
 * @apiParam {String} route_path The path or the location which is being tracked.
 * 
 * 
 * @apiSuccess {Boolean} success Success/failure of operaton.
 * @apiSuccess {Object} message (Optional) Any status messages regarding the operation to be performed.
 * @apiSuccess {Object} data Any data appended to the request.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "message": <Message>,
 *       "data": <Data>
 *     }
 * 
 * @apiError InvalidVersion The <code>:version</code> is incorrect.
 * @apiError InvalidRoutePath The <code>route_path</code>  is invalid or <code>null</code>
 * @apiError InvalidResourceId The <code>resource_id</code>  is invalid or <code>null</code>
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4XX Error 
 *     {
 *        "success": false,
 *        "error": "<Message>"
 *     }
 */
app.post('/api/:version/track', (req, res) => {
    var v = req.params.version;
    if (v == "v1") {
        // timestamp, message_type, ip, method, route, hash
        var rid = req.body.resource_id;
        var data = {
            "timestamp": Date.now(),
            "message_type": (req.body.message_type != null) ? req.body.message_type : "info",
            "ip": getIp(req),
            "method": (req.body.method != null) ? req.body.method : "get",
            "route_path": req.body.route_path,
            "hash": req.fingerprint.hash
        }

        if (!data.route_path) {
            res.status(400).send({
                success: false,
                error: "Please provide a valid route_path."
            })
        }
        try {
            Log.findByRid(rid, (d) => {
                if (d) {
                    console.log(d)
                    Log.addLogByRid(rid, data, (err, doc) => {
                        if (err) {
                            res.status(400).send({
                                success: false,
                                error: err
                            })
                        } else {
                            if (doc) {
                                res.status(200).send({
                                    success: true,
                                    data: doc.toJSON()
                                })
                            } else {
                                res.status(400).send({
                                    success: true,
                                    error: 'Couldn\'t add new log!'
                                })
                            }
                        }
                    })
                } else {
                    res.status(400).send({
                        success: false,
                        error: "Please provide a valid resource_id."
                    })
                }
            })
        } catch (e) {
            res.status(400).send({
                success: false,
                error: e
            })
        }
    } else {
        res.status(400).send({success:false, error:"Invalid Version!"});
    }
});



/**
 * @api {post} /api/:version/registerResource RegsiterResource Route
 * @apiVersion 1.0.0
 * @apiGroup Analytics
 * @apiDescription Before generating tracking data. A resource needs to be registered. A resource is a location of an Website/
 * Application on a Network which can be tracked. To register a resource <code>resource_link</code> and <code>secret</code> needs to be provided.
 * <br><br> Sample Snapshot of input data to be sent: <br><code>
{<br>
&nbsp;&nbsp;"resource_link": \<ResourceLink\>,<br>
&nbsp;&nbsp;"secret": \<Secret\><br>
}</code><br>
 *
 * @apiParam {String} version="v1" Version of the API.
 * @apiParam {String} resource_link Link of the online resource.
 * @apiParam {String} secret Secret Passkey associated with the Resource.
 
 * @apiSuccess {Boolean} success Success/failure of operaton.
 * @apiSuccess {Object} message (Optional) Any status messages regarding the operation to be performed.
 * @apiSuccess {Object} data Any data appended to the request.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "message": <Message>,
 *       "data": {
 *          "resource_id": <ResourceID>
 *       }
 *     }
 * 
 * 
 * @apiError InvalidVersion The <code>:version</code> is incorrect
 * @apiError InvalidResourceLink The <code>resource_link</code>  is invalid, duplicate or <code>null</code>
 * @apiError InvalidSecret The <code>secret</code> is invalid or <code>null</code>
 * @apiError error <code>\<Message\></code> contains more information about the error occured.
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4XX Error 
 *     {
 *        "success": false,
 *        "error": "<Message>"
 *     }
 * 
 */
app.post('/api/:version/registerResource', (req, res) => {
    var v = req.params.version;
    if (v == "v1") {
        var link = req.body.resource_link;
        var secret = req.body.secret;

        var log = new Log({
            resource_id: `RID-${makeid(12)}-${makeid(12)}-${makeid(12)}`,
            resource_location: link,
            secret: secret
        });
        if (!link) {
            res.status(400).send({
                success: false,
                error: "Please provide a valid resource_link."
            })
        }
        if (!secret || secret.length < 6) {
            res.status(400).send({
                success: false,
                error: "Please provide a secret key of length more than 6 characters."
            })
        }
        Log.resourceExists(link).then(function (data) {
            if (!data) {
                // if (body.confpassword == body.password) {
                log.save().then((doc) => {
                    // return user.generateAuthToken();
                    res.status(200).send({
                        success: true,
                        data: {
                            resource_id: doc.resource_id
                        }
                    });
                }).catch((e) => {
                    // res.status(400).send(e);
                    var msg = { "message": e };
                    res.status(400).send({
                        success: false,
                        msg
                    })
                })
            } else {
                var msg = { "message": "Resource already exists with given credentials!" };
                res.status(400).send({
                    success: false,
                    data: {
                        msg
                    }
                });
            }
        })
    } else {
        res.status(400).send({success:false, error:"Invalid Version!"});
    }
});



/**
 * @api {get} /api/:version/getLogs GetLogs Route
 * @apiVersion 1.0.0
 * @apiGroup Analytics
 * @apiDescription Use this route to get the tracking logs of a resource. This requires the usage of <code>resource_id</code> and <code>secret</code>.
 * 
 <br> Sample snapshot of input data to be sent: <br><code>
{<br>
&nbsp;&nbsp;"resource_id": \<ResourceID\>,<br>
&nbsp;&nbsp;"secret": \<Secret\><br>
}</code><br>

 <br> Sample snapshot of <code>LogArray</code> Element: <br><code>
{<br>
&nbsp;&nbsp;"timestamp": \<Timestamp\>,<br>
&nbsp;&nbsp;"message_type": \<MessageType\>,<br>
&nbsp;&nbsp;"_id": \<ObjectID\>,<br>
&nbsp;&nbsp;"ip": \<IPv4\>,<br>
&nbsp;&nbsp;"method": \<Method\>,<br>
&nbsp;&nbsp;"route_path": \<RoutePath\>,<br>
&nbsp;&nbsp;"hash": \<Hash\><br>
} </code><br>


 * @apiParam {String} version="v1" Version of the API.
 * @apiParam {String} resource_link Link of the online resource.
 * @apiParam {String} secret Secret Passkey associated with the Resource.
 *
 * @apiSuccess {Boolean} success Success/failure of operaton.
 * @apiSuccess {Object} message (Optional) Any status messages regarding the operation to be performed.  
 * @apiSuccess {Object} data It contains the LogArray Object.
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": {
 *          "log": [<LogsArray>]
 *       },
 *       "message": <Message>
 *     }
 * 
 * @apiError InvalidVersion The <code> :version </code> is incorrect
 * @apiError InvalidResourceId The <code>resource_id</code>  is invalid or <code>null</code>
 * @apiError InvalidSecret The <code>secret</code> is invalid or <code>null</code>
 * @apiError error <code>\<Message\></code> contains more information about the error occured.
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4XX Error 
 *     {
 *        "success": false,
 *        "error": <Message>
 *     }
 * 
 */
app.get('/api/:version/getLogs', (req, res) => {
    var v = req.params.version;
    if (v == "v1") {
        var resource_id = (req.body. resource_id!=null)? req.body.resource_id: req.query.resource_id;
        var secret = (req.body.secret!=null)? req.body.secret: req.query.secret;

        if (!resource_id) {
            res.status(400).send({
                success: false,
                error: "Please provide a valid RESOURCE ID (rid)."
            })
        }

        if (!secret) {
            res.status(400).send({
                success: false,
                error: "Please provide a valid secret."
            })
        }

        Log.findByCredentials(resource_id, secret).then((doc) => {
            if (doc) {
                res.status(200).send({
                    success: true,
                    data: doc.toLog()
                });
            }
        }).catch((e) => {
            res.status(400).send({success:false, error:"Invalid Credentials!"});
        });

    } else {
        res.status(400).send({success:false, error:"Invalid Version!"});
    }

});


/**
 * @api {delete} /api/:version/removeLogs RemoveLogs Route
 * @apiVersion 1.0.0
 * @apiGroup Analytics
 * @apiDescription Use this route to clear the tracking logs of a resource. This requires the usage of <code>resource_id</code> and <code>secret</code>.
 * 
 <br> Sample snapshot of input data to be sent: <br><code>
{<br>
&nbsp;&nbsp;"resource_id": \<ResourceID\>,<br>
&nbsp;&nbsp;"secret":\<Secret\><br>
} </code><br>

 * @apiParam {String} version="v1" version of the API
 *
 * @apiSuccess {Boolean} success Success/failure of operaton.
 * @apiSuccess {Object} message (Optional) Any status messages regarding the operation to be performed.
 * @apiSuccess {Object} data Any data appended to the request.


 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "message": <Message>,
 *       "data": <Data>
 *     }
 * 

 * @apiError InvalidVersion The <code>:version</code> is incorrect
 * @apiError InvalidResourceId The <code>resource_id</code>  is invalid or <code>null</code>
 * @apiError InvalidSecret The <code>secret</code> is invalid or <code>null</code>
 * @apiError error <code>\<Message\></code> contains more information about the error occured.
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4XX Error 
 *     {
 *        "success": false,
 *        "error": <Message>
 *     }
 * 
 */
app.delete('/api/:version/removeLogs', (req, res) => {
    var v = req.params.version;
    if (v == "v1") {
        var resource_id = req.body.resource_id;
        var secret = req.body.secret;

        if (!resource_id) {
            res.status(400).send({
                success: false,
                error: "Please provide a valid ResourceID."
            })
        }

        if (!secret) {
            res.status(400).send({
                success: false,
                error: "Please provide a valid secret."
            })
        }

        Log.findByCredentials(resource_id, secret).then((doc) => {
            if (doc) {
                Log.removeAllLog(resource_id, (err, doc) => {
                    if (err) {
                        res.status(400).send({
                            success: false,
                            error: err
                        })
                    } else {
                        if (doc) {
                            res.status(200).send({
                                success: true,
                                data: doc.toJSON()
                            })
                        } else {
                            res.status(400).send({
                                success: true,
                                error: 'Couldn\'t remove log!'
                            })
                        }
                    }
                })
            }
        }).catch((e) => {
            res.status(400).send({success:false, error:"Invalid Credentials!"});
        });
    } else {
        res.status(400).send({success:false, error:"Invalid Version!"});
    }
    // vae secret = 
});


/**
 * @api {delete} /api/:version/removeResource RemoveResource Route
 * @apiVersion 1.0.0
 * @apiGroup Analytics
 * @apiDescription Use this route to delete all resource related logs and data. This requires the usage of <code>resource_id</code> and <code>secret</code>.
 * 
 <br> Sample snapshot of input data to be sent: <br><code>
{<br>
&nbsp;&nbsp;"resource_id": \<ResourceID\>,<br>
&nbsp;&nbsp;"secret": \<Secret\><br>
} </code><br>

 * @apiParam {String} version="v1" version of the API
 *
 * @apiSuccess {Boolean} success Success/failure of operaton.
 * @apiSuccess {Object} message (Optional) Any status messages regarding the operation to be performed.
 * @apiSuccess {Object} data Any data appended to the request.


 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "message": <Message>,
 *       "data": <Data>
 *     }
 * 

 * @apiError InvalidVersion The <code>:version</code> is incorrect
 * @apiError InvalidResourceId The <code>resource_id</code>  is invalid or <code>null</code>
 * @apiError InvalidSecret The <code>secret</code> is invalid or <code>null</code>
 * @apiError error <code>\<Message\></code> contains more information about the error occured.
 * 
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 4XX Error 
 *     {
 *        "success": false,
 *        "error": <Message>
 *     }
 * 
 */
app.delete('/api/:version/removeResource', (req, res) => {
    var v = req.params.version;
    if (v == "v1") {
        var resource_id = req.body.resource_id;
        var secret = req.body.secret;

        if (!resource_id) {
            res.status(400).send({
                success: false,
                error: "Please provide a valid ResourceID."
            })
            res.end();
        }

        if (!secret) {
            res.status(400).send({
                success: false,
                error: "Please provide a valid secret."
            })
            res.end();
        }

        Log.findByCredentials(resource_id, secret).then((doc) => {
            if (doc) {
                Log.removeResource(resource_id, (doc) => {
                    if (doc) {
                        res.status(200).send({
                            success: true,
                            data: doc.toJSON()
                        })
                        res.end();
                    } else {
                        res.status(400).send({
                            success: true,
                            error: 'Couldn\'t remove resource!'
                        })
                        res.end();
                    }
                })
            }
        }).catch((e) => {
            res.status(400).send({success:false, error:"Invalid Credentials!"});
        });
    } else {
        res.status(400).send({success:false, error:"Invalid Version!"});
    }
});

// app.get('/api/:id', function (req, res) {
//     var id = req.params.id;
//     if (id == "regmode") {
//         if (process.env.REG_MODE == 0) {
//             process.env.REG_MODE = 1;
//         } else {
//             process.env.REG_MODE = 0;
//         }
//         res.send("REG_MODE: " + process.env.REG_MODE)
//     }
// })

app.get('/api/:version/docs', (req, res) => {
    var v = req.params.version;
    if (v == "v1") {
        res.sendFile(path.join(__dirname + '/documentation/index.html'));
    } else {
        res.status(400).send({success:false, error:"Invalid Version!"});
    }
})

app.get('*', (req, res) => {
    res.status(400).send("[404] - Resource not found!");
})

app.listen(app.get('port'), process.env.IP, function () {
    console.log(`Server started at ${app.get('port')}`);
    console.log(`env: ${env}`);
    // console.log(`REG_MODE: ${process.env.REG_MODE}`);
});