var express = require('express');
var router = express.Router();

let home = require('../controllers/home');
/* GET home page. */
router.get('/', home.home);
router.post('/', home.submit_lead);

module.exports = router;
