import express from "express";
import routes from "../routes";
import {
    //    users,
    userDetail,
    getEditProfile,
    postEditProfile,
    changePassword,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

// userRouter.get(routes.home, users);  //// HERE!!!!!!  //delete
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail); // routes.userDetail() 함수로 호출??
//userRouter.get(routes.userDetail, userDetail);
//// HERE!!!!!!
// 실질적으로 라우팅이 일어나는 곳..? req.url이 매칭되어 func를 실행시키는 곳.

export default userRouter;
