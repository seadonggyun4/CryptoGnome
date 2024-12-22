import {WebSocketError} from "@/process/webSocket/WebSocketError";
import {ErrorCode} from "@/process/types";


// WebSocket 이벤트 핸들러 인터페이스
interface WebSocketHandlers {
    onMessage?: (message: any) => void; // 메시지 처리 핸들러
    onClose?: (error: ErrorCode) => void; // 연결 종료 핸들러
    onError?: (error: Event) => void; // 에러 발생 핸들러
    onOpen?: () => void; // 연결 성공 핸들러
}

// WebSocket 옵션 인터페이스
interface WebSocketOptions {
    reconnectInterval?: number; // 재연결 간격 (ms)
}

/**
 * WebSocket Handler
 * @param url - WebSocket URL
 * @param handlers - 이벤트 핸들러 객체
 * @param options - 추가 옵션
 * @returns WebSocket - WebSocket 인스턴스
 */
export const webSocketHandler = (
    url: string,
    handlers: WebSocketHandlers = {},
    options: WebSocketOptions = {},
): WebSocket => {
    const { reconnectInterval = 3000 } = options;

    let ws: WebSocket;

    const connect = () => {
        ws = new WebSocket(url);

        ws.onopen = () => {
            if (handlers.onOpen) handlers.onOpen();
        };

        ws.onmessage = (event: MessageEvent) => {
            if (handlers.onMessage) {
                const message = JSON.parse(event.data);
                handlers.onMessage(message);
            }
        };

        ws.onclose = (e) => {
            const error = new WebSocketError(e.code)
            if(error.status !== 4000 && error.status !== 1000 && handlers.onClose) {
                handlers.onClose(error)
            }
            setTimeout(connect, reconnectInterval);
        };

        ws.onerror = (error: Event) => {
            if (handlers.onError) handlers.onError(error);
        };
    };

    connect();

    return ws!;
};
