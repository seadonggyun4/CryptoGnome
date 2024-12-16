"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { encryptData, decryptData } from "@/utils/cryptoJs";
import { NETWORK_MAP } from "@/process/constants";

type GoogleUser = {
    name: string;
    email: string;
    profileImage: string;
};

type GoogleAuthContextType = {
    user: GoogleUser | null;
    login: () => Promise<GoogleUser | null>;
    logout: () => void;
    account: string | null;
    balance: string | null;
    network: string | null;
    isMetaMaskInstalled: boolean;
};

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(undefined);

export const GoogleAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<GoogleUser | null>(null);
    const [account, setAccount] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [network, setNetwork] = useState<string | null>(null);
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
    const CRYPTO_JS_KEY = process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET;
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        `${typeof window !== "undefined" ? window.location.origin : ""}/auth/google/callback`
    )}&response_type=code&scope=openid%20email%20profile`;

    // 새로고침 시 localStorage에서 사용자 정보 복원
    useEffect(() => {
        if (typeof window === "undefined") return; // 서버에서는 실행되지 않도록 설정
        const encryptedUser = localStorage.getItem("google_user");
        if (encryptedUser && CRYPTO_JS_KEY) {
            const userInfo = decryptData(encryptedUser, CRYPTO_JS_KEY);
            setUser(userInfo);
            if ((window as any).ethereum) {
                connectMetaMask();
                setIsMetaMaskInstalled(true);
            }
        }
    }, []);

    // 팝업 로그인 함수
    const login = useCallback(async (): Promise<GoogleUser | null> => {
        if (typeof window === "undefined") return null; // 서버 환경에서 실행 방지

        return new Promise((resolve, reject) => {
            const popup = window.open(googleAuthUrl, "Google Login", "width=500,height=600");

            if (!popup) {
                reject(new Error("Failed to open popup."));
                return;
            }

            const interval = setInterval(() => {
                try {
                    if (popup.closed) {
                        clearInterval(interval);
                        reject(new Error("Popup was closed before completing login."));
                        return;
                    }

                    const popupUrl = popup.location.href;
                    if (popupUrl.includes("auth/google/callback")) {
                        const urlParams = new URLSearchParams(new URL(popupUrl).search);
                        const authCode = urlParams.get("code");

                        if (authCode) {
                            fetchGoogleUserInfo(authCode)
                                .then((userInfo) => {
                                    setIsMetaMaskInstalled((window as any).ethereum);
                                    if ((window as any).ethereum) {
                                        connectMetaMask();
                                        popup.close();
                                    }
                                    resolve(userInfo);
                                })
                                .catch((err) => {
                                    reject(err);
                                    popup.close();
                                });
                        }
                    }
                } catch (error) {
                    // Ignore cross-origin errors until callback is reached
                }
            }, 1000);
        });
    }, [googleAuthUrl]);

    // 유저 정보 패치 함수
    const fetchGoogleUserInfo = async (authCode: string): Promise<GoogleUser> => {
        const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code: authCode,
                client_id: clientId,
                client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
                redirect_uri: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/google/callback`,
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
        if (CRYPTO_JS_KEY) localStorage.setItem("google_user", encryptData(userData, CRYPTO_JS_KEY));

        return userData;
    };

    // 로그아웃 함수
    const logout = () => {
        localStorage.removeItem("google_user");
        setUser(null);
        setBalance(null);
        setNetwork(null);
        setIsMetaMaskInstalled(false);
    };

    // MetaMask 연결 함수
    const connectMetaMask = async () => {
        if (typeof window === "undefined") return; // 서버 환경에서 실행 방지

        try {
            const ethereum = (window as any).ethereum;
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccount(accounts[0]);

            // 잔액 및 네트워크 정보 가져오기
            await fetchBalance(accounts[0]);
            await fetchNetwork();
        } catch (err: any) {
            console.error(err.message || "MetaMask connection failed");
        }
    };

    // 잔액 가져오기
    const fetchBalance = async (account: string) => {
        if (typeof window === "undefined") return; // 서버 환경에서 실행 방지

        try {
            const ethereum = (window as any).ethereum;
            const balanceInWei = await ethereum.request({
                method: "eth_getBalance",
                params: [account, "latest"],
            });
            const balanceInEth = (parseInt(balanceInWei, 16) / 10 ** 18).toFixed(4);
            setBalance(balanceInEth);
        } catch (err) {
            console.error("Failed to fetch balance.");
        }
    };

    // 네트워크 정보 가져오기
    const fetchNetwork = async () => {
        if (typeof window === "undefined") return; // 서버 환경에서 실행 방지

        try {
            const ethereum = (window as any).ethereum;
            const chainId = await ethereum.request({ method: "eth_chainId" });
            setNetwork(NETWORK_MAP[chainId] || `Unknown Network (${chainId})`);
        } catch (err) {
            console.error("Failed to fetch network.");
        }
    };

    // 지갑 & 네트워크 변경시 패치
    useEffect(() => {
        const handleAccountsChanged = async (accounts: string[]) => {
            if (accounts.length === 0) {
                // 사용자가 계정을 연결 해제한 경우
                setAccount(null);
                setBalance(null);
                setNetwork(null);
            } else {
                await connectMetaMask(); // 계정 변경 시 MetaMask 재연결 및 데이터 갱신
            }
        };

        const ethereum = (window as any).ethereum;

        if (ethereum) {
            ethereum.on("accountsChanged", handleAccountsChanged);
            ethereum.on("chainChanged", handleAccountsChanged);
        }

        // 클린업 함수: 이벤트 리스너 제거
        return () => {
            if (ethereum) {
                ethereum.removeListener("accountsChanged", handleAccountsChanged);
                ethereum.removeListener("chainChanged", handleAccountsChanged);
            }
        };
    }, [connectMetaMask]);


    return (
        <GoogleAuthContext.Provider value={{
            user,
            login,
            logout,
            account,
            balance,
            network,
            isMetaMaskInstalled,
        }}>
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
