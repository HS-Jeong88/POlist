import express from "express";
import { getLogin, postLogin, getJoin, postJoin } from "../controllers/userController";
import {
  search,
  home,
  getSitelist,
  postSiteForm,
  getAutoLogin,
  postAutoLogin,
} from "../controllers/videoController";
import { publicOnlyMiddleware, homeMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.route(`/`).all(homeMiddleware).get(home);
rootRouter.route(`/sitelist`).get(getSitelist).post(postSiteForm);
rootRouter.route(`/autologin`).get(getAutoLogin).post(postAutoLogin);
rootRouter.route(`/login`).all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.route(`/join`).all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.get(`/search`, search);

export default rootRouter;
