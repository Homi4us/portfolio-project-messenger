var express = require('express');
var router = express.Router();
const User = require('../models/users')
var authenticate = require('../authenticate');
const { corsWithOptions } = require('../cors')

const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/info', (req,res,next) => {
    res.setHeader("Content-Type","application/json")
    res.statusCode = 200
    res.json({ok: true})
})
router.get('/getPlayerInfo', authenticate.verifyUser, (req,res,next) => {
    if(!req.query.username){
        res.setHeader("Content-Type","application/json")
        res.statusCode = 400
        return res.json({ok: false, data: "Bad params: username"})
    }
    User.findOne({username: req.query.username})
    .then((doc) => {
        if(!doc){
            res.setHeader("Content-Type","application/json")
            res.statusCode = 404
            return res.json({ok: false, data: "Not Found!"})
        }
        res.setHeader("Content-Type","application/json")
        res.statusCode = 200
        res.json({ok: true, data: {winners: doc.durak_winners, total: doc.durak_total_games}})
    })
    .catch(e => {
        res.setHeader("Content-Type","application/json")
        res.statusCode = 500
        res.json({ok: false, data: {error: e}})
    })
})

module.exports = router