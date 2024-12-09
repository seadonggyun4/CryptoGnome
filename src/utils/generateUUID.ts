/**
 * 고유한 UUID 생성 함수
 * @returns string - 고유한 UUID
 */
export const generateUUID = (): string => {
    const timestamp = Date.now().toString(36); // 현재 시간을 36진수로 변환
    const random = Math.random().toString(36).substring(2, 10); // 랜덤 값을 36진수로 변환
    return `${timestamp}-${random}`;
};
