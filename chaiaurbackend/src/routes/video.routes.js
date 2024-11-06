import { Router } from "express";
import { deleteVideo, getAllVideos, getAvideo, publishAVideo } from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.js";
import { verfiyJwt } from "../middlewares/auth.middleware.js";
import { router as commentRouter} from "./comment.routes.js";

const videoRouter=Router()

videoRouter.use(verfiyJwt)

videoRouter.route("/publishVideo").post(
     upload.fields([
        {
            name:"videoFile",
            maxCount:1,
        },
        {
            name:"thumbnail",
            maxCount:1,
        },
     ])
    ,publishAVideo)


    videoRouter.route("/all").get(getAllVideos)

    videoRouter.route("/getAvideo/:videoId").get(getAvideo)
    
    videoRouter.route("/:video_id").delete(deleteVideo)

    videoRouter.use("/:video_id/comments/",commentRouter)


    export {videoRouter}