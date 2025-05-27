/* 캘린더 API 경로 정의 파일 */

const express = require("express");
const calendarController = require("../controllers/calendarController.js");

const router = express.Router();

router.get("/calendars", calendarController.calendarCheck) // 캘린더 확인
router.post("/calendars", calendarController.calendarCreate) // 캘린더 생성
router.delete("/calendars", calendarController.calendarDelete) // 캘린더 삭제

module.exports = router;