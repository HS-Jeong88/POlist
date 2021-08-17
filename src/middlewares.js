import multer from "multer";

export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "로그인 비서";
  res.locals.loggedInUser = req.session.user || {};
  next();
};

export const protectMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "로그인을 먼저 해주세요");
    return res.redirect("/");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    // req.flash("error", "Not authorized");
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
  dest: "uploads/avatars/",
  limits: {
    filesize: 10 * 1024 * 1024,
  },
});

export const checkExcel = async (excel) => {
  if (!fs.existsSync(excel.path)) throw new errors();
  const obj = xlsx.parse(excel.path);
  console.log(obj);
  console.log(obj[0]);
  console.log(obj[0].data);
  for (const data of obj[0].data) {
    console.log(data);
    console.log(data[0]);
  }
};
