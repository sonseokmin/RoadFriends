/* 토큰 API 경로 정의 파일 */

const express = require("express")
const tokenController = require("../controllers/tokenController.js");
const limiter = require('../middlewares/limiter');

const router = express.Router();

router.post("/token", limiter, tokenController.tokenCreate) // 토큰 생성

module.exports = router;