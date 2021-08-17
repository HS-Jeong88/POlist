export const getExcel = (req, res, next) => {
  return res.render("index", {});
};

export const postExcel = (req, res, next) => {
  console.log(req.body);
  // res.redirect("/");
};
