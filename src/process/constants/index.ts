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
        message: "서버로부터 응답이 없습니다.네트워크 상태를 확인해주세요.",
    }
}

export const WEBSOCKET_CLOSE_CODE: Record<number, ErrorCode> = {
    1000: {
        status: 1000,
        key: 'NORMAL_SHUTDOWN',
        message: '정상 종료.'
    },
    1001: {
        status: 1001,
        key: 'SERVER_DOWN',
        message: '서버 다운.'
    },
    1002: {
        status: 1002,
        key: 'PROTOCOL_ERROR',
        message: '프로토콜 오류.'
    },
    1003: {
        status: 1003,
        key: 'UNACCEPTABLE_DATA_TYPE',
        message: '허용되지 않은 데이터 유형 수신.'
    },
    1004: {
        status: 1004,
        key: 'UNDEFINED_ERROR',
        message: '정의되지 않은 오류.'
    },
    1005: {
        status: 1005,
        key: 'EXIT_WITHOUT_STATUS_CODE',
        message: '상태 코드가 없는 채로 종료.'
    },
    1006: {
        status: 1006,
        key: 'ABNORMAL_SHUTDOWN',
        message: '비정상 종료.'
    },
    1007: {
        status: 1007,
        key: 'MISMATCHED_DATA',
        message: '일치하지 않는 데이터.'
    },
    1008: {
        status: 1008,
        key: 'POLICY_VIOLATION',
        message: '정책 위반.'
    },
    1009: {
        status: 1009,
        key: 'MESSAGE_PROCESSING_CAPACITY_EXCEEDED',
        message: '메시지 처리 용량 초과.'
    },
    1010: {
        status: 1010,
        key: 'NO_RESPONSE',
        message: '응답 메시지 반환값 없음.'
    },
    1011: {
        status: 1011,
        key: 'UNEXPECTED_SHUTDOWN',
        message: '예기치 않은 연결 종료.'
    },
    1015: {
        status: 1015,
        key: 'TLS_FAILED',
        message: 'TLS 핸드셰이크 수행 실패.'
    },
    4000: {
        status: 4000,
        key: 'COMPONENT_CHANGE',
        message: '컴포넌트 변화로 인한 종료.'
    },
}

