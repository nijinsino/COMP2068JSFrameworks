
// Authentication middleware to protect routes
module.exports = {

    // Middleware to ensure the user is authenticated
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    // If not authenticated, it will redirect to login
    req.session.error = 'You must be logged in to view that page.';
    res.redirect('/auth/login');
  },
// this middleware to ensure the user is a guest (not authenticated)
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/dashboard');
  }
};
