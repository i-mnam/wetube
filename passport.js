import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import User from "./models/User";
import { githubLoginCallback, facebookLoginCallback } from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());
//Error: Unknown authentication strategy "local"

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            callbackURL: `http://localhost:4000${routes.githubCallback}`,
            passReqToCallback: true,
            scope: ["user:email"],
            //profileFields: ["id", "avatar_url", "name", "email", "login"],
        },
        githubLoginCallback
    )
);

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
//passport가 사용자 인증을 처리할 수 있도록 한 설정임.

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
// @cookies only connect.sid

// it would depend on how you implement serialization. Sometimes you serialize by user id, which means that the serializeUser function stores just the user id in the session, and deserializeUser uses that id to retrieve the user data from a database (for instance). This is to prevent the session storage from containing the actual user data itself. @https://stackoverflow.com/questions/19948816/passport-js-error-failed-to-serialize-user-into-session

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: `http://localhost:4000${routes.facebookCallback}`,
            passReqToCallback: true,
            profileFields: ["id", "displayName", "photos", "email"],
        },
        facebookLoginCallback
    )
);
