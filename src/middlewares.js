import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Auto Login";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    req.flash("error", "Lof in first.");
    return res.redirect("/login");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};
export const homeMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  }
  return res.redirect("/sitelist");
};

export const avatarUpload = multer({
  dest: "uploads/avatars",
  limits: {
    filesize: 3000000,
  },
});
