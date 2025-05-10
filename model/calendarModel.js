/* 캘린더 관련 API 요청 처리 파일  */

const dbConnect = require("../database/index.js");

exports.calendarCheck = async (req) => {
    const requestData = [req.userIdx, req.socialIdx];

    const sql = `
    SELECT 
        crops.name, 
        calendar.workDate, 
        wc.taskName
    FROM calendar
    JOIN crops ON calendar.cropIdx = crops.idx
    JOIN workStandardCodes wc ON calendar.workCode = wc.workCode
    JOIN users u ON calendar.userIdx = u.idx
    WHERE u.idx = ? AND u.socialIdx = ?;

    `

    const [result] = await dbConnect.query(sql, requestData);

        if(!result){
            return null
        }

        return result;

}

exports.calenderCreate = async (req) => {
    const requestData = [req.userIdx, req.cropIdx, req.schedule, req.location, req.locationX, req.locationY];

    console.log(requestData)
        // schedule 배열 추출
    const scheduleArray = requestData[2]; // schedule = [{ workCode, workDate }, {...}, ...]

    const values = [];
    const placeholders = [];

    for (const sch of scheduleArray) {
    placeholders.push('(?, ?, ?, ?, ?, ?, ?)');
    values.push(
        requestData[0], // userIdx
        requestData[1], // cropIdx
        sch.workCode,
        `${sch.workDate.year}-${sch.workDate.month}-${sch.workDate.day}`,
        requestData[3], // location
        requestData[4], // locationX
        requestData[5]  // locationY
    );
    }

    const sql = `
    INSERT INTO calendar (userIdx, cropIdx, workCode, workDate, location, locationX, locationY)
    VALUES ${placeholders.join(',')};
    `;

    const [result] = await dbConnect.query(sql, values);

    
    if(result.affectedRows === 0){
        return null
    }

    return req.userIdx;

}