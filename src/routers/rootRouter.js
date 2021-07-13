import express from "express";

import { index } from "../controllers/rootController";
import { getLogin, postLogin, getJoin, postJoin } from "../controllers/userController";
import {
  getSitelist,
  postSiteForm,
  getAutoLogin,
  postAutoLogin,
  deleteRow,
} from "../controllers/mainController";
import { publicOnlyMiddleware, homeMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.route(`/`).all(homeMiddleware).get(index).post(postLogin);
rootRouter.route(`/sitelist`).get(getSitelist).post(postSiteForm);
rootRouter.route(`/deleteRow`).post(deleteRow);
rootRouter.route(`/autologin`).get(getAutoLogin).post(postAutoLogin);
rootRouter.route(`/login`).all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.route(`/join`).all(publicOnlyMiddleware).get(getJoin).post(postJoin);

export default rootRouter;
