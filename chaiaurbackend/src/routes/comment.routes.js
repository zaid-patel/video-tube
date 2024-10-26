import { Router } from "express";
// import { verify } from "jsonwebtoken";
import { addComment, deleteComment, getVideoComments, updateComment } from "../controllers/comment.controller.js"
import { verfiyJwt } from "../middlewares/auth.middleware.js";



const router = Router();

router.use(verfiyJwt); //

router.route("/add").post(addComment)

router.route("/all").get(getVideoComments)

router.route("/edit/:id").patch(updateComment)

router.route("/delete/:id").delete(deleteComment)


export {
    router,
}