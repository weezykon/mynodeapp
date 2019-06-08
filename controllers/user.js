let models = require('../models');
let bcrypt = require('bcrypt');
const passport = require('passport');
const myPassport = require('../passport_setup');
let flash = require('connect-flash');
const {isEmpty} = require('lodash');
const {validateUser} = require('../validators/signup');
const {loginUser} = require('../validators/login');

exports.show_login = function(req, res, next) {
    res.render('login', { formData: {}, errors: {} });
};

exports.show_signup = function(req, res, next) {
    res.render('signup', { formData: {}, errors: {} });
};

const rerender_signup = function(errors, req, res, next) {
    res.render('signup', { formData: req.body, errors: errors });
};

const rerender_login = function(errors, req, res, next) {
    res.render('login', { formData: req.body, errors: errors });
};

const generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null); 
}

exports.signup = function(req, res, next) {
    let errors = {};
    return validateUser(errors, req).then(errors =>{
        if (!isEmpty(errors)) {
            rerender_signup(errors, req, res, next);
        } else {
            const newUser = models.User.build({
                email: req.body.email,
                username: req.body.username,
                password: generateHash(req.body.password)
            });
            return newUser.save().then(result => {
                passport.authenticate('local', {
                    successRedirect: "/",
                    failureRedirect: "/signup",
                    failureFlash: true
                })(req, res, next);
            }).catch(function(err) {
                // print the error details
                console.log(err, req.body.email);
            });
        }
    });
}

exports.login = function(req, res, next) {
    let errors = {};
    return loginUser(errors, req).then(errors =>{
        if (!isEmpty(errors)) {
            rerender_login(errors, req, res, next);
            console.log(errors);
        } else {
            // passport.authenticate('local', {
            //     successRedirect: "/",
            //     failureRedirect: "/login",
            //     failureFlash: true
            // })(req, res, next);
        }
    });
}

exports.logout = function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
}