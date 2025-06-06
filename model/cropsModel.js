/* 유저 관련 API 요청 처리 파일  */

const dbConnect = require("../database/index.js");

/**
 * 작물 목록 확인
 */

exports.getCrops = async (req, res) => {

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
