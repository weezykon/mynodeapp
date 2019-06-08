let validator = require('validator');
let models = require('../models');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const validateCreateUserFields = function (errors, req){
    if(!validator.isLength(req.body.password, {min: 4, max: 12})){
        errors['password'] = "Password is required";
    }
}

exports.loginUser = function(errors, req){
    return new Promise(function(resolve, reject) {
        validateCreateUserFields(errors, req);
        return models.User.findOne({
            where: {
                email: req.body.email
            }
        }).then(u => {
            if(u === null){
                errors['email'] = "User doesn't exist";
            }
            resolve(errors);
        })
    })
    
}