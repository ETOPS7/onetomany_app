const checkSession = (req, res, next) => {
  console.log('((checkSession))', req.session);
  if (req.session.userId) {
    res.locals.userId = req.session.userId;
    res.locals.userName = req.session.userName;
    return next();
  }
  return next();
};

module.exports = checkSession;
