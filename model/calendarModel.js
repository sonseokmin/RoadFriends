/* 캘린더 관련 API 요청 처리 파일  */

const dbConnect = require("../database/index.js");

exports.calendarCheck = async (req) => {
    const requestData = [req.userIdx, req.localToken];

    const sql = `
    SELECT 
        calendar.groupId,
        crops.name AS cropName, 
        DATE_FORMAT(calendar.workStartDate, '%Y-%m-%d') AS workStartDate,
        DATE_FORMAT(calendar.workEndDate, '%Y-%m-%d') AS workEndDate,
        ct.taskName
    FROM calendar
    JOIN crops ON calendar.cropIdx = crops.idx
    JOIN croptasks ct ON calendar.workCode = ct.idx
    JOIN users u ON calendar.userIdx = u.idx
    WHERE u.idx = ? AND u.token = ?
    ORDER BY calendar.groupId;
    `

    const [result] = await dbConnect.query(sql, requestData);


    const calendarGroup = [];

    // result 배열 추출
    result.forEach(result => {
    const existingGroup = calendarGroup.find(g => g.groupId === result.groupId);

    const entry = {
        cropName: result.cropName,
        workStartDate: result.workStartDate,
        workEndDate: result.workEndDate,
        taskName: result.taskName
    };

    if (existingGroup) {
        existingGroup.entries.push(entry);
    } else {
        calendarGroup.push({
        groupId: result.groupId, // 캘린더 그룹 아이디
        entries: [entry] // 캘린더 일정
        });
    }
    });

        if(!calendarGroup){
            return null
        }

        return calendarGroup;

}

exports.calenderCreate = async (req) => {
    const requestData = [req.userIdx, req.cropIdx, req.schedule, req.location, req.locationX, req.locationY];

    const SelectGroupIdSql = "SELECT IFNULL(MAX(groupId), 0) + 1 AS newGroupId FROM calendar;"

    const [groupId] = await dbConnect.query(SelectGroupIdSql);

    console.log(groupId[0].newGroupId)

    const newGroupId = groupId[0].newGroupId

    // schedule 배열 추출
    const scheduleArray = requestData[2]; // schedule = [{ workCode, workDate }, {...}, ...]

    const values = [];
    const placeholders = [];

    for (const sch of scheduleArray) {
    placeholders.push('(?, ?, ?, ?, ?, ?, ?, ?, ?)');
    values.push(
        requestData[0], // userIdx
        requestData[1], // cropIdx
        sch.workCode,
        `${sch.workStartDate.year}-${sch.workStartDate.month}-${sch.workStartDate.day}`, // workStartDate
        `${sch.workEndDate.year}-${sch.workEndDate.month}-${sch.workEndDate.day}`, // workEndDate
        requestData[3], // location
        requestData[4], // locationX
        requestData[5],  // locationY
        newGroupId
    );
    }

    const sql = `
    INSERT INTO calendar (userIdx, cropIdx, workCode, workStartDate, workEndDate, location, locationX, locationY, groupId)
    VALUES ${placeholders.join(',')};
    `;

    const [result] = await dbConnect.query(sql, values);

    
    if(result.affectedRows === 0){
        return null
    }

    return req.userIdx;

}

exports.calendarDelete = async (req, res) => {
    const requestData = [req.groupId];


    const sql = `
        DELETE FROM calendar WHERE groupId = ?;
    `;

    const [result] = await dbConnect.query(sql, requestData);

    if(!result){
        return null
    }

    return req.groupId

}