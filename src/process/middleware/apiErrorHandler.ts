import { AxiosError } from "axios";

/**
 * API 에러 핸들링 함수
 * @param error - API 요청 중 발생한 에러 객체
 * @param showToast - Toast 메시지를 표시하는 함수
 * @returns void
 */
export const apiErrorHandler = (error: AxiosError | Error, showToast: (message: string, type: "success" | "error" | "info") => void): void => {
    if ("response" in error && error.response) {
        const errorMessage =
            error.response.data &&
            typeof error.response.data === "object" &&
            "message" in error.response.data
                ? (error.response.data as { message: string }).message
                : "Unknown error";

        showToast(`Error: ${errorMessage}`, "error");
    } else if ("request" in error && error.request) {
        showToast("Error: No response received from server", "error");
    } else {
        showToast("Error: An unknown error occurred", "error");
    }
};
