module.exports = function (req, res, next) {
 
    res.locals.error = req.session.error || null;
  res.locals.success = req.session.success || null;
//this will clear flash messages after they've been set
  delete req.session.error;
  delete req.session.success;

  next();
};


