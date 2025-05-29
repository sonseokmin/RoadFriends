/* 농업 API 경로 정의 파일 */

const express = require("express");
const agricultureController = require("../controllers/agricultureController.js");

const router = express.Router();

// router.get("/argricultuer/ncpms", agricultureController.getPests ) // 병해충 정보 확인
router.get("/agricultuer/nongsaro/video", agricultureController.getAgricultuerVideo) // 농사로 비디오 정보 확인
router.get("/agricultuer/agrinet/news", agricultureController.getArgricultuerNews) // 한국농어민신문 뉴스 확인


module.exports = router;