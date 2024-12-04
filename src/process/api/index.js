import axios from "axios";
import { URL_QUERY } from "@/process/constants";

/**
 * API 요청 함수
 * @param {string} url - API 엔드포인트
 * @param {Object} options - 요청 옵션 (method, headers, body 등)
 * @param {string} [method='GET'] - HTTP 메서드
 * @param {Object} [headers={}] - 요청 헤더
 * @returns {Promise} - Axios 응답
 */
export const apiClient = async (url, options = {}, method = "GET", headers = {}) => {
    const defaultOptions = {
        url: `${URL_QUERY}/${url}`,
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers, // 사용자 지정 헤더 병합
        },
    };

    return axios({
        ...defaultOptions,
        ...options, // 사용자 지정 옵션 병합
    });
};
