/* 소셜 로그인 관련 서비스 */

/**
 * 소셜 유저 확인
 * 로컬 토큰 생성
 */


//소셜 유저 확인
exports.getSocial = async (socialType, socialIdx, accessToken) => {
    try {
        let url = '';
        let extractId;

        console.log(socialType, socialIdx, accessToken)

        // 소셜 타입별 요청 URL과 ID 추출 방식 설정
        switch (socialType) {
            case 'kakao':
                url = 'https://kapi.kakao.com/v2/user/me';
                extractId = data => data.id;
                break;
            case 'naver':
                url = 'https://openapi.naver.com/v1/nid/me';
                extractId = data => data.response?.id;
                break;
            case 'google':
                url = 'https://www.googleapis.com/oauth2/v3/userinfo';
                extractId = data => data.sub;
                break;
            default:
                return null;
        }

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        });

        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        const userId = String(extractId(data));


        console.log(`[${socialType}] 서버 응답 ID: ${userId}, 전달된 소셜Idx: ${socialIdx}`);

        return userId === socialIdx;
    } catch (err) {
        console.error(`[${socialType}] 유저 정보 확인 중 에러 발생:`, err);
        return null;
    }
}

