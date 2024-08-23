// 4. 라우팅 관련 폴더임
// postController에서 만들어놓은 export 된 다양한 명령어들을 연결할 것임

import express from "express";
import * as postController from "../controllers/postController.js";

// Router(): express에서 지원해주는 내장 객체
const router = express.Router();

router.get("/list", postController.listPosts);

router.post("/add", postController.createPost);

router.delete("/delete/:id", postController.deletePost);

router.get("/detail/:id", postController.getPostDetails);

router.get("/edit/:id", postController.getEditPost);

router.put("/edit/:id", postController.updatePost);

export default router;
