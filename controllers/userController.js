/* 유저 관련 API 응답 반환 파일 */

const userModel = require("../model/userModel")

/** 
 * 유저 확인
 * 회원가입
*/

// 유저 확인
exports.userCheck = async (req, res) => {
    const email = req.query.email;
    const socialType = req.query.socialType;
    const socialIdx = req.query.socialIdx;

    console.log(email, socialType, socialIdx)

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

    const reqestData = {
        email : email,
        socialType : socialType,
        socialIdx : socialIdx
    }

    try{
        const response = await userModel.userCheck(reqestData)

        console.log(response)

        // 없는 유저일 경우
        if(response.length === 0){
            return res.status(200).json({
                status  : 200,
                message : "No exist user",
                data : null,
            })
        }

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

exports.userCreate = async (req, res) => {
    const {email, name, socialType, socialIdx} = req.body;

    console.log(email, name, socialType, socialIdx)


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

    // DB 요청 데이터
    const requestData = {
        email : email,
        name : name,
        socialType : socialType,
        socialIdx : socialIdx
    }

    try{

        const response = await userModel.userCreate(requestData)

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
                idx : response
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