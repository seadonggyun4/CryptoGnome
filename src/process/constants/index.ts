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

// API Error Code
export const API_ERROR_CODE: Record<number, ErrorCode> = {
    500: {
        status: 500,
        key: "SERVER_ERROR",
        message: "There was a problem with the server, please try again later.",
    },
    404: {
        status: 404,
        key: "NOT_FOUND",
        message: "The requested resource was not found.",
    },
    403: {
        status: 403,
        key: "BAD_REQUEST",
        message: "Invalid request.",
    },
    999: {
        status: 999,
        key: "UNKNOWN_ERROR",
        message: "An unknown error occurred. Please try again later.",
    },
    0: {
        status: 0,
        key: "NO_RESPONSE",
        message: "There is no response from the server, please check the network status.",
    }
}

export const WEBSOCKET_CLOSE_CODE: Record<number, ErrorCode> = {
    1000: {
        status: 1000,
        key: 'NORMAL_SHUTDOWN',
        message: 'Normal shutdown.'
    },
    1001: {
        status: 1001,
        key: 'SERVER_DOWN',
        message: 'Server down.'
    },
    1002: {
        status: 1002,
        key: 'PROTOCOL_ERROR',
        message: 'Protocol error.'
    },
    1003: {
        status: 1003,
        key: 'UNACCEPTABLE_DATA_TYPE',
        message: 'Receive unacceptable data types.'
    },
    1004: {
        status: 1004,
        key: 'UNDEFINED_ERROR',
        message: 'An undefined error.'
    },
    1005: {
        status: 1005,
        key: 'EXIT_WITHOUT_STATUS_CODE',
        message: 'Exit without status code.'
    },
    1006: {
        status: 1006,
        key: 'ABNORMAL_SHUTDOWN',
        message: 'Abnormal termination.'
    },
    1007: {
        status: 1007,
        key: 'MISMATCHED_DATA',
        message: 'Inconsistent data.'
    },
    1008: {
        status: 1008,
        key: 'POLICY_VIOLATION',
        message: 'a breach of policy.'
    },
    1009: {
        status: 1009,
        key: 'MESSAGE_PROCESSING_CAPACITY_EXCEEDED',
        message: 'Message processing capacity exceeded.'
    },
    1010: {
        status: 1010,
        key: 'NO_RESPONSE',
        message: 'No response message return value.'
    },
    1011: {
        status: 1011,
        key: 'UNEXPECTED_SHUTDOWN',
        message: 'Unexpected connection termination.'
    },
    1015: {
        status: 1015,
        key: 'TLS_FAILED',
        message: 'Failed to perform TLS handshake.'
    },
    4000: {
        status: 4000,
        key: 'COMPONENT_CHANGE',
        message: 'Termination due to component change.'
    },
}

