/* 작물 관련 API 응답 반환 파일 */

const cropsModel = require("../model/cropsModel.js")

/**
 * 작물 목록 확인
 */


// 작물 목록 확인
exports.cropsCheck = async (req, res) => {

 try{
        const response = await cropsModel.cropsCheck();

        console.log(` responseData = { ${response} }`)

        return res.status(200).json({
            status  : 200,
            message : "success return to crops list",
            data : response,
        })

    }
    catch(err){
        console.log(err)

        return res.status(500).json({
            status  : 500,
            message : "server error",
        })
    }

}

