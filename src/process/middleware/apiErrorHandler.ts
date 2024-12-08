import { AxiosError } from "axios";

/**
 * API 에러 핸들링 함수
 * @param error - API 요청 중 발생한 에러 객체
 * @returns void
 */
export const apiErrorHandler = (error: AxiosError | Error): void => {
    if ("response" in error && error.response) {
        const errorMessage =
            error.response.data &&
            typeof error.response.data === "object" &&
            "message" in error.response.data
                ? (error.response.data as { message: string }).message
                : "Unknown error";

        console.error(
            `API Error: ${error.response.status} - ${errorMessage}`
        );
    } else if ("request" in error && error.request) {
        console.error("API Error: No response received from server", error.request);
    } else {
        console.error("API Error: An unknown error occurred", error.message);
    }
};
