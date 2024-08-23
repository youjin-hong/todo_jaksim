// 2. controller 파일 만들고 post와 관련된 collection이 생길 때마다
// 여기에 만들어주기
// 선언형으로 만들어줘야 함

import Post from "../models/post.js";
import { ObjectId } from "mongodb";

export const listPosts = async (req, res) => {
  try {
    const posts = await Post.getAll();

    res.render("list", { posts });
  } catch (err) {
    console.error(err);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
};

// server.js의 내용을 옮긴다기 보다, 위의 listPosts를 이용하는 것이 좋음
export const createPost = async (req, res) => {
  try {
    await await Post.create(req.body);
    res.redirect("list");
  } catch (err) {
    console.error(err);
    res.status(500).send("서버 오류가 발생했습니다.");
  }
};
// TODO: Post.create() -> 완료

export const deletePost = async (req, res) => {
  async (req, res) => {
    // console.log(req.params.id);

    const _id = new ObjectId(req.params.id);
    try {
      const result = await Post.delete(_id);

      if (result.deletedCount === 0) {
        res.status(404).json({
          message: "삭제할 데이터가 없습니다.",
          success: false,
        });
      } else {
        res.json({ message: "성공적으로 삭제되었습니다.", success: true });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "서버 에러" });
    }
  };
};
// TODO: Post.delete()

export const getPostDetails = async (req, res) => {
  async (req, res) => {
    const _id = new ObjectId(req.params.id);
    try {
      const post = await Post.getOne(_id);
      if (!post) {
        return res.status(404).send("게시물을 찾을 수 없습니다.");
      }
      res.render("detail", { post });
    } catch (err) {
      console.error(err);
      res.status(500).send("서버 오류가 발생했습니다.");
    }
  };
};
// TODO: Post.getOne()

export const getEditPost = async (req, res) => {
  async (req, res) => {
    const _id = new ObjectId(req.params.id);
    try {
      const post = await Post.getOne(_id);
      if (!post) {
        return res.status(404).send("게시물을 찾을 수 없습니다.");
      }
      res.render("edit", { post });
    } catch (err) {
      console.error(err);
      res.status(500).send("서버 오류가 발생했습니다.");
    }
  };
};
// TODO: Post.getOne();

export const updatePost = async (req, res) => {
  async (req, res) => {
    const _id = new ObjectId(req.params.id);
    // const { title, dateOfGoals, dateOfCreate, todoDetail } = req.body;

    try {
      const result = await Post.update(_id, req.body);

      if (result.modifiedCount === 1) {
        // 수정 성공 시 JSON 응답으로 리다이렉트 정보 전달
        res.json({
          success: true,
          message: "수정 완료",
          redirectUrl: `/detail/${_id.toString()}`,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "게시물을 찾을 수 없습니다.",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "서버 오류" });
    }
  };
};
// TODO: Post.update()
