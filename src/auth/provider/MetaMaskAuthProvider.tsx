"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type MetaMaskAuthContextType = {
    account: string | null;
    isConnected: boolean;
    connectMetaMask: () => void;
    error: string | null;
};

const MetaMaskAuthContext = createContext<MetaMaskAuthContextType | undefined>(undefined);

export const MetaMaskAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [account, setAccount] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const connectMetaMask = async () => {
        if (!(window as any).ethereum) {
            setError("MetaMask가 설치되어 있지 않습니다.");
            return;
        }

        try {
            const accounts = await (window as any).ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccount(accounts[0]);
            setIsConnected(true);
            setError(null);
        } catch (err: any) {
            setError(err.message || "MetaMask 연결 실패");
        }
    };

    useEffect(() => {
        const handleAccountsChanged = (accounts: string[]) => {
            if (accounts.length === 0) {
                setAccount(null);
                setIsConnected(false);
            } else {
                setAccount(accounts[0]);
            }
        };

        const ethereum = (window as any).ethereum;

        if (ethereum) {
            ethereum.on("accountsChanged", handleAccountsChanged);
        }

        return () => {
            if (ethereum) {
                ethereum.removeListener("accountsChanged", handleAccountsChanged);
            }
        };
    }, []);

    return (
        <MetaMaskAuthContext.Provider
            value={{ account, isConnected, connectMetaMask, error }}
        >
            {children}
        </MetaMaskAuthContext.Provider>
    );
};

export const useMetaMaskAuth = (): MetaMaskAuthContextType => {
    const context = useContext(MetaMaskAuthContext);
    if (!context) {
        throw new Error("useMetaMaskAuth must be used within a MetaMaskAuthProvider");
    }
    return context;
};
