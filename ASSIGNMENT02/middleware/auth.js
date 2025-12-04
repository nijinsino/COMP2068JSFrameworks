module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.session.error = 'You must be logged in to view that page.';
    res.redirect('/auth/login');
  },

  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/dashboard');
  }
};
