/* 캘린더 관련 API 응답 반환 파일 */

const calendarModel = require("../model/calendarModel.js")

/**
 * 캘린더 확인
 * 캘린더 생성
 */

exports.calendarCheck = async (req, res) => {
    const userIdx = req.query.userIdx
    const socialIdx = req.query.socialIdx

    console.log(`requestData = { idx : ${userIdx},  socialIdx : ${socialIdx} }`)

    // 유저 인덱스 누락 체크
    if(!userIdx){
        return res.status(400).json({
            status  : 400,
            message : "Invalid userIdx",
            data : null,
        })
    }

    // 소셜 인덱스 누락 체크
    if(!socialIdx){
        return res.status(400).json({
            status  : 400,
            message : "Invalid socialIdx",
            data : null,
        })
    }

    const requestData = {
        userIdx : userIdx,
        socialIdx: socialIdx,
    }

    try{
        const response = await calendarModel.calendarCheck(requestData);

        console.log(` responseData = { ${response} }`)

          // 생성된 재배력이 없을 경우
          if(response.length === 0){
            return res.status(200).json({
                status  : 200,
                message : "No exist calendar",
                data : null,
            })
        }

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

exports.calendarCreate = async (req, res) => {
    const {userIdx, socialIdx, cropIdx, startAt, location, locationX, locationY } = req.body;

    console.log(
        ` requestData = { userIdx : ${userIdx}, socialIdx : ${socialIdx}, cropIdx : ${cropIdx}, startAt : ${startAt}, location : ${location}, locationX : ${locationX}, locationY : ${locationY} }`
    )

     // 유저 인덱스 누락 체크
     if(!userIdx){
        return res.status(400).json({
            status  : 400,
            message : "Invalid userIdx",
            data : null,
        })
    }

    // 소셜 인덱스 누락 체크
    if(!socialIdx){
        return res.status(400).json({
            status  : 400,
            message : "Invalid socialIdx",
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

   
    try{

        // 년-월-일 형식의 날짜 데이터를 유닉스 타임으로 변환
        unixTime = new Date(startAt)

        // 요청할 파라미터
        const params = {
            cropIdx, cropIdx,
            startAt: unixTime.getTime(), // 시작 일자
            n_samples : 1000,
            location: location, // 자연어 주소
            locationX: locationX, // x좌표
            locationY: locationY, // y좌표
          };

        // params 객체를 요청할 수 있는 파라미터 형태로 변환
        let requestData = new URLSearchParams(params).toString();
      
        // AI 서버로 요청
        const responseAI = await fetch(`http://61.245.248.218:${process.env.AI_PORT}/farm/schedule?${requestData}`, {
           method: 'GET',
           credentials: 'include',
         })

        
        let response = await responseAI.json()

        console.log(`AI_responseData = { ${response} }`)
        
        const schedules = response.schedules;


        // 재배력을 생성하지 못했을 경우
         if(schedules.length === 0 ){
            return res.status(200).json({
                status  : 200,
                message : "Failed to create the calendar on the AI server",
                data : null,
            })
         }

        requestData = {
            userIdx : userIdx,
            cropIdx : cropIdx,
            schedule : schedules,
            location : location,
            locationX : locationX,
            locationY : locationY
         }

        response = await calendarModel.calenderCreate(requestData);

        console.log(` responseData = { ${response} }`)


        // DB에 저장되지 않았을 경우 
        if(!response){
            return res.status(200).json({
                status  : 200,
                message : "Cant save Calendar",
                data : null,
            })
        }

        return res.status(200).json({
            status  : 201,
            message : "Success made calendar",
            data : {
                userIdx : response
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