import { ErrorCode } from "@/process/types";

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

// Error Code
export const ERROR_CODE: Record<number, ErrorCode> = {
    409: {
        status: 409,
        key: 'DUPLICATE_EMAIL',
        message: '이미 사용 중인 계정 입니다.'
    },
    500: {
        status: 500,
        key: "SERVER_ERROR",
        message: "서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.",
    },
    404: {
        status: 404,
        key: "NOT_FOUND",
        message: "요청한 리소스를 찾을 수 없습니다.",
    },
    403: {
        status: 403,
        key: "BAD_REQUEST",
        message: "잘못된 요청입니다.",
    },
    999: {
        status: 999,
        key: "UNKNOWN_ERROR",
        message: "알 수 없는 에러가 발생했습니다. 나중에 다시 시도해주세요.",
    },
    0: {
        status: 0,
        key: "NO_RESPONSE",
        message: "서버로부터 응답이 없습니다. 네트워크 상태를 확인해주세요.",
    }
}

