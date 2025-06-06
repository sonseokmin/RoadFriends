/* 유저 관련 API 요청 처리 파일  */

const dbConnect = require("../database/index.js");

/** 
 * 유저 확인
 * 회원가입
*/

exports.getUser = async (req) => {
    const requestData = [req.email, req.socialType, req.socialIdx];

    // 같은 인증 종류, 이메일, 소셜 고유 인덱스가가 존재하면 인덱스 리턴
    const sql = `
    SELECT idx
    FROM users
    WHERE email = ? AND socialType = ? AND socialIdx = ?
    `

    const [result] = await dbConnect.query(sql, requestData);

    if(!result){
        return null
    }

    return result;

}

exports.postUser = async (req) => {
    const requestData = [req.email, req.name, req.socialType, req.socialIdx];

    // 이메일, 이름, 인증 종류 기준으로 DB에 저장
    const sql = `
    INSERT INTO users
    (email, name, socialType, socialIdx) VALUES
    (?, ?, ?, ?)
    `

    const [result] = await dbConnect.query(sql, requestData);

    if(!result){
        return null
    }

    return result.insertId;

}