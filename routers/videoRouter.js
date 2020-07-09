import express from "express";
import routes from "../routes";
import { uploadVideo } from "../middlewares"

import { 
//    videos_name_test, upload
    getUpload,
    postUpload, 
    videoDetail, 
    getEditVideo,
    postEditVideo, 
    getDeleteVideo 
} from "../controllers/videoController";


const videoRouter = express.Router();


//videoRouter.get(routes.home, videos_name_test); // delte) views/videos.pug :: home.pug 에서  videosList를 보여주고 있음.
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

videoRouter.get(routes.videoDetail(), videoDetail); // !!! REGEX !!!! // return string // 그냥 조회만 하니까 GET만 있다?

//videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

videoRouter.get(routes.deleteVideo(), getDeleteVideo); // 현재 구조로는 post로 할 수가 없음 

export default videoRouter;