exports.home = function(req, res, next) {
    res.render('index', { title: 'Express' });
};

exports.submit_lead = function(req, res, next) {
    console.log("lead email:", req.body.lead_email);
    res.redirect('/');
    console.log('got here');
};