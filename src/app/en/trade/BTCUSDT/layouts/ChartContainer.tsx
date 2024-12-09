"use client";

import React from "react";
import { useState, useMemo } from "react";
import Tabs from "@/app/common/elements/Tabs";
import Card from "@/app/common/elements/Card";
import TradingChart from "@/app/en/trade/BTCUSDT/components/TradingChart";
import { TabType } from '@/app/common/types'

const ChartContainer: React.FC = () => {
    // Tabs 데이터 타입 적용
    const tabs:TabType[] = [
        { key: "chart", label: "Chart" },
        { key: "info", label: "Info" },
        { key: "tradingData", label: "Trading Data" },
        { key: "square", label: "Square" },
    ];

    // 현재 활성화된 탭 관리
    const [currentTab, setCurrentTab] = useState<string>(tabs[0].key);

    // 선택된 탭의 콘텐츠 관리
    const tabContent = useMemo(() => {
        switch (currentTab) {
            case "chart":
                return <TradingChart />;
            case "info":
                return (
                    <div className="flex items-center justify-center h-full font-semibold text-primary">
                        Info
                    </div>
                );
            case "tradingData":
                return (
                    <div className="flex items-center justify-center h-full font-semibold text-primary">
                        TradingData
                    </div>
                );
            case "square":
                return (
                    <div className="flex items-center justify-center h-full font-semibold text-primary">
                        Square
                    </div>
                );
            default:
                return null;
        }
    }, [currentTab]);

    return (
        <Card>
            <Tabs activeTab={currentTab} tabs={tabs} onTabChange={setCurrentTab} />
            {tabContent}
        </Card>
    );
};

export default ChartContainer;
