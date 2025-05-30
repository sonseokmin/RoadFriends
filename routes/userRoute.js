/* 유저 API 경로 정의 파일 */

const express = require("express");
const userController = require("../controllers/userController.js");
// const limiter = require('../middlewares/limiter');

const router = express.Router();

router.get("/users", userController.getUser) // 유저 확인
router.post("/users", userController.postUser) // 유저 생성

module.exports = router;