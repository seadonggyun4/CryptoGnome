"use client";

import { useState, useMemo } from "react";
import Tabs from "@/app/common/elements/Tabs";
import Card from "@/app/common/elements/Card";
import TradingChart from "@/app/en/trade/BTCUSDT/elements/TradingChart";

const ChartContainer = () => {
    const tabs = [
        { key: "chart", label: "Chart" },
        { key: "info", label: "Info" },
        { key: "tradingData", label: "Trading Data" },
        { key: "square", label: "Square" },
    ];

    const [currentTab, setCurrentTab] = useState(tabs[0].key);


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
