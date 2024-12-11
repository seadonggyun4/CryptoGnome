// API URL 상수 타입
export const URL_QUERY: string = 'https://api.binance.com/api/v3';
export const URL_SOCKET: string = 'wss://stream.binance.com:9443';

// MataMask 상수
export const NETWORK_MAP: Record<string, string> = {
    "0x1": "Ethereum Mainnet",
    "0x3": "Ropsten Testnet",
    "0x4": "Rinkeby Testnet",
    "0x5": "Goerli Testnet",
    "0x2a": "Kovan Testnet",
    "0xaa36a7": "Sepolia Testnet",
    "0x13881": "Polygon Mumbai Testnet",
}

// React Query 관련 상수 타입
export const REALTIME_STALE_TIME: number = 200; // 200ms
export const REALTIME_CACHE_TIME: number = 1000; // 1초
export const GENERAL_STALE_TIME: number = Infinity;
export const GENERAL_CACHE_TIME: number = 120000; // 2분

// 기본 심볼 및 견적 목록
export const BASE_SYMBOL: string = 'BTCUSDT';
export const QUOTES: string[] = ["USDT", "BUSD", "BTC", "ETH", "BNB"];


// UI 상수
export const MAX_WIDTH: number = 1528
export const MAX_HEIGHT: number = 2000

