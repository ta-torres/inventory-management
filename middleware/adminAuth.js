// require("dotenv").config();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

exports.requireAdmin = (req, res, next) => {
  // if the user is an admin continue the middleware chain
  if (req.session && req.session.isAdmin) {
    return next();
  }

  // redirect back to the original URL after login in postAdminLogin
  req.session.redirectUrl = req.originalUrl;
  res.redirect("/admin/login");
};

exports.getAdminLogin = (req, res) => {
  res.render("admin-login", {
    title: "Admin Access Required",
    error: req.query.error,
  });
};
/*
    get password from request body
    check match with env variable
      if match, set request variable to true
      set response to redirect back to the page
    in fail redirect back to login
*/
exports.postAdminLogin = (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    req.session.isAdmin = true;

    const redirectUrl = req.session.redirectUrl || req.get("Referer") || "/"; // if redirect doesnt work default back to the url it came from
    delete req.session.redirectUrl;

    res.redirect(redirectUrl);
  } else {
    res.redirect("/admin/login?error=Invalid password");
  }
};
