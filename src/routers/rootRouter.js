import express from "express";

import { getLogin, postLogin, getJoin, postJoin } from "../controllers/userController";
import {
  getSitelist,
  postSiteForm,
  deleteRow,
  home,
  getNotification,
  postNotification,
  getInvite,
  postInvite,
  getGroupprofile,
  postGroupprofile,
  getSharecomingsoon,
  postSharecomingsoon,
  getJoinSelect,
  postJoinSelect,
  deleteRowAll,
  getFindId,
  postFindId,
  getFindPw,
  postFindPw,
} from "../controllers/mainController.js";
import { publicOnlyMiddleware, protectMiddleware, homeMiddleware } from "../middlewares";
import { getExcel, postExcel } from "../controllers/excelController";
const rootRouter = express.Router();

rootRouter.route(`/`).all(homeMiddleware).get(home).post(postLogin);
rootRouter.route(`/sitelist`).all(protectMiddleware).get(getSitelist).post(postSiteForm);
rootRouter.route(`/deleteRow`).post(deleteRow);
rootRouter.route(`/deleteRowAll`).post(deleteRowAll);
rootRouter.route(`/login`).all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.route(`/join`).all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter
  .route(`/notification`)
  .all(protectMiddleware)
  .get(getNotification)
  .post(postNotification);
rootRouter.route(`/invite`).all(protectMiddleware).get(getInvite).post(postInvite);
rootRouter
  .route(`/sharecomingsoon`)
  .all(protectMiddleware)
  .get(getSharecomingsoon)
  .post(postSharecomingsoon);
rootRouter
  .route(`/groupprofile`)
  .all(protectMiddleware)
  .get(getGroupprofile)
  .post(postGroupprofile);
rootRouter.route("/joinselect").get(getJoinSelect).post(postJoinSelect);
rootRouter.route("/findid").get(getFindId).post(postFindId);
rootRouter.route("/findpw").get(getFindPw).post(postFindPw);

rootRouter.route("/excel").get(getExcel).post(postExcel);

rootRouter.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow: /\nAllow : /$");
});

export default rootRouter;
