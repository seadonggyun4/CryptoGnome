export class CustomError extends Error {
    key: string;
    status: number;

    constructor(status: number, key: string, message: string) {
        super(message);
        this.status = status;
        this.key = key;
    }
}
