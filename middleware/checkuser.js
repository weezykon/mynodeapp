var createError = require('http-errors');

exports.isLoggedin = function(req, res, next) {
    if (req.user) {
        next()
    } else {
        next(createError(404, 'You went to the wrong page Fam'));
    }
};