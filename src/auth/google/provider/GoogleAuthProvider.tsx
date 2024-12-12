"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { encryptData, decryptData } from "@/utils/cryptoJs";

type GoogleUser = {
    name: string;
    email: string;
    profileImage: string;
};

type GoogleAuthContextType = {
    user: GoogleUser | null;
    login: () => void;
    logout: () => void;
};

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(undefined);

// 환경 변수 직접 참조
const SECRET_KEY = process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET;

if (!SECRET_KEY) {
    throw new Error("NEXT_PUBLIC_CRYPTO_JS_SECRET is not defined in the environment variables");
}

export const GoogleAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<GoogleUser | null>(null);

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!; // Google Cloud 클라이언트 ID

    // 새로고침 시 localStorage에서 사용자 정보 복원
    useEffect(() => {
        const encryptedUser = localStorage.getItem("google_user");
        if (encryptedUser) {
            const decryptedUser = decryptData(encryptedUser, SECRET_KEY);
            if (decryptedUser) {
                setUser(decryptedUser);
            }
        }
    }, []);

    // 팝업 로그인 함수
    const login = useCallback(() => {
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
            `${window.location.origin}/auth/google/callback`
        )}&response_type=code&scope=openid%20email%20profile`;

        const popup = window.open(googleAuthUrl, "Google Login", "width=500,height=600");

        if (!popup) {
            console.error("Failed to open popup.");
            return;
        }

        const interval = setInterval(() => {
            try {
                if (popup.closed) {
                    clearInterval(interval);
                }

                const popupUrl = popup.location.href;
                if (popupUrl.includes("auth/google/callback")) {
                    const urlParams = new URLSearchParams(new URL(popupUrl).search);
                    const authCode = urlParams.get("code");

                    if (authCode) {
                        popup.close();
                        fetchGoogleUserInfo(authCode);
                    }
                }
            } catch (error) {
                console.error("Failed to check popup URL:", error);
            }
        }, 500);
    }, [clientId]);

    // Google 사용자 정보 가져오기
    const fetchGoogleUserInfo = async (authCode: string) => {
        try {
            const response = await fetch("https://oauth2.googleapis.com/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    code: authCode,
                    client_id: clientId,
                    client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
                    redirect_uri: `${window.location.origin}/auth/google/callback`,
                    grant_type: "authorization_code",
                }),
            });
            const data = await response.json();

            const userInfoResponse = await fetch(
                "https://www.googleapis.com/oauth2/v2/userinfo",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${data.access_token}`,
                    },
                }
            );
            const userInfo = await userInfoResponse.json();

            const userData: GoogleUser = {
                name: userInfo.name,
                email: userInfo.email,
                profileImage: userInfo.picture,
            };

            setUser(userData);

            // 사용자 정보를 암호화하여 localStorage에 저장
            const encryptedUser = encryptData(userData, SECRET_KEY);
            localStorage.setItem("google_user", encryptedUser);
        } catch (error) {
            console.error("Failed to fetch user info:", error);
        }
    };

    // 로그아웃
    const logout = () => {
        setUser(null);
        localStorage.removeItem("google_user"); // localStorage에서 사용자 정보 제거
    };

    return (
        <GoogleAuthContext.Provider value={{ user, login, logout }}>
            {children}
        </GoogleAuthContext.Provider>
    );
};

export const useGoogleAuth = (): GoogleAuthContextType => {
    const context = useContext(GoogleAuthContext);
    if (!context) {
        throw new Error("useGoogleAuth must be used within a GoogleAuthProvider");
    }
    return context;
};
