/* AI 관련 서비스 */

/**
 * 일정 생성
 */

exports.createCalendar = async (parameters) => {
    const params = parameters

    // params 객체를 요청할 수 있는 파라미터 형태로 변환
    const requestData = new URLSearchParams(params).toString();

    // AI 서버로 요청
        const response = await fetch(`http://${process.env.AI_SERVER_URL}:${process.env.AI_PORT}/farm/schedule?${requestData}`, {
           method: 'GET',
           credentials: 'include',
         })
      
    return await response.json()

}