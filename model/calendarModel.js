/* 캘린더 관련 API 요청 처리 파일  */

const dbConnect = require("../database/index.js");

exports.calendarCheck = async (req) => {
    const requestData = [req.userIdx, req.localToken];

    const sql = `
    SELECT 
        crops.name AS cropName, 
        DATE_FORMAT(calendar.workDate, '%Y-%m-%d') AS workDate, 
        ct.taskName AS taskName
    FROM calendar
    JOIN crops ON calendar.cropIdx = crops.idx
    JOIN cropTasks ct ON calendar.workCode = ct.idx
    JOIN users u ON calendar.userIdx = u.idx
    WHERE u.idx = ? AND u.token = ?;
    `

    const [result] = await dbConnect.query(sql, requestData);

        if(!result){
            return null
        }

        return result;

}

exports.calenderCreate = async (req) => {
    const requestData = [req.userIdx, req.cropIdx, req.schedule, req.location, req.locationX, req.locationY];

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