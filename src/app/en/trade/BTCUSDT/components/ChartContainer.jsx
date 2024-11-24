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
                return <div>Info Content</div>;
            case "tradingData":
                return <div>Trading Data Content</div>;
            case "square":
                return <div>Square Content</div>;
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
