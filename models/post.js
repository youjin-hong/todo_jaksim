// 3. 모델 폴더 만들기 (db 연결하는 부분)
// 여기는 mongo db와 관련된 연산들을 떼다가 만들 것임
// class 문법으로 나엻해놓는게 좋음 (왜?)
// 외부에서 Post.getAll으로 쓸 수 있기 때문이라 하심

let db;

class Post {
  static async injectDB(conn) {
    if(db) {
      return;
    }
    try {
      db = conn.db("todo");
      await client.connect();
    } catch (e) {
      console.error("DB 연결 실패..!", e);
    }
  }

  static async getAll() {
    return await db
      .collection("posts")
      .find()
      .sort({ _id: -1 })
      // .limit(3) // 필요시 주석 해제
      .toArray();
  }
  static async create(postData) {
    return await db.collection("posts").insertOne(postData);
  }

  static async delete(postId) {
    return await db.collection("posts").deleteOne({ _id: postId });
  }

  static async getOne(postId) {
    return await db.collection("posts").findOne({ _id: postId });
  }

  static async update(postId, postData) {
    return await db
      .collection("posts")
      .updateOne({ _id: postId }, { $set: postData });
  }
}

export default Post;
