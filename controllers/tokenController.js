/* 토큰큰 관련 API 응답 반환 파일 */

const tokenModel = require("../model/tokenModel")
const socailService = require("../services/socialService")
const encryptUtil = require("../utils/encryptUtil")

/**
 * 
 * 토큰 생성
 */

// 토큰 생성
exports.postToken = async (req, res) => {
    const {userIdx, socialType, socialIdx, accessToken} = req.body;

    // 유저 고유 인덱스 누락 체크
    if(!userIdx){
        return res.status(400).json({
            status  : 400,
            message : "Invalid userIdx",
            data : null,
        })
    }


    // 인증 종류 누락 체크
    if(!socialType){
        return res.status(400).json({
            status  : 400,
            message : "Invalid SocialType",
            data : null,
        })
    }

    // 소셜 고유 인덱스 누락 체크
    if(!socialIdx){
        return res.status(400).json({
            status  : 400,
            message : "Invalid socialIdx",
            data : null,
        })
    }

    // 유저 accessToken 누락 체크
    if(!accessToken){
        return res.status(400).json({
            status  : 400,
            message : "Invalid accessToken",
            data : null,
        })
    }
    
    try{
        // 소셜 고유 인덱스와 accessToken을 가지고 소셜에 인증 확인
        if(!await socailService.getSocial(socialType, socialIdx, accessToken)){
                return res.status(401).json({
                    status  : 401,
                    message : "Unauthorized",
                    data : null,
                })
        }
         // 유저 토큰 생성
        const userToken = await encryptUtil.CreateEncryptWithSHA256(accessToken);

        const reqestData = {
            userIdx : userIdx,
            localToken : userToken,
        }

        const response = await tokenModel.postToken(reqestData)

        if(!response){
            return res.status(404).json({
                status  : 404,
                message : "Not found crops",
                data : null,
            })
        }

        console.log(`localToken : ${response}`)

        return res.status(200).json({
            status  : 200,
            message : "success made token",
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