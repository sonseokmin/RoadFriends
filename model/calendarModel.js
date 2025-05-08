/* 캘린더 관련 API 요청 처리 파일  */

const dbConnect = require("../database/index.js");

exports.calendarCheck = async (req) => {
    const requestData = [req.userIdx, req.socialIdx];

    const sql = `
    SELECT 
        crops.name, 
        calendar.day, 
        wc.taskName
    FROM calendar
    JOIN crops ON calendar.cropIdx = crops.idx
    JOIN workStandardCodes wc ON calendar.workCode = wc.workCode
    JOIN users u ON ? = u.idx
    WHERE u.socialIdx = ?;
    `

    const [result] = await dbConnect.query(sql, requestData);

        if(!result){
            return null
        }

        return result;

}