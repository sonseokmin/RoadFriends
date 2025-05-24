/* 유저 API 경로 정의 파일 */

const express = require("express");
const userController = require("../controllers/userController.js");
const limiter = require('../middlewares/limiter');

const router = express.Router();

router.get("/users", limiter, userController.userCheck) // 유저 확인
router.post("/users", limiter, userController.userCreate) // 유저 생성

module.exports = router;