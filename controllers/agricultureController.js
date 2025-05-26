/* 농업 관련 API 응답 반환 파일 */

/**
 * 병해충 정보 확인
 * 농사로 비디오 정보 확인
 */

const tokenModel = require("../model/tokenModel")
const argricultuerService = require("../services/agricultureService")




// // 병해충 정보 확인
// exports.getPests = async (req, res) => {
//     const userIdx = req.query.userIdx;
//     const localToken = req.query.localToken;

//     console.log(`requestData = { idx : ${userIdx},  localToken : ${localToken} }`)

//       // 유저 고유 인덱스 누락 체크
//         if(!userIdx){
//             return res.status(400).json({
//                 status  : 400,
//                 message : "Invalid userIdx",
//                 data : null,
//             })
//         }
    
//         // 로컬 토큰 누락 체크
//         if(!localToken){
//             return res.status(400).json({
//                 status  : 400,
//                 message : "Invalid localToken",
//                 data : null,
//             })
//         }
    
//         const tokenRequestData = {
//             userIdx : userIdx,
//             localToken : localToken
//         }
    
//         try{
    
//             // 토큰 정보가 일치하지 않을 경우
//             if(!await tokenModel.tokenCheck(tokenRequestData)){
//                 return res.status(401).json({
//                     status  : 401,
//                     message : "Unauthorized",
//                     data : null,
//                 })
//             }
    
//             const response = await cropsModel.cropsCheck();
    
//             console.log(` responseData = { ${JSON.stringify(response)} }`)
    
//             return res.status(200).json({
//                 status  : 200,
//                 message : "success return to pests",
//                 data : response,
//             })
    
//         }
//         catch(err){
//             console.log(err)
    
//             return res.status(500).json({
//                 status  : 500,
//                 message : "server error",
//             })
//         }

// }

// 농사로 비디오 정보 확인
exports.getAgricultuerVideo = async (req, res) => {
    const userIdx = req.query.userIdx;
    const localToken = req.query.localToken;

    console.log(`requestData = { idx : ${userIdx},  localToken : ${localToken} }`)

      // 유저 고유 인덱스 누락 체크
        if(!userIdx){
            return res.status(400).json({
                status  : 400,
                message : "Invalid userIdx",
                data : null,
            })
        }
    
        // 로컬 토큰 누락 체크
        if(!localToken){
            return res.status(400).json({
                status  : 400,
                message : "Invalid localToken",
                data : null,
            })
        }
    
        const tokenRequestData = {
            userIdx : userIdx,
            localToken : localToken
        }
    
        try{
    
            // 토큰 정보가 일치하지 않을 경우
            if(!await tokenModel.tokenCheck(tokenRequestData)){
                return res.status(401).json({
                    status  : 401,
                    message : "Unauthorized",
                    data : null,
                })
            }
    
            const response = await argricultuerService.getAgricultuerVideo()
    
            if(!response){
                return res.status(404).json({
                status  : 404,
                message : "Not found Videos",
                data : null,
                })
            }

            return res.status(200).json({
                status  : 200,
                message : "success return to videos",
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