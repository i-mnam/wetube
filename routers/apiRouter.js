import express from "express";
import routes from "../routes";
import {
    postRegisterView,
    postAddComment,
    deleteComment,
} from "../controllers/videoController";

const apiRouter = express.Router();

// apiRouter.get(routes.registerView, postRegisterView);
apiRouter.post(routes.registerView, postRegisterView);

apiRouter.post(routes.addComment, postAddComment);

apiRouter.delete(routes.deleteComment, deleteComment);

export default apiRouter;