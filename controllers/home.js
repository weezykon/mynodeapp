const models = require('../models');
exports.home = function(req, res, next) {
    res.render('index', { title: 'Express' });
};

exports.submit_lead = function(req, res, next) {
    // console.log("lead email:", req.body.lead_email);
    return models.Lead.create({
        email: req.body.lead_email
    }).then( lead => {
        res.redirect('/emails');
    })
};

exports.fetch_emails = function(req, res, next) {
    return models.Lead.findAll().then( leads => {
        res.render('index', { title: 'Express', leads: leads });
    })
};

exports.show_email = function(req, res, next) {
    return models.Lead.findOne({
        where : {
            id : req.params.lead_id
        }
    }).then( lead => {
        res.render('email', { lead: lead });
    })
};

exports.update_email = function(req, res, next) {
    return models.Lead.update({
        email: req.body.lead_email
    },{ where : {
            id : req.params.lead_id
        }
    }).then( lead => {
        res.redirect('/emails');
    })
};

exports.delete_email = function(req, res, next){
    return models.Lead.destroy({
        where : {
            id : req.params.lead_id
        }
    }).then(lead => {
        res.redirect('/emails');
    })
}