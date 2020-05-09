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
router.get('/getRate', authenticate.verifyUser, (req,res,next) => {
    User.findOne({firstname: req.query.firstname, lastname: req.query.lastname})
    .then((doc) => {
        if(!doc){
            res.setHeader("Сontent-Type","application/json")
            res.statusCode = 404
            return res.json({ok: false, data: "Not Found!"})
        }
        res.setHeader("Сontent-Type","application/json")
        res.statusCode = 200
        res.json({ok: true, data: {rating: doc.durak_rate}})
    })
    .catch(e => {
        res.setHeader("Сontent-Type","application/json")
        res.statusCode = 500
        res.json({ok: false, data: {error: e}})
    })
})

module.exports = router