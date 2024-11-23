/**
 * API 에러 핸들링 함수
 * @param {Error} error - API 요청 중 발생한 에러 객체
 * @returns {void}
 */
export const apiErrorHandler = (error) => {
    if (error.response) {
        console.error(
            `API Error: ${error.response.status} - ${error.response.data?.message || "Unknown error"}`
        );
    } else if (error.request) {
        console.error("API Error: No response received from server", error.request);
    } else {
        console.error("API Error: An unknown error occurred", error.message);
    }
};
