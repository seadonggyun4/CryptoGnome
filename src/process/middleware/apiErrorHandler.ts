import { AxiosError } from "axios";
import { API_ERROR_CODE } from "@/process/constants";
import {ErrorCode} from "@/process/types";

export const errorHandler = (error: AxiosError): ErrorCode => {
    if (error.response) {
        const statusCode = error.response.status || error.status || 999;
        return API_ERROR_CODE[statusCode] ? API_ERROR_CODE[statusCode] : API_ERROR_CODE[0];
    } else {
        return API_ERROR_CODE[0];
    }
};
