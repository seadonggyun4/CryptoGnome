import { AxiosError } from "axios";
import { ERROR_CODE } from "@/process/constants";
import {ErrorCode} from "@/process/types";

export const errorHandler = (error: AxiosError): ErrorCode => {
    if (error.response) {
        const statusCode = error.response.status || error.status || 999;
        return ERROR_CODE[statusCode] ? ERROR_CODE[statusCode] : ERROR_CODE[0];
    } else {
        return ERROR_CODE[0];
    }
};
