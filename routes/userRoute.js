/* 유저 API 경로 정의 파일 */

const express = require("express");
const userController = require("../controllers/userController.js");

const router = express.Router();

router.get("/users/user", userController.userCheck) // 유저 확인
router.post("/users/user", userController.userSignup) // 유저 추가

module.exports = router;