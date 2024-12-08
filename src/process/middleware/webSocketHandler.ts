// WebSocket 이벤트 핸들러 인터페이스
interface WebSocketHandlers {
    onMessage?: (message: any) => void; // 메시지 처리 핸들러
    onClose?: () => void; // 연결 종료 핸들러
    onError?: (error: Event) => void; // 에러 발생 핸들러
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
 * @returns WebSocket - WebSocket 인스턴스
 */
export const webSocketHandler = (
    url: string,
    handlers: WebSocketHandlers = {},
    options: WebSocketOptions = {}
): WebSocket => {
    const {
        reconnectInterval = 3000, // 기본값: 3초
        maxRetries = 5, // 기본값: 최대 5번 재연결
    } = options;

    let retries = 0; // 재연결 시도 횟수
    let ws: WebSocket; // WebSocket 변수 선언

    const connect = () => {
        ws = new WebSocket(url);

        ws.onopen = () => {
            console.log("WebSocket connected");
            retries = 0; // 연결 성공 시 재연결 횟수 초기화
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
            if (handlers.onClose) {
                handlers.onClose();
            }
            if (retries < maxRetries) {
                retries++;
                console.log(`Reconnecting... (${retries}/${maxRetries})`);
                setTimeout(connect, reconnectInterval);
            } else {
                console.error("Max reconnect attempts reached");
            }
        };

        ws.onerror = (error: Event) => {
            console.error("WebSocket error:", error);
            if (handlers.onError) {
                handlers.onError(error);
            }
        };
    };

    connect(); // 초기 연결

    // null 반환 방지를 위해 ws를 직접 반환
    return ws!;
};
