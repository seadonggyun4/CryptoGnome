import { WEBSOCKET_CLOSE_CODE } from "@/process/constants";

export class WebSocketError extends Error {
    key: string;
    status: number;

    constructor(status: number) {
        super(); // Error 클래스의 기본 생성자 호출

        this.status = status;

        // 상태 코드가 유효한지 확인
        const closeInfo = WEBSOCKET_CLOSE_CODE[status];
        if (closeInfo) {
            this.key = closeInfo.key;
            this.message = closeInfo.message;
        } else {
            // 상태 코드가 정의되지 않은 경우 기본값 설정
            this.key = "UNKNOWN_ERROR";
            this.message = `알 수 없는 종료 코드: ${status}`;
        }

        // Error 스택 추적 설정
        Error.captureStackTrace(this, this.constructor);
    }
}
