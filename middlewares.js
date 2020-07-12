import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
    // 복습) use export : 그래야 다른 곳에서 사용이 가능하니까
    res.locals.siteName = "Wetube";
    res.locals.routes = routes;

    // temp!
    res.locals.user = {
        isAuthenticated: false,
        id: 1,
    };
    next(); // 주의) middleware는 next()를 호출해야 req를 전달 할 수 있음
};
export const uploadVideo = multerVideo.single("videoFile");