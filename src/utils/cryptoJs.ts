import CryptoJS from "crypto-js";

export const encryptData = (data: any, secretKey:string): string => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decryptData = (ciphertext: string, secretKey:string): any | null => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        console.error("Failed to decrypt data:", error);
        return null;
    }
};