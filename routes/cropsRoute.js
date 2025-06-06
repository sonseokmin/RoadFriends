/* 작물 API 경로 정의 파일 */

const express = require("express");
const cropsController = require("../controllers/cropsController.js")

const router = express.Router();

router.get("/crops", cropsController.getCrops); // 작물 목록 확인
router.get("/crop/image", cropsController.getCropImage); // 작물 사진

module.exports = router;