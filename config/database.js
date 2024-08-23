// 1. config(db)폴더를 만들고 파일에
// mongo db와 연결된 모든 소스들을 가져오기

import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const MONGO_PASS = process.env.MONGO_PASS;
const uri = `mongodb+srv://hyj010410:${MONGO_PASS}@cluster0.crfs3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri);

// DB와 관련된 함수
async function connectDB() {
  try {
    await client.connect();
    // db = client.db("todo");
    console.log("DB 연결 성공");
    return client;
  } catch (err) {
    console.error("DB 연결 실패", err);
    process.exit(1); // 서버 종료
  }
}

export default connectDB;
