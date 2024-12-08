// API Kline 데이터 타입 정의
export type ApiKlineResponse = [number, string, string, string, string];

// WebSocket 캔들스틱 데이터 타입 정의
export interface WebSocketKlineData {
    k: {
        t: number; // Open time
        o: string; // Open price
        h: string; // High price
        l: string; // Low price
        c: string; // Close price
    };
}

// 차트 데이터 포인트 타입 정의
export interface KlineData {
    x: Date;
    y: [string, string, string, string]; // [Open, High, Low, Close]
}