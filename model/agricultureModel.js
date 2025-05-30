/* 농업 관련 API 요청 처리 파일  */

const dbConnect = require("../database/index.js");

exports.getAgricultureVideoCurrentDayIsMatch = async (req, res) => {
    const sql = `
    SELECT 
    *,
    CASE 
        WHEN DATE(day) = CURDATE() THEN 1
        ELSE 0
    END AS isToday
    FROM videos;
    `

    const [result] = await dbConnect.query(sql);

    if(!result){
        return null
    }

    console.log(result[0].isToday)

    return result[0].isToday
}

exports.getAgricultureVideos = async (req, res) => {
    const sql = `
    SELECT title, thumbnailUrl, videoUrl
    FROM videos
    `

    const [result] = await dbConnect.query(sql);

    if(!result){
        return null
    }

    return result
}

exports.postAgricultureVideos = async (req, res) => {
    const videos = req
    console.log(videos)
    
    const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd

    const requestData = [];
    const placeholders = [];

    for (const video of videos) {
      const { title, thumbnailUrl, videoUrl } = video;

      if (!title || !thumbnailUrl || !videoUrl) continue;
      placeholders.push('(?, ?, ?, ?)');
      requestData.push(title, thumbnailUrl, videoUrl, today);
    }

    const sql = `
      INSERT INTO videos (title, thumbnailUrl, videoUrl, day)
      VALUES ${placeholders.join(',')}
    `;

    const [result] = await dbConnect.query(sql, requestData);

     if(!result){
        return null
    }

    console.log(result)

    return result

}

exports.deleteAgricultureVideos = async (req, res) => {
    const sql = `
      DELETE
      FROM videos;
    `;

    const [result] = await dbConnect.query(sql);

    if(!result){
        return null
    }

    return result
}