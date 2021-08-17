import express from "express";
import {
  logout,
  startGithubLogin,
  finishGithubLogin,
  getEdit,
  postEdit,
  getChangePassword,
  postChangePassword,
  getResign,
  postResign,
} from "../controllers/userController";
import { protectMiddleware, publicOnlyMiddleware, avatarUpload } from "../middlewares";

const userRouter = express.Router();

userRouter.get(`/logout`, protectMiddleware, logout);
userRouter
  .route(`/edit`)
  .all(protectMiddleware)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
userRouter
  .route(`/change-password`)
  .all(protectMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get(`/github/start`, publicOnlyMiddleware, startGithubLogin);
userRouter.get(`/github/finish`, publicOnlyMiddleware, finishGithubLogin);
userRouter.route("/resign").get(getResign).post(postResign);
// userRouter.get(`/:id`, see);

export default userRouter;
