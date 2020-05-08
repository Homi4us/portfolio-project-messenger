var express = require('express');
var router = express.Router();

const bodyParser = require('body-parser');
const durak = require("./durak")

router.use(bodyParser.json());

router.use('/durak', durak)

module.exports = router