import {API_ERROR_CODE} from "@/process/constants";

export class CustomError extends Error {
    key: string;
    status: number;

    constructor(status: number | undefined) {
        super();
        this.status = status ? status : 999

        const closeInfo = API_ERROR_CODE[this.status];
        if (closeInfo) {
            this.key = closeInfo.key;
            this.message = closeInfo.message;
        } else {
            this.key = API_ERROR_CODE[999].key;
            this.message = API_ERROR_CODE[999].message;
        }

        // Error 스택 추적 설정
        Error.captureStackTrace(this, this.constructor);
    }
}
