import express from "express";
import { getLogin, postLogin, getJoin, postJoin } from "../controllers/userController";
import { search, home, postSiteForm } from "../controllers/videoController";
import { publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.route(`/`).get(home).post(postSiteForm);
rootRouter.route(`/login`).all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.route(`/join`).all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.get(`/search`, search);

export default rootRouter;
