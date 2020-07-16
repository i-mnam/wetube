import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
    // 복습) use export : 그래야 다른 곳에서 사용이 가능하니까
    res.locals.siteName = "Wetube";
    res.locals.routes = routes;

    // temp!
    // res.locals.user = {
    //     isAuthenticated: false,
    //     id: 1,
    // };
    console.log("[middlewares] req.user: " + req.user);
    res.locals.user = req.user || null; // 대박.!!!!!!!!!!!!!!!!!!!!!
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
