const mongoose = require('mongoose');
// const validator = require('validator');
// const jwt = require('jsonwebtoken');
// const _ = require('lodash');
// const bcrypt = require('bcryptjs');
const { MongoClient, ObjectID } = require('mongodb');

var BlogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    authorId: {
        type: String,
        required: true,
        default:"user",
        trim: true,
        minlength: 1
    },
    privateMode: {
        type: Number,
        default: 0,
        minlength: 1
    },
    // authorName: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     minlength: 5
    // },
    contentType: {
        type: String,
        required: true,
        trim: true,
        default: 'notes',
        minlength: 5
    },
    createdOn: {
        type: Number,
        required: true,
        default: Date.now(),
        minlength: 1,
        trim: true
    },
    // expireOn: {
    //     type: Number,
    //     required: true,
    //     default: Date.now() + 8640000000,
    //     minlength: 1,
    //     trim: true
    // },
    // link: {
    //     type: String,
    //     // required: true,
    //     trim: true,
    //     minlength: 1,
    //     validate: {
    //         validator: validator.isURL,
    //         message: '{VALUE} is not a valid URL'
    //     }
    // }

});

// BlogSchema.methods.toJSON = function () {
//     var notif = this;
//     var notifObject = notif.toObject();

//     return _.pick(notifObject, ['_id', 'email']);
// };

// BlogSchema.methods.generateAuthToken = function () {
//     var notif = this;
//     var access = 'auth';
//     var token = jwt.sign({ _id: notif._id.toHexString(), access }, process.env.JWT_SECRET).toString();

//     notif.tokens.push({ access, token });

//     return notif.save().then(() => {
//         return token;
//     });
// };

BlogSchema.statics.deleteBlog = function (id) {
    var blog = this;

    return blog.findOneAndDelete({
        _id: id
    }).then((result) => {
        // console.log(result);
    });
};


BlogSchema.statics.findById = function (id) {
    var blog = this;
    if (ObjectID.isValid(id)) {
        return blog.findOne({
            '_id': id,
        });
    }
    // } else {
    //     return "";
    // }
};

BlogSchema.statics.updateById = function (id,title,content, callback) {
    var blog = this;
    if (ObjectID.isValid(id)) {
        blog.findOneAndUpdate({
            '_id': id,
        },{$set:{
            title,
            content
        }},{ new: true },(err,doc)=>{
            callback(err,doc);
        });
    }
    // } else {
    //     return "";
    // }
};

BlogSchema.statics.getAllNotes = function (callback) {
    var blog = this;
    blog.find({}).then((docs) => {
        callback(docs);
    }, (err) => {
        console.log('Unable to fetch blogs', err);
        return err;
    });
};

BlogSchema.statics.getRecentNotes = function (callback) {
    var sortParam = {'createdOn': -1}
    var blog = this;
    blog.find({}).sort(sortParam).then((docs) => {
        callback(docs);
    }, (err) => {
        console.log('Unable to fetch blogs', err);
        return err;
    });
};

BlogSchema.statics.getCount = function (callback) {
    var blog = this;
    blog.find({}).then((blogCount) => {
        callback(blogCount.length);
    }, (err) => {
        console.log('Unable to fetch blog', err);
        return err;

    });
};

BlogSchema.statics.deleteByID = function (id, callback) {
    var blog = this;
    blog.findOneAndDelete({
        _id: new ObjectID(id)
    }).then((data) => {
        callback(data);
    }, (err) => {
        console.log('Unable to delete blogs', err);
        return err;
    });
};

// BlogSchema.statics.findByCredentials = function (email, password) {
//     var notif = this;

//     return notif.findOne({ email }).then((notif) => {
//         if (!notif) {
//             return Promise.reject();
//         }

//         return new Promise((resolve, reject) => {
//             // Use bcrypt.compare to compare password and notif.password
//             bcrypt.compare(password, notif.password, (err, res) => {
//                 if (res) {
//                     resolve(notif);
//                 } else {
//                     reject();
//                 }
//             });
//         });
//     });
// };

// BlogSchema.pre('save', function (next) {
//     var notif = this;

//     if (notif.isModified('password')) {
//         bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(notif.password, salt, (err, hash) => {
//                 notif.password = hash;
//                 next();
//             });
//         });
//     } else {
//         next();
//     }
// });

var Note = mongoose.model('Note', BlogSchema);

module.exports = { Note }
