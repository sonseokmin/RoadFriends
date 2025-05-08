/* 캘린더 관련 API 응답 반환 파일 */

const calendarModel = require("../model/calendarModel.js")

/**
 * 캘린더 확인
 * 캘린더 생성
 */

exports.calendarCheck = async (req, res) => {
    const userIdx = req.query.userIdx
    const socialIdx = req.query.socialIdx

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

        console.log(response)


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