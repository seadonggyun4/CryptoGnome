"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

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

export const GoogleAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<GoogleUser | null>(null);

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!; // Google Cloud 클라이언트 ID

    // 팝업 로그인 함수
    const login = useCallback(() => {
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
            `${window.location.origin}/auth/google/callback` // Next.js API 라우트로 리디렉션
        )}&response_type=code&scope=openid%20email%20profile`;

        // 팝업 창 열기
        const popup = window.open(googleAuthUrl, "Google Login", "width=500,height=600");

        if (!popup) {
            console.error("Failed to open popup.");
            return;
        }

        const interval = setInterval(() => {
            try {
                // 팝업이 닫힌 경우 감지
                if (popup.closed) {
                    clearInterval(interval);
                    console.log("Popup closed by user.");
                }

                // 팝업의 URL 확인
                const popupUrl = popup.location.href;
                console.log("Popup URL:", popupUrl);
                if (popupUrl.includes("auth/google/callback")) {
                    const urlParams = new URLSearchParams(new URL(popupUrl).search);
                    const authCode = urlParams.get("code");

                    if (authCode) {
                        popup.close();
                        fetchGoogleUserInfo(authCode);
                    }
                }
            } catch (error) {
                // Cross-Origin 에러 무시
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
            setUser({
                name: userInfo.name,
                email: userInfo.email,
                profileImage: userInfo.picture,
            });
        } catch (error) {
            console.error("Failed to fetch user info:", error);
        }
    };

    // 로그아웃
    const logout = () => {
        setUser(null);
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
