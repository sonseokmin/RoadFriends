/* 통합 API 경로 정의 파일 */ 

const express = require("express");
const userRoute = require("./userRoute.js");

const router = express.Router();

router.use(userRoute); // user 경로

module.exports = router;