var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Chats = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  }
})

var Friends = new Schema({
    friend:{
      type: mongoose.Schema.Types.ObjectId,
    }
});

var User = new Schema({
    firstname: {
      type: String,
        default: 'No'
    },
    lastname: {
      type: String,
        default: 'Name'
    },
    admin:   {
        type: Boolean,
        default: false
    },
    picture: {
        type: String,
        default: 'https://pngimage.net/wp-content/uploads/2018/06/%D0%B0%D0%BD%D0%BE%D0%BD%D0%B8%D0%BC-png-7.png'
    },
    durak_rate:{
      type: Number,
      default: 0
    },
    friends: [ Friends ],
    status: {
        type: String,
        default: 'нет статуса'
    },
    chats: [ Chats ]
},{
  timestamp:true
});

User.plugin(passportLocalMongoose);

User.set('autoIndex', false);
module.exports = mongoose.model('User', User);