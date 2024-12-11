"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { NETWORK_MAP } from "@/process/constants";

type MetaMaskAuthError = {
    type: string; // 에러 타입
    text: string; // 에러 메시지
};

type MetaMaskAuthContextType = {
    account: string | null;
    balance: string | null;
    network: string | null;
    isConnected: boolean;
    connectMetaMask: () => void;
    disconnectMetaMask: () => void;
    error: MetaMaskAuthError | null;
};

const MetaMaskAuthContext = createContext<MetaMaskAuthContextType | undefined>(undefined);

export const MetaMaskAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [account, setAccount] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [network, setNetwork] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<MetaMaskAuthError | null>(null);

    // MetaMask 연결 함수
    const connectMetaMask = async () => {
        if (!(window as any).ethereum) {
            setError({
                type: "MetaMaskNotInstalled",
                text: "MetaMask is not installed.",
            });
            return;
        }

        try {
            const ethereum = (window as any).ethereum;
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccount(accounts[0]);
            setIsConnected(true);
            setError(null); // 에러 초기화

            // 잔액 및 네트워크 정보 가져오기
            await fetchBalance(accounts[0]);
            await fetchNetwork();
        } catch (err: any) {
            setError({
                type: "ConnectionError",
                text: err.message || "MetaMask connection failed",
            });
        }
    };

    // MetaMask 연결 해제 함수
    const disconnectMetaMask = () => {
        setAccount(null);
        setBalance(null);
        setNetwork(null);
        setIsConnected(false);
        setError(null);
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
            setError({
                type: "FetchBalanceError",
                text: "Failed to fetch balance.",
            });
        }
    };

    // 네트워크 정보 가져오기
    const fetchNetwork = async () => {
        try {
            const ethereum = (window as any).ethereum;
            const chainId = await ethereum.request({ method: "eth_chainId" });

            setNetwork(NETWORK_MAP[chainId] || `Unknown Network (${chainId})`);
        } catch (err) {
            setError({
                type: "FetchNetworkError",
                text: "Failed to fetch network.",
            });
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
        <MetaMaskAuthContext.Provider
            value={{
                account,
                balance,
                network,
                isConnected,
                connectMetaMask,
                disconnectMetaMask,
                error,
            }}
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
