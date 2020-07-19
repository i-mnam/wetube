import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";
import { githubLoginCallback } from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());
//Error: Unknown authentication strategy "local"

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            callbackURL: `http://localhost:4000${routes.githubCallback}`,
        },
        githubLoginCallback
    )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//passport가 사용자 인증을 처리할 수 있도록 한 설정임.
