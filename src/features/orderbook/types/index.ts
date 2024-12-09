export type orderBookList = [string, string][] // [price, amount]
export type orderBook = {
    price: string;
    amount: string;
    total: string;
}

// 공통 데이터 타입
interface BaseData {
    bids: orderBookList; // 매수 데이터
    asks: orderBookList; // 매도 데이터
}

// API 응답 타입 (원본 데이터)
export interface ApiTOrderBookResponse {
    bids: orderBookList; // 매수 데이터
    asks: orderBookList; // 매도 데이터
}

// WebSocket 업데이트 데이터 타입
export interface WebSocketOrderBookData {
    b: orderBookList; // 매수 데이터
    a: orderBookList; // 매도 데이터
}

// OrderBook 데이터 타입 정의
export interface OrderBookData {
    bids: orderBookList; // 매수 데이터
    asks: orderBookList; // 매도 데이터
}