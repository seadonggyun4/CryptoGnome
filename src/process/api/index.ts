import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { URL_QUERY } from "@/process/constants";

/**
 * API 요청 함수
 * @param url - API 엔드포인트
 * @param options - Axios 요청 옵션
 * @param method - HTTP 메서드 (기본값: 'GET')
 * @param headers - 추가 요청 헤더 (기본값: 빈 객체)
 * @returns Promise<AxiosResponse<T>> - Axios 응답
 */
export const apiClient = async <T>(
    url: string,
    options: AxiosRequestConfig = {},
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" = "GET",
    headers: Record<string, string> = {}
): Promise<AxiosResponse<T>> => {
    // 기본 옵션
    const defaultOptions: AxiosRequestConfig = {
        url: `${URL_QUERY}/${url}`,
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers, // 사용자 지정 헤더 병합
        },
    };

    // Axios 요청
    return axios({
        ...defaultOptions,
        ...options, // 사용자 지정 옵션 병합
    });
};