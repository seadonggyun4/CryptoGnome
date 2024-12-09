// WebSocket 이벤트 핸들러 인터페이스
interface WebSocketHandlers {
    onMessage?: (message: any) => void; // 메시지 처리 핸들러
    onClose?: () => void; // 연결 종료 핸들러
    onError?: (error: Event) => void; // 에러 발생 핸들러
    onOpen?: () => void; // 연결 성공 핸들러
}

// WebSocket 옵션 인터페이스
interface WebSocketOptions {
    reconnectInterval?: number; // 재연결 간격 (ms)
    maxRetries?: number; // 최대 재연결 시도 횟수
}

/**
 * WebSocket Handler
 * @param url - WebSocket URL
 * @param handlers - 이벤트 핸들러 객체
 * @param options - 추가 옵션
 * @param showToast - Toast 메시지 표시 함수
 * @returns WebSocket - WebSocket 인스턴스
 */
export const webSocketHandler = (
    url: string,
    handlers: WebSocketHandlers = {},
    options: WebSocketOptions = {},
    showToast?: (message: string, type: "success" | "error" | "info") => void
): WebSocket => {
    const { reconnectInterval = 3000, maxRetries = 5 } = options;

    let retries = 0;
    let ws: WebSocket;

    const connect = () => {
        ws = new WebSocket(url);

        ws.onopen = () => {
            console.log("WebSocket connected");
            if (showToast) showToast("WebSocket connected successfully", "success");
            retries = 0;
            if (handlers.onOpen) handlers.onOpen();
        };

        ws.onmessage = (event: MessageEvent) => {
            if (handlers.onMessage) {
                try {
                    const message = JSON.parse(event.data);
                    handlers.onMessage(message);
                } catch (error) {
                    console.error("Error parsing WebSocket message:", error);
                }
            }
        };

        ws.onclose = () => {
            console.log("WebSocket closed");
            if (showToast) showToast("WebSocket connection closed", "info");
            if (handlers.onClose) handlers.onClose();
            if (retries < maxRetries) {
                retries++;
                console.log(`Reconnecting... (${retries}/${maxRetries})`);
                setTimeout(connect, reconnectInterval);
            } else {
                if (showToast) showToast("Max reconnect attempts reached", "error");
                console.error("Max reconnect attempts reached");
            }
        };

        ws.onerror = (error: Event) => {
            console.error("WebSocket error:", error);
            if (showToast) showToast("WebSocket error occurred", "error");
            if (handlers.onError) handlers.onError(error);
        };
    };

    connect();

    return ws!;
};
