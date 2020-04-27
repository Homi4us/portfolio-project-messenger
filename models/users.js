var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Friends = new Schema({
    friend:{
      type: mongoose.Schema.Types.ObjectId,
    }
});

var User = new Schema({
    firstname: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
        default: ''
    },
    admin:   {
        type: Boolean,
        default: false
    },
    picture: {
        type: String,
        default: 'https://pngimage.net/wp-content/uploads/2018/06/%D0%B0%D0%BD%D0%BE%D0%BD%D0%B8%D0%BC-png-7.png'
    },
    friends: [ Friends ]
},{
  timestamp:true
});

User.plugin(passportLocalMongoose);

User.set('autoIndex', false);
module.exports = mongoose.model('User', User);