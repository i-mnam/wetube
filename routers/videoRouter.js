import express from "express";
import routes from "../routes";
import { uploadVideo } from "../middlewares"

import { 
//    videos_name_test, upload
    getUpload,
    postUpload, 
    videoDetail, 
    editVideo, 
    deleteVideo 
} from "../controllers/videoController";


const videoRouter = express.Router();


//videoRouter.get(routes.home, videos_name_test); // delte) views/videos.pug :: home.pug 에서  videosList를 보여주고 있음.
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail); // !!! REGEX !!!! // return string 

videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;