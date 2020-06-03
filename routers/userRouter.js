import express from "express";
import routes from "../routes";


const userRouter = express.Router();

userRouter.get(routes.users, (req, res) => res.send("User Home"));
userRouter.get(routes.userDetail, (req, res) => res.send("User Detail"));
userRouter.get(routes.editProfile, (req, res) => res.send("Edit Pfofile"));
userRouter.get(routes.changePassword, (req, res) => res.send("Change Password"));


export default userRouter;