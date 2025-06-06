/* 캘린더 관련 API 응답 반환 파일 */

const calendarModel = require("../model/calendarModel.js")
const tokenModel = require("../model/tokenModel.js")
const AIService = require("../services/AIService.js")

/**
 * 캘린더 확인
 * 캘린더 생성
 * 캘리더 삭제
 * 
 */

exports.getCalendar = async (req, res) => {
    const userIdx = req.query.userIdx
    const localToken = req.query.localToken;


    console.log(`requestData = { idx : ${userIdx},  localToken : ${localToken}}`)

    // 유저 인덱스 누락 체크
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
    
    const requestData = {
        userIdx : userIdx,
        localToken : localToken
    }

    try{

        // 토큰 정보가 일치하지 않을 경우
        if(!await tokenModel.getTokenIsMatch(requestData)){
            return res.status(401).json({
                status  : 401,
                message : "Unauthorized",
                data : null,
                })
        }

        const response = await calendarModel.getCalendar(requestData);

          // 생성된 재배력이 없을 경우
          if(response.length === 0){
            return res.status(404).json({
                status  : 404,
                message : "Not found calendar",
                data : null,
            })
        }

        console.log(` responseData = { ${JSON.stringify(response)} }`)

        return res.status(200).json({
            status  : 200,
            message : "exist calendar",
            data : response,
        })

    }
    catch(err){
        console.log(err)
    }


}

exports.postCalendar = async (req, res) => {
    const {userIdx, cropIdx, startAt, location, locationX, locationY, localToken } = req.body;

    console.log(
        ` requestData = { userIdx : ${userIdx}, cropIdx : ${cropIdx}, startAt : ${startAt}, location : ${location}, locationX : ${locationX}, locationY : ${locationY}, localToken : ${localToken} }`
    )

     // 유저 인덱스 누락 체크
     if(!userIdx){
        return res.status(400).json({
            status  : 400,
            message : "Invalid userIdx",
            data : null,
        })
    }

    // 작물 인덱스 누락 체크
    if(!cropIdx){
        return res.status(400).json({
            status  : 400,
            message : "Invalid cropIdx",
            data : null,
        })
    }

    // 시작 일자 누락 체크
    if(!startAt){
        return res.status(400).json({
            status  : 400,
            message : "Invalid startAt",
            data : null,
        })
    }

    // 자연어 지역 누락 체크
    if(!location){
        return res.status(400).json({
            status  : 400,
            message : "Invalid location",
            data : null,
        })
    }

    // 지역 X 좌표 누락 체크
    if(!locationX){
        return res.status(400).json({
            status  : 400,
            message : "Invalid locationX",
            data : null,
        })
    }

    // 지역 Y 좌표 누락 체크
    if(!locationY){
        return res.status(400).json({
            status  : 400,
            message : "Invalid locationY",
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

        // 년-월-일 형식의 날짜 데이터를 유닉스 타임으로 변환
        unixTime = new Date(startAt)

        // 요청할 파라미터
        const params = {
            cropIdx, cropIdx,
            startAt: unixTime.getTime(), // 시작 일자
            location: location, // 자연어 주소
            locationX: locationX, // x좌표
            locationY: locationY, // y좌표
        };

        const responseAI = await AIService.createCalendar(params)
    
        console.log(`AI_responseData = { ${responseAI} }`)

        console.log(responseAI.schedules)
        
        const schedules = responseAI.schedules;


        // 재배력을 생성하지 못했을 경우
         if(schedules.length === 0 ){
            return res.status(200).json({
                status  : 200,
                message : "Failed to create the calendar on the AI server",
                data : null,
            })
         }

        const requestData = {
            userIdx : userIdx,
            cropIdx : cropIdx,
            schedule : schedules,
            location : location,
            locationX : locationX,
            locationY : locationY
         }

        const response = await calendarModel.postCalendar(requestData);

        console.log(` responseData = { ${response} }`)


        // DB에 저장되지 않았을 경우 
        if(!response){
            return res.status(200).json({
                status  : 200,
                message : "Cant save calendar",
                data : null,
            })
        }

        return res.status(201).json({
            status  : 201,
            message : "Success made calendar",
            data : {
                groupId : response
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

// 캘린더 삭제제
exports.deleteCalendar = async (req, res) => {
    const userIdx = req.query.userIdx
    const localToken = req.query.localToken;
    const groupId = req.query.groupId;

    console.log(`requestData = { idx : ${userIdx},  localToken : ${localToken}}, groupId : ${groupId}`)

    // 유저 인덱스 누락 체크
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
    
     // 그룹 아이디 누락 체크
    if(!groupId){
        return res.status(400).json({
            status  : 400,
            message : "Invalid groupId",
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

        const requestData = {
            groupId : groupId
        }

        const response = await calendarModel.deleteCalendar(requestData);

          // 없는 캘린더일 경우
          if(!response){
            return res.status(404).json({
                status  : 404,
                message : "Not found calendar",
                data : null,
            })
        }

        console.log(` responseData = { ${JSON.stringify(response)} }`)

        return res.status(200).json({
            status  : 200,
            message : "success delete calendar",
            data : {
                groupId : response
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