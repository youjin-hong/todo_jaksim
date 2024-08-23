// 5. server.js에 있는 것을 옮길 겸 index.js를 만들어줌
// 배포를 위해 필요함

// server.js에서 require로 되어있는 부분은 import로 가져옴
import express from "express";
import path from "path";

import postRoutes from "./routes/postRoutes.js";
import connectDB from "./config/database.js";
import Post from "./models/post.js";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// process.env.PORT: 우리가 설정한 게 아니라, 배포하는 시점의 포트 번호임
const port = process.env.PORT || 3000;

// routes 부분에 불러와도 되고, 초기 부분인 여기 index.js에 써도 도 됌
app.get("/", function (req, res) {
  res.render("index");
});

app.use("/", postRoutes);

async function start() {
  const client = await connectDB();
  await Post.injectDB(client);

  if (process.env.VERCEL) {
    console.log("Vercel 환경에서는 서버를 시작하지 않습니다.");
  } else {
    // port 번호도 직접 적는 것보다 변수로 하나 뺴놓는 게 좋음
    app.listen(port, () => {
      console.log("서버 실행중...");
    });
  }

  process.on("SIGINT", async () => {
    try {
      await client.close();
      console.log("정상 DB 연결 종료");
      process.exit(0);
    } catch (err) {
      console.error("오류에 의한 DB 연결 종료", err);
      process.exit(1);
    }
  });
}
start();

export default app;
// 이제 nodemon index.js로 실행하면 됨
// server.js는 이제 삭제해도 무방 이제 그냥 백업본이라고 생각하기
