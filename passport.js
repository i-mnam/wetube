import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy());
//Error: Unknown authentication strategy "local"

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//passport가 사용자 인증을 처리할 수 있도록 한 설정임.
