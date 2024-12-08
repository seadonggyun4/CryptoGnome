// 공통 데이터 타입
interface BaseData {
    symbol: string;
    lastPrice: string;
    priceChange: string;
    priceChangePercent: string;
    highPrice: string;
    lowPrice: string;
    volume: string;
    quoteVolume: string;
}

// API 응답 타입 (원본 데이터)
export interface ApiTickerResponse extends BaseData {
    time: string;
}

// WebSocket 업데이트 데이터 타입
export interface WebSocketTickerData {
    s: string; // Symbol
    c: string; // Last price
    p: string; // Price change
    P: string; // Price change percentage
    h: string; // High price
    l: string; // Low price
    v: string; // Volume
    q: string; // Quote volume
}

// OrderBook 데이터 타입 정의
export interface TickerData extends BaseData{
    time: Date;
}