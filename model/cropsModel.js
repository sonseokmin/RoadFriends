/* 유저 관련 API 요청 처리 파일  */

const dbConnect = require("../database/index.js");

/**
 * 작물 목록 확인
 * 작물 확인인
 */

exports.cropsCheck = async (req, res) => {

    const sql = `
    SELECT * FROM crops
    ORDER BY idx ASC;
    `

    const [result] = await dbConnect.query(sql);

        if(!result){
            return null
        }
    
        return result;
        
}

exports.cropCheck = async (req, res) => {
    const requestData = [req];
    
    const sql = `
    SELECT name 
    FROM crops
    WHERE idx = ?;
    `

    const [result] = await dbConnect.query(sql, requestData);

        if(!result){
            return null
        }
    
        return result;
        
}
