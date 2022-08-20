const checkSession = (req, res, next) => {
  console.log('((checkSession))', req.session);
  if (req.session.userId) {
    res.locals.userId = req.session.user.id;
    res.locals.userName = req.session.user.name;
    return next();
  }
  return next();
};

module.exports = checkSession;
