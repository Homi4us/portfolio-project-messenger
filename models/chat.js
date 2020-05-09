var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Members = new Schema({
    id :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

var Messages = new Schema({
    body:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: String,
        required: true
    }
})

var Chat = new Schema({
    created: false,
    messages: [ Messages ],
    members: [ Members ]
})


Chat.set('autoIndex', false);
module.exports = mongoose.model('Chat',Chat);