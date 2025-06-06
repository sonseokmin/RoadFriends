/* 농업 관련 서비스 */

/**
 * 병해충 정보 확인
 * 농사로 비디오 정보 확인
 * 
 */

const xml2js = require('xml2js');
const parser = new xml2js.Parser();

exports.getAgricultuerVideo = async () => {

    // 요청할 파라미터
    const params = {
        apiKey : process.env.NONGSARO_API_KEY,
        sType : "ALL"
    };

        // params 객체를 요청할 수 있는 파라미터 형태로 변환
        const requestData = new URLSearchParams(params).toString();
      
        // AI 서버로 요청
        const response = await fetch(`http://api.nongsaro.go.kr/service/shortMvp/shortMvpList?${requestData}`, {
           method: 'GET',
           credentials: 'include',
         })


      
        const result = await parser.parseStringPromise( await response.text());

        const items = result.response.body[0].items[0].item || []


        const videos = items.map((item) => ({
            title: item.sj?.[0] || '제목 없음',
            thumbnailUrl: item.thumbImgUrl?.[0] || 'https://via.placeholder.com/150',
            videoUrl: item.mvpUrl?.[0] || '',
            // provider : item.provdInsttNm?.[0] ||  '제공처 없음',
            // runtime  : item.runningTime?.[0] ||  '00:00:00',
            // groupCode  : item.atchmnflGroupEsntlCode?.[0] || '??'
        }));

        if(videos.length === 0){
            return null
        }

        return videos


}

exports.getAgricultuerNews = async () => {
    try {
        const url = 'http://www.agrinet.co.kr/rss/allArticle.xml';

        const response = await fetch(url);
        const xml = await response.text();
        
        const result = await xml2js.parseStringPromise(xml);
        const items = result.rss.channel[0].item;

        return items
        
  } catch (err) {
    console.error('RSS 불러오기 실패:', err.message);
  }

}