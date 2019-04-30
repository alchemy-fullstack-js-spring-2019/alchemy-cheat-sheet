const User = require('../models/User');

module.exports = async(req, res, next) => {
  console.log(req.cookies);
  try {
    const user = await User.findByToken(req.cookies.session);
    if(!user){
      const error = new Error('Invalid Token');
      error.status = 400;
      return next(error);
    }
    req.user = user;
    next();
  } catch(error){
    next(error);
  }
};
