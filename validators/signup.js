let validator = require('validator');
let models = require('../models');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const validateCreateUserFields = function (errors, req){
    if(!validator.isEmail(req.body.email)){
        errors['email'] = "Please use a valid email";
    }
    if(!validator.isAscii(req.body.password)){
        errors['password'] = "Invalid characters in password";
    }
    if(!validator.isLength(req.body.password, {min: 4, max: 12})){
        errors['password'] = "Please ensure your password is min of 4 and max of 12";
    }
}

exports.validateUser = function(errors, req){
    return new Promise(function(resolve, reject) {
        validateCreateUserFields(errors, req);
        return models.User.findOne({
            where: {
                email: req.body.email
            }
            // where: {
            //     [Op.or]: [{email: req.body.email}, {username: req.body.username}]
            // }
        }).then(u => {
            if(u !== null){
                errors['email'] = 'User already exist';
            }
            resolve(errors);
        })
    })
    
}