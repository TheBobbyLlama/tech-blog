// BUG BUG BUG - This is preventing navigation on login somehow?
const withAuth = (req, res, next) => {
	/*if (!req.session.user_id) {
	  res.redirect("/login");
	} else {*/
	  next();
	//}
};
  
module.exports = withAuth;