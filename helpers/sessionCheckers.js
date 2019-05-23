module.exports = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    let userId = req.user.id 
    let type = req.user.type
    res.redirect(`/${type}/${userId})`);
  } else {
    next();
  }    
}