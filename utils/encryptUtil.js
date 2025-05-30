/* 암호화 관련 유틸리티 */

/**
 * 로컬 토큰 생성
 */

const crypto = require('crypto');


// 로컬 토큰 생성
exports.CreateEncryptWithSHA256 = async (accessToken) => {
    const unixTime = Math.floor(Date.now() / 1000); // 유닉스 시간(초 단위)
    const text = `${accessToken}:${unixTime}`;

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
}


