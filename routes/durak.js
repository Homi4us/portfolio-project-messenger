var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/info', (req,res,next) => {
    res.setHeader("content-type","application/json")
    res.statusCode = 200
    res.json({ok: true})
})

module.exports = router