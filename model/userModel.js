/* 유저 관련 API 요청 처리 파일  */

const dbConnect = require("../database/index.js");

/** 
 * 유저 확인
 * 회원가입
*/

exports.userCheck = async (req) => {
    const reqestData = [req.email, req.socialType];

    // 같은 인증 종류과 이메일이 존재하면 인덱스 리턴
    const sql = `
    SELECT idx
    FROM users
    WHERE email = ? AND socialType = ?
    `

    const [result] = await dbConnect.query(sql, reqestData);

    if(!result){
        return null
    }

    return result;

}

exports.userSignup = async (req) => {
    const reqestData = [req.email, req.name, req.socialType];

    // 이메일, 이름, 인증 종류 기준으로 DB에 저장
    const sql = `
    INSERT INTO users
    (email, name, socialType) VALUES
    (?, ?, ?)
    `

    const [result] = await dbConnect.query(sql, reqestData);

    if(!result){
        return null
    }

    return result.insertId;

}