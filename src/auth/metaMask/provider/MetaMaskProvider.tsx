"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { NETWORK_MAP } from "@/process/constants";

type MetaMaskContextType = {
    account: string | null;
    balance: string | null;
    network: string | null;
    isMetaMaskInstalled: boolean;
    connectMetaMask: () => void;
    disconnectMetaMask: () => void;
};

const MetaMaskContext = createContext<MetaMaskContextType | undefined>(undefined);

export const MetaMaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [account, setAccount] = useState<string | null>(null);
    const [balance, setBalance] = useState<string | null>(null);
    const [network, setNetwork] = useState<string | null>(null);
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);


    const connectMetaMask = async () => {
        if (typeof window === "undefined") return;

        try {
            const ethereum = (window as any).ethereum;

            setIsMetaMaskInstalled(Boolean(ethereum));
            if(!ethereum) return;

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]);

            const balanceInWei = await ethereum.request({ method: "eth_getBalance", params: [accounts[0], "latest"] });
            setBalance((parseInt(balanceInWei, 16) / 10 ** 18).toFixed(4));

            const chainId = await ethereum.request({ method: "eth_chainId" });
            setNetwork(NETWORK_MAP[chainId] || `Unknown Network (${chainId})`);
        } catch (err) {
            console.error("MetaMask connection failed");
        }
    };

    const disconnectMetaMask = () => {
        setAccount(null);
        setBalance(null);
        setNetwork(null);
    }

    // 지갑 & 네트워크 변경시 패치
    useEffect(() => {
        const handleAccountsChanged = async (accounts: string[]) => {
            if (accounts.length === 0) {
                // 사용자가 계정을 연결 해제한 경우
                disconnectMetaMask()
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
        <MetaMaskContext.Provider value={{ account, balance, network, isMetaMaskInstalled, connectMetaMask, disconnectMetaMask }}>
            {children}
        </MetaMaskContext.Provider>
);
};

export const useMetaMask = (): MetaMaskContextType => {
    const context = useContext(MetaMaskContext);
    if (!context) {
        throw new Error("useMetaMask must be used within a MetaMaskProvider");
    }
    return context;
};
