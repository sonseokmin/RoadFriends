/* 작물 관련 API 응답 반환 파일 */

const cropsModel = require("../model/cropsModel.js")
const tokenModel = require("../model/tokenModel.js")
const fs = require('fs');
const path = require('path')

/**
 * 작물 목록 확인
 * 작물 이미지 확인
 */


// 작물 목록 확인
exports.getCrops = async (req, res) => {
    const userIdx = req.query.userIdx;
    const localToken = req.query.localToken;

    console.log(`requestData = { idx : ${userIdx},  localToken : ${localToken} }`)


     // 유저 고유 인덱스 누락 체크
    if(!userIdx){
        return res.status(400).json({
            status  : 400,
            message : "Invalid userIdx",
            data : null,
        })
    }

    // 로컬 토큰 누락 체크
    if(!localToken){
        return res.status(400).json({
            status  : 400,
            message : "Invalid localToken",
            data : null,
        })
    }

    const tokenRequestData = {
        userIdx : userIdx,
        localToken : localToken
    }

    try{

        // 토큰 정보가 일치하지 않을 경우
        if(!await tokenModel.getTokenIsMatch(tokenRequestData)){
            return res.status(401).json({
                status  : 401,
                message : "Unauthorized",
                data : null,
            })
        }

        const response = await cropsModel.getCrops();

        console.log(` responseData = { ${JSON.stringify(response)} }`)

        

        return res.status(200).json({
            status  : 200,
            message : "success return to crops list",
            data : response,
        })

    }
    catch(err){
        console.log(err)

        return res.status(500).json({
            status  : 500,
            message : "server error",
        })
    }

}

// 작물 이미지 확인
exports.getCropImage = async (req, res) => {
    const userIdx = req.query.userIdx;
    const localToken = req.query.localToken;
    const cropName = req.query.cropName;
    const filePath = path.join(__dirname, '../images/crops', `${cropName}.png`);


    console.log(`requestData = { idx : ${userIdx},  localToken : ${localToken}, cropName = ${cropName} }`)


     // 유저 고유 인덱스 누락 체크
    if(!userIdx){
        return res.status(400).json({
            status  : 400,
            message : "Invalid userIdx",
            data : null,
        })
    }

    // 로컬 토큰 누락 체크
    if(!localToken){
        return res.status(400).json({
            status  : 400,
            message : "Invalid localToken",
            data : null,
        })
    }

    // 로컬 토큰 누락 체크
    if(!cropName){
        return res.status(400).json({
            status  : 400,
            message : "Invalid cropName",
            data : null,
        })
    }

    if (!fs.existsSync(filePath)) {
    return res.status(404).json({
        status : 404,
        message: 'Not found Image', 
        data : null
        });
    }

    const tokenRequestData = {
        userIdx : userIdx,
        localToken : localToken
    }


    try{

        // 토큰 정보가 일치하지 않을 경우
        if(!await tokenModel.getTokenIsMatch(tokenRequestData)){
            return res.status(401).json({
                status  : 401,
                message : "Unauthorized",
                data : null,
            })
        }

        console.log(`requestData = ${cropName}`)

        return res.status(200).json({
            status  : 200,
            message : "success return to cropImage",
            data : {
                url : `/images/crops/${cropName}.png`
            },
        })
    
    }    
    catch(err){
        console.log(err)

        return res.status(500).json({
            status  : 500,
            message : "server error",
        })
    }
}
