var express = require('express');
var router = express.Router();

let home = require('../controllers/home');
let user = require('../controllers/user');

router.get('/login', user.show_login);
router.post('/login', user.login);
router.get('/signup', user.show_signup);
router.post('/signup', user.signup);
router.get('/logout', user.logout);
router.post('/logout', user.logout);
/* GET home page. */
router.get('/', home.home);
router.post('/', home.submit_lead);
router.get('/emails', home.fetch_emails);
router.get('/email/:lead_id', home.show_email);
router.post('/email/:lead_id', home.update_email);
router.get('/delete/:lead_id', home.delete_email);

module.exports = router;
