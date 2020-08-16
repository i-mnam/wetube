import multer from "multer";
import routes from "./routes";
import User from "./models/User";

const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatars/" });

export const localsMiddleware = async (req, res, next) => {
    // 복습) use export : 그래야 다른 곳에서 사용이 가능하니까
    res.locals.siteName = "Wetube";
    res.locals.routes = routes;

    // temp!
    // res.locals.user = {
    //     isAuthenticated: false,
    //     id: 1,
    // };
    let user = null;
    if (req.user) {
        user = await (await User.findById({ _id: req.user._id })).toObject();
    } else {
        user = null;
    }
    // res.locals.loggedUser = req.user || null; // 대박.!!!!!!!!!!!!!!!!!!!!!


    if (user) {
        if (typeof (user._id) === "object") {
            console.log("[middlewares][result DB]: " + user._id + "//" + typeof (user._id));
            user._id = user._id.toString();
            console.log("[middlewares][result DB][change]: " + typeof (user._id));
        }
    }
    res.locals.loggedUser = user;
    // console.log("[middlewares] req.user: " + (
    //     (req.user) ? JSON.stringify(req.user) : req.user
    // ));

    if (user) {
        console.log("req id:" + req.user._id + "//logged user id:" + res.locals.loggedUser._id);
        console.log((req.user._id === res.locals.loggedUser._id));
        console.log("typeof (req.user._id)" + typeof (req.user._id) + "//" + typeof (res.locals.loggedUser._id));
    }

    console.log("[middlewares]??? res.locals.loggedUser: "
        + ((res.locals.loggedUser) ? res.locals.loggedUser.name
            : res.locals.loggedUser));
    // console.log("[middlewares] res.locals.loggedUser: " + (
    //     (res.locals.loggedUser) ? JSON.stringify(res.locals.loggedUser) : res.locals.loggedUser
    // ));
    // console.log("[middlewares] req.user._id typeof: " + ((req.user) ? typeof (req.user._id) : "couldn't know "));
    //+ "//// loggedUser.id:" + res.locals.loggedUser._id
    next(); // 주의) middleware는 next()를 호출해야 req를 전달 할 수 있음
};

export const onlyPrivate = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect(routes.login);
    }
};

export const onlyPublic = (req, res, next) => {
    if (req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
};
export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");