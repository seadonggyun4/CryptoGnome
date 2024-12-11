"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
} from "react";

type GoogleUser = {
    name: string;
    email: string;
    profileImage: string;
};

type GoogleAuthContextType = {
    user: GoogleUser | null;
    isMetaMaskInstalled: boolean;
    login: () => void;
    logout: () => void;
};

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(undefined);

export const GoogleAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<GoogleUser | null>(null);
    const [googleClient, setGoogleClient] = useState<any>(null);
    const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!; // Google Cloud 클라이언트 ID

    // Google API 로드
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => setIsGoogleLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Google OAuth 클라이언트 초기화
    useEffect(() => {
        if (isGoogleLoaded && (window as any).google) {
            const client = (window as any).google.accounts.oauth2.initCodeClient({
                client_id: clientId,
                scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
                ux_mode: "redirect",
                redirect_uri: "http://localhost:3000/en/trade/BTCUSDT", // 로컬 환경 또는 배포 URL
                callback: (response: any) => {
                    fetchGoogleUserInfo(response.code);
                },
            });
            setGoogleClient(client);
        }
    }, [isGoogleLoaded, clientId]);

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
                    redirect_uri: "postmessage",
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
        } catch (err) {
            console.error("Failed to fetch user info:", err);
        }
    };

    // MetaMask 설치 여부 확인
    useEffect(() => {
        setIsMetaMaskInstalled(!!(window as any).ethereum);
    }, []);

    // 로그인
    const login = useCallback(() => {
        if (googleClient) {
            googleClient.requestCode();
        } else {
            console.error("Google client is not initialized");
        }
    }, [googleClient]);

    // 로그아웃
    const logout = () => {
        setUser(null);
    };

    return (
        <GoogleAuthContext.Provider
            value={{ user, isMetaMaskInstalled, login, logout }}
        >
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
