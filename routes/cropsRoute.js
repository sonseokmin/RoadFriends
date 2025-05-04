/* 작물 API 경로 정의 파일 */

const express = require("express");
const cropsController = require("../controllers/cropsController.js")

const router = express.Router();

router.get("/crops", cropsController.cropsCheck);

module.exports = router;