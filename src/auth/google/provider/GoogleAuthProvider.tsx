"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { encryptData, decryptData } from "@/utils/cryptoJs";
import {NETWORK_MAP} from "@/process/constants";

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


    // const SECRET_KEY = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
    const CRYPTO_JS_KEY = process.env.NEXT_PUBLIC_CRYPTO_JS_SECRET
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        `${window.location.origin}/auth/google/callback`
    )}&response_type=code&scope=openid%20email%20profile`;

    // 새로고침 시 localStorage에서 사용자 정보 복원
    useEffect(() => {
        const encryptedUser = localStorage.getItem("google_user");
        if (encryptedUser && CRYPTO_JS_KEY) {
            const userInfo =  decryptData(encryptedUser, CRYPTO_JS_KEY)
            setUser(userInfo)
            if((window as any).ethereum) {
                connectMetaMask()
                setIsMetaMaskInstalled(true)
            }
        }
    }, []);

    // 팝업 로그인 함수
    const login = useCallback(async (): Promise<GoogleUser | null> => {
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
                                    // 구글 로그인 성공시 MetaMask 설치 여부 확인
                                    setIsMetaMaskInstalled((window as any).ethereum);
                                    if((window as any).ethereum) {
                                        connectMetaMask()
                                        popup.close();
                                    }
                                    return userInfo;
                                })
                                .catch((err) => {
                                    reject(err);
                                    popup.close();
                                    return null;
                                });
                        }
                    }
                } catch (error) {
                    // Ignore cross-origin errors until callback is reached
                }
            }, 1000);
        });
    }, [clientId]);

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
        if(CRYPTO_JS_KEY) localStorage.setItem("google_user", encryptData(userData, CRYPTO_JS_KEY));

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
            return new Error(err.message || "MetaMask connection failed");
        }
    };

    // MetaMask 연결 해제 함수
    const disconnectMetaMask = () => {
        setAccount(null);
        setBalance(null);
        setNetwork(null);
    };

    // 잔액 가져오기
    const fetchBalance = async (account: string) => {
        try {
            const ethereum = (window as any).ethereum;
            const balanceInWei = await ethereum.request({
                method: "eth_getBalance",
                params: [account, "latest"],
            });
            const balanceInEth = (parseInt(balanceInWei, 16) / 10 ** 18).toFixed(4);
            setBalance(balanceInEth);
        } catch (err) {
            return new Error("Failed to fetch balance.")
        }
    };

    // 네트워크 정보 가져오기
    const fetchNetwork = async () => {
        try {
            const ethereum = (window as any).ethereum;
            const chainId = await ethereum.request({ method: "eth_chainId" });

            setNetwork(NETWORK_MAP[chainId] || `Unknown Network (${chainId})`);
        } catch (err) {
            return new Error("Failed to fetch network.")
        }
    };

    useEffect(() => {
        const handleAccountsChanged = async (accounts: string[]) => {
            if (accounts.length === 0) {
                disconnectMetaMask();
            } else {
                setAccount(accounts[0]);
                await fetchBalance(accounts[0]);
            }
        };

        const handleChainChanged = async () => {
            await fetchNetwork();
        };

        const ethereum = (window as any).ethereum;

        if (ethereum) {
            ethereum.on("accountsChanged", handleAccountsChanged);
            ethereum.on("chainChanged", handleChainChanged);
        }

        return () => {
            if (ethereum) {
                ethereum.removeListener("accountsChanged", handleAccountsChanged);
                ethereum.removeListener("chainChanged", handleChainChanged);
            }
        };
    }, [account]);

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
