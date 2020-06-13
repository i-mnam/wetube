import express from "express";
import routes from "../routes";
import { 
    home, 
    search } from "../controllers/videoController";
import { 
    // join, 
    getJoin, 
    postJoin,
    login, 
    logout } from "../controllers/userController";


const globalRouter = express.Router();

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
//globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);


export default globalRouter;