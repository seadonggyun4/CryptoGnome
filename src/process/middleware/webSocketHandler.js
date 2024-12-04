/**
 * WebSocket Handler
 * @param {string} url - WebSocket URL
 * @param {Object} handlers - 이벤트 핸들러 객체 (onMessage, onClose, onError)
 * @param {Object} options - 추가 옵션 (reconnectInterval, maxRetries 등)
 * @returns {WebSocket} - WebSocket 인스턴스
 */
export const webSocketHandler = (url, handlers = {}, options = {}) => {
    const {
        reconnectInterval = 3000, // 재연결 간격 (ms)
        maxRetries = 5, // 최대 재연결 시도 횟수
    } = options;

    let retries = 0; // 재연결 시도 횟수
    let ws = null;

    const connect = () => {
        ws = new WebSocket(url);

        ws.onopen = () => {
            console.log("WebSocket connected");
            retries = 0; // 연결 성공 시 재연결 횟수 초기화
        };

        ws.onmessage = (event) => {
            if (handlers.onMessage) {
                const message = JSON.parse(event.data);
                handlers.onMessage(message);
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

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
            if (handlers.onError) {
                handlers.onError(error);
            }
        };
    };

    connect(); // 초기 연결

    return ws;
};
