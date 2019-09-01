const mongoose = require('mongoose');
// const validator = require('validator');
// const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const { MongoClient, ObjectID } = require('mongodb');


var LogSchema = new mongoose.Schema({

    resource_id: {
        type: String,
        required: true,
        minlength: 1,
    },
    resource_location: {
        type: String,
        minlength: 1
    },
    secret: {
        type: String,
        required: true,
        minlength: 6
    },
    log: [{
        timestamp: {
            type: Number,
            required: true,
            default: Date.now(),
            trim: true,
            minlength: 1
        },
        route_path: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        message_type: {
            type: String,
            required: true,
            default: "info",
            trim: true,
            minlength: 1
        },
        ip: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        method: {
            type: String,
            required: true,
            trim: true,
            minlength: 1
        },
        hash: {
            type: String,
            trim: true,
            required: true,
            minlength: 1
        }
    }],

});

LogSchema.methods.toJSON = function () {
    var logObject = this;
    var logObjectObject = logObject.toObject();

    return _.pick(logObjectObject, ['resource_id', 'log']);
};

LogSchema.methods.toLog = function () {
    var logObject = this;
    var logObjectObject = logObject.toObject();

    return _.pick(logObjectObject, ['log']);
};

// LogSchema.methods.generateAuthToken = function () {
//     var logObject = this;
//     var access = 'auth';
//     var token = jwt.sign({ _id: logObject._id.toHexString(), access }, process.env.JWT_SECRET).toString();

//     logObject.tokens.push({ access, token });

//     return logObject.save().then(() => {
//         return token;
//     });
// };

LogSchema.statics.resourceExists = function (resource_location) {
    var logObject = this;

    return Log.findOne({
        resource_location
    }).then((doc) => {
        if (doc) {
            return doc;
        } else {
            return false;
        }
    });
}

LogSchema.statics.removeResource = function (rid,cb) {
    var logObject = this;

    return logObject.findOneAndDelete({
        'resource_id': rid,
    }).then((result) => {
        cb(result)
    });
};


LogSchema.statics.findById = function (id) {
    var logObject = this;
    if (ObjectID.isValid(id)) {
        return logObject.findOne({
            '_id': id,
        });
    }
};

LogSchema.statics.findByRid = function (rid, callback) {
    var logObject = this;
    logObject.findOne({
        'resource_id': rid,
    })
        .then((result) => {
            // console.log(result);
            callback(result);
        });
};

LogSchema.statics.updateById = function (id, timestamp, message_type, ip, method, route, hash) {
    var logObject = this;
    if (ObjectID.isValid(id)) {
        logObject.findOneAndUpdate({
            '_id': id,
        }, {
                $push: {
                    log: {
                        timestamp,
                        message_type,
                        ip,
                        method,
                        route_path,
                        hash
                    }
                }
            }, { new: true }, (err, doc) => {
                callback(err, doc);
            });
    }
};

LogSchema.statics.removeAllLog = function (rid, cb) {
    var logObject = this;

    return logObject.findOneAndUpdate({
        'resource_id': rid,
    }, {
            $set: {
                log: []
            }
        }, { new: true }, (err, doc) => {
            cb(err, doc)
        })
};

LogSchema.statics.addLogByRid = function (rid, data, cb) {
    var logObject = this;
    // if (ObjectID.isValid(id)) {
    // try {
    return logObject.findOneAndUpdate({
        'resource_id': rid,
    }, {
            $push: {
                log: {
                    timestamp: data.timestamp,
                    message_type: data.message_type,
                    ip: data.ip,
                    method: data.method,
                    route_path: data.route_path,
                    hash: data.hash
                }
            }
        }, { new: true }, (err, doc) => {
            cb(err, doc)

        })

};

LogSchema.statics.getAllLogs = function (rid, callback) {
    var logObject = this;
    logObject.find({
        'resource_id': rid
    }).then((docs) => {
        callback(docs);
    }, (err) => {
        console.log('Unable to fetch logObjects', err);
        return err;
    });
};


LogSchema.statics.getCount = function (callback) {
    var logObject = this;
    logObject.find({}).then((logObjectCount) => {
        callback(logObjectCount.length);
    }, (err) => {
        console.log('Unable to fetch logObject', err);
        return err;

    });
};

LogSchema.statics.deleteByID = function (id, callback) {
    var logObject = this;
    logObject.findOneAndDelete({
        _id: new ObjectID(id)
    }).then((data) => {
        callback(data);
    }, (err) => {
        console.log('Unable to delete logObjects', err);
        return err;
    });
};

LogSchema.statics.findByCredentials = function (rid, secret) {
    var logObject = this;

    return logObject.findOne({
        'resource_id': rid
    }).then((doc) => {
        if (!doc) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            // Use bcrypt.compare to compare password and logObject.password
            bcrypt.compare(secret, doc.secret, (err, res) => {
                if (res) {
                    resolve(doc);
                } else {
                    reject();
                }
            });
        });
    });
};

LogSchema.pre('save', function (next) {
    var resource = this;

    if (resource.isModified('secret')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(resource.secret, salt, (err, hash) => {
                resource.secret = hash;
                next();
            });
        });
    } else {
        next();
    }
});

var Log = mongoose.model('Log', LogSchema);

module.exports = { Log }
