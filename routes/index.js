/* 통합 API 경로 정의 파일 */ 

const express = require("express");
const userRoute = require("./userRoute.js");
const cropsRoute = require("./cropsRoute.js");
const calendarRoute = require("./calendarRoute.js")
const tokenRoute = require("./tokenRoute.js")

const router = express.Router();

router.use(userRoute); // user 경로
router.use(cropsRoute); // crops 경로
router.use(calendarRoute); // calender 경로
router.use(tokenRoute); // token 경로

module.exports = router;