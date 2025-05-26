/* 유저 관련 API 응답 반환 파일 */

const userModel = require("../model/userModel")
const socialService = require("../services/socialService")

/** 
 * 유저 확인
 * 회원가입
*/

// 유저 확인
exports.userCheck = async (req, res) => {
    const email = req.query.email;
    const socialType = req.query.socialType;
    const socialIdx = req.query.socialIdx;
    const accessToken = req.query.accessToken;

    console.log(`requestData = { email : ${email}, socialType : ${socialType}, socialIdx : ${socialIdx}, accessToken : ${accessToken}}`)

    // 이메일 누락 체크
    if(!email){
        return res.status(400).json({
            status  : 400,
            message : "Invalid Email",
            data : null,
        })
    }

    // 인증 종류 누락 체크
    if(!socialType){
        return res.status(400).json({
            status  : 400,
            message : "Invalid socailType",
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


    const reqestData = {
        email : email,
        socialType : socialType,
        socialIdx : socialIdx
    }

    try{
        // 소셜 고유 인덱스와 accessToken을 가지고 소셜에 인증 확인
        if(!await socialService.socialCheck(socialType, socialIdx, accessToken)){
                return res.status(401).json({
                    status  : 401,
                    message : "Unauthorized",
                    data : null,
                })
        }

        const response = await userModel.userCheck(reqestData)

        console.log(` responseData = { ${response.idx} }`)

        // 없는 유저일 경우
        if(response.length === 0){
            return res.status(200).json({
                status  : 200,
                message : "No exist user",
                data : null,
            })
        }

        // 있는 유저인 경우
        return res.status(200).json({
            status  : 200,
            message : "exist user",
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

// 회원가입
exports.userCreate = async (req, res) => {
    const {email, name, socialType, socialIdx, accessToken} = req.body;

    console.log(`requestData = { email : ${email}, name : ${name}, socialType : ${socialType}, socialIdx : ${socialIdx}, accessToken : ${accessToken}}`)


    // 이메일 누락 체크
    if(!email){
        return res.status(400).json({
            status  : 400,
            message : "Invalid Email",
            data : null,
        })
    }

    // 이름 누락 체크
    if(!name){
        return res.status(400).json({
            status  : 400,
            message : "Invalid Name",
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

    // DB 요청 데이터
    const requestData = {
        email : email,
        name : name,
        socialType : socialType,
        socialIdx : socialIdx
    }

    try{

         // 소셜 고유 인덱스와 accessToken을 가지고 소셜에 인증 확인
        if(!await socialService.socialCheck(socialType, socialIdx, accessToken)){
                return res.status(401).json({
                    status  : 401,
                    message : "Unauthorized",
                    data : null,
                })
        }

        const response = await userModel.userCreate(requestData)

        console.log(` responseData = { ${response.idx} }`)

        if(response.length === 0){
            return res.status(200).json({
                status  : 200,
                message : "Cant made user",
                data : null,
            })
        }

        return res.status(201).json({
            status  : 201,
            message : "success made user",
            data : {
                userIdx : response
            },
        })    
    }
    catch(err){
        console.log(err)

        // socialType과 socialIdx가 충돌이 발생할 경우
        if(err.sqlState === "23000"){
            return res.status(409).json({
                status  : 409,
                message : "Conflict error",
            })
        }

        return res.status(500).json({
            status  : 500,
            message : "server error",
        })
    }

}

