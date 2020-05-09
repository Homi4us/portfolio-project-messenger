var express = require('express');
var router = express.Router();
var passport = require('passport');

const bodyParser = require('body-parser');
var User = require('../models/users');
var Chat = require('../models/chat')
var authenticate = require('../authenticate');

router.use(bodyParser.json());

router.get('/recommendations', authenticate.verifyUser,(req,res,next)=>{
    User.find().sort({_id:-1}).limit(5).then((users)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(users);
    }).catch((err)=>{
        var error = new Error('Что-то пошло не так');
        error.status = 500;
        next(error);
    })
})

router.get('/searchfriend/:username', authenticate.verifyUser, (req,res,next)=>{
    console.log(req.params);
    User.find({username:{$regex: "^"+req.params.username+"",$options:"$i"}}).limit(5).then((users)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(users);
    }).catch((err)=>{
        var error = new Error('Что-то пошло не так');
        error.status = 500;
        next(error);
    })
})

router.post('/addfriend',authenticate.verifyUser,(req,res,next)=>{
    User.findById(req.user._id).then((user)=>{

        if(req.user._id == req.body.id){
            var error = new Error('Вы не можете добавить друзья самого себя');
            error.status = 403;
            next(error);
        } else{

            flag = false;
            user.friends.forEach((el)=>{
                if(el._id == req.body.id){
                    flag = true;
                } 
            })
            if(flag == false){
                user.friends.push(req.body.id);
                user.save();
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json');
                res.json(user);
            } else {
                var error = new Error('Пользователь уже в друзьях');
                error.status = 401;
                next(error);
            }
        }
    }).catch((err)=>{
        var error = new Error('Что-то пошло не так');
        error.status = 500;
        next(error);
    })
})

router.get('/getfriends', authenticate.verifyUser,(req,res,next)=>{
    User.findById(req.user._id).populate('friends.friend._id').then((user)=>{
        var arr = user.friends.map((el)=>{
            return el._id;
        });
        User.find({_id: {$in: arr}}).then((result)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(result);
        }).catch((err)=>{
            var error = new Error('Пользователи не найдены');
            error.status = 500;
            next(error);
        })
    }).catch(()=>{
        var error = new Error('Что-то пошло не так');
        error.status = 500;
        next(error);
    })
})

router.delete('/deletefriend', authenticate.verifyUser,(req,res,next)=>{
    User.findById(req.user._id).then((user)=>{
        var del_id;
        user.friends.forEach((el)=>{
            if(req.body.id == el._id){
                del_id = el._id;
            }
        })
        user.friends.id(del_id).remove();
        user.save();
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(user.friends);
    }).catch((err)=>{
        var error = new Error('Что-то пошло не так');
        error.status = 500;
        next(error);
    })
})

router.post('/setuserdata', authenticate.verifyUser,(req,res,next)=>{
    User.findById(req.user._id).then((user)=>{
        if((req.body.name == '')&&(req.body.lastname == '')&&(req.body.status == '')){
            var error = new Error('Все поля не должны быть пустыми');
            error.status = 400;
            next(error);
        } else {
            if(req.body.name != ''){
                user.firstname = req.body.name; 
            }
            if (req.body.lastname != ''){
                user.lastname = req.body.lastname;
            }
            if (req.body.status != ''){
                user.status = req.body.status
            } 
            user.save();
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(user);
        }
    }).catch((err)=>{
        var error = new Error('Что-то пошло не так');
        error.status = 500;
        next(error);
    })
})

//===================================CHAT========================================

router.post('/createchat', authenticate.verifyUser,(req,res,next)=>{
    Chat.create({created: true}).then((chat)=>{
        chat.members.push(req.user._id);
        chat.members.push(req.body.id);
        chat.save()
        User.find({_id:{ $in: [req.user._id, req.body.id]}}).then((users)=>{
            users[0].chats.push(chat._id);
            users[1].chats.push(chat._id);
            users[0].save();
            users[1].save();
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(chat);
        }).catch((err)=>{
            var error = new Error('Что-то пошло не так');
            error.status = 500;
            console.log(err)
            next(error);
        })
    }).catch((err)=>{
        var error = new Error('Что-то пошло не так при создании чата');
        error.status = 500;
        console.log(err);
        next(error);
    })
})

router.get('/getuserchats', authenticate.verifyUser,(req,res,next)=>{
    User.findById(req.user._id).then((user)=>{
        var chats = user.chats.map((el)=>{return el._id})
        Chat.find({_id:{$in: chats}}).populate({path: "members._id", select:"username", model: "User"}).then((chats)=>{
           
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(chats);
        }).catch((err)=>{
            err.status = 500;
            console.log(err)
            next(err);
        })
    }).catch((err)=>{
            err.status = 500;
            console.log(err)
            next(err);
    })
})

router.get('/getusersinchats', authenticate.verifyUser,(req,res,next)=>{
    User.findById(req.user._id).then((user)=>{
        var chats = user.chats.map((el)=>{return el._id})
        Chat.find({_id:{$in: chats}}).then((chats)=>{
            var members = [];
            chats.forEach((el)=>{
                el.members.forEach((mem)=>{
                    members.push(mem._id)
                })
            });
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json(members);
        }).catch((err)=>{
            err.status = 500;
            next(err);
        })
    }).catch((err)=>{
        err.status = 500;
        next(err);
    })
})

router.post('/addmessage', authenticate.verifyUser, (req,res,next)=>{
    Chat.findById(req.body.chat_id).then((chat)=>{
        var now = new Date();
        var day = now.getDate();
        var month = now.getMonth() + 1;
        var year = now.getFullYear();
        var hours = now.getHours();
        var minutes = now.getMinutes();

        var full_time = "0"+day+".0"+month+"."+year+" "+hours+":"+minutes;

        chat.messages.push({body: req.body.message, user: req.user._id, time: full_time});
        chat.save();
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(chat);
    }).catch((err)=>{
        err.status = 500;
        next(err);
    })
})

router.get('/getchatmessages/:id', authenticate.verifyUser,(req,res,next)=>{
    Chat.findById(req.params.id).populate({path: "messages.user", select:"username picture", model: "User"}).then((chat)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(chat.messages);
    }).catch((err)=>{
        err.status = 500;
        next(err);
    })
})




module.exports = router;