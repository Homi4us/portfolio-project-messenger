var express = require('express');
var router = express.Router();
var passport = require('passport');

const bodyParser = require('body-parser');
var User = require('../models/users');
var authenticate = require('../authenticate');

router.use(bodyParser.json());

router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {

  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

router.get('/logout', authenticate.verifyUser,(req, res) => {
    res.clearCookie('jwt_token');
    res.redirect('/');
    res.statusCode = 200;
    res.end('loggedout');
});

router.post('/checkToken',authenticate.verifyUser,(req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json({token_status: 'OK'});
});

router.post('/getuserdata',authenticate.verifyUser,(req,res)=>{
    let id = req.user._id;
    User.find({_id:id}).then((user)=>{
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json(user);
    }).catch((err)=>{
        res.statusCode = 404;
        res.setHeader('Content-Type','application/json');
        res.json({err:err});
    })
})
module.exports = router;
