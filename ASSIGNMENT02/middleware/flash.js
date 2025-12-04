module.exports = function (req, res, next) {
  res.locals.error = req.session.error || null;
  res.locals.success = req.session.success || null;

  delete req.session.error;
  delete req.session.success;

  next();
};

