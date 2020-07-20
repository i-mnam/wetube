import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
    // join, login,
    getJoin,
    postJoin,
    getLogin,
    postLogin,
    logout,
    githubLogin,
    githubLoginCallbackTest,
    postGithubLogin,
    getMe,
} from "../controllers/userController";

// import passport from "passport";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);
// globalRouter.post(
//     routes.login,
//     function (req, res, next) {
//         // call passport authentication passing the "local" strategy name and a callback function
//         passport.authenticate("local", function (error, user, info) {
//             // this will execute in any case, even if a passport strategy will find an error
//             // log everything to console
//             console.log(error);
//             console.log(user);
//             console.log(info);

//             if (error) {
//                 res.status(401).send(error);
//             } else if (!user) {
//                 res.status(401).send(info);
//             } else {
//                 next();
//             }

//             res.status(401).send(info);
//         })(req, res);
//     },

//     // function to call once successfully authenticated
//     function (req, res) {
//         res.status(200).send('logged in!');
//     }
// );

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
//globalRouter.get(routes.join, join);
//globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
    routes.githubCallback,
    githubLoginCallbackTest,
    postGithubLogin
);
globalRouter.get(routes.me, getMe);
export default globalRouter;
