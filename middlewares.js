import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
    // 복습) use export : 그래야 다른 곳에서 사용이 가능하니까
    res.locals.siteName =  "Wetube";
    res.locals.routes = routes;
    next(); 
    // 주의) middleware는 next()를 호출해야 req를 전달 할 수 있음
}