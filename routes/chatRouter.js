var express = require('express');
var router = express.Router();
var passport = require('passport');

const bodyParser = require('body-parser');
var User = require('../models/users');
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

module.exports = router;