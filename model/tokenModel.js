/* 토큰 관련 API 요청 처리 파일  */

const dbConnect = require("../database/index.js");

/** 
 * 토큰 생성
 * 토큰 
*/

exports.tokenCreate = async (req) => {
    const requestData = [req.userIdx, req.localToken, req.localToken]

    const sql = `
    INSERT INTO users (idx, token)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE token = ?;
    `

    const [result] = await dbConnect.query(sql, requestData);

    if(!result){
        return null
    }

    return {localToken : req.localToken}

}

exports.tokenCheck = async (req) => {
    const requestData = [req.userIdx, req.localToken]
    
    const sql = `
    SELECT EXISTS (
        SELECT 1
        FROM users
        WHERE idx = ? AND token = ?
    ) AS isMatch;
    `
    
    const [result] = await dbConnect.query(sql, requestData);

    if(!result){
        return null
    }

    console.log(result[0].isMatch)

    return result[0].isMatch
    
}