/* 캘린더 API 경로 정의 파일 */

const express = require("express");
const calendarController = require("../controllers/calendarController.js");

const router = express.Router();

router.get("/calendars", calendarController.getCalendar) // 캘린더 확인
router.post("/calendars", calendarController.postCalendar) // 캘린더 생성
router.delete("/calendars", calendarController.deleteCalendar) // 캘린더 삭제

module.exports = router;