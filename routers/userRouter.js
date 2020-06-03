import express from "express";
import routes from "../routes";
import { 
    users, 
    userDetail, 
    editProfile, 
    changePassword 
} from "../controllers/userController";


const userRouter = express.Router();

console.log(users);
userRouter.get(routes.home, users);  //// HERE!!!!!!

userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);

userRouter.get(routes.userDetail, userDetail); ///!!! REGEX !!!!


export default userRouter;