import express from "express";
import { getLogin, postLogin, getJoin, postJoin } from "../controllers/userController";
import { search, home } from "../controllers/videoController";
import { publicOnlyMiddleware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get(`/`, home);
rootRouter.route(`/login`).all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.route(`/join`).all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.get(`/search`, search);

export default rootRouter;
