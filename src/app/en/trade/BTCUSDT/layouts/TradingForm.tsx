"use client";

import { useState, useMemo } from "react";
import Tabs from "@/app/common/elements/Tabs";
import Card from "@/app/common/elements/Card";
import { TabType } from '@/app/common/types'

const TradingForm = () => {
    const tabs:TabType[] = [
        { key: "Spot", label: "Spot" },
        { key: "Cross", label: "Cross" },
        { key: "Isolated", label: "Isolated" },
        { key: "Grid", label: "Grid" },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].key); // 기본 탭 설정: Spot

    const tabContent = useMemo(() => {
        switch (activeTab) {
            case "Spot":
                return (
                    <div className="flex items-center justify-center h-full font-semibold text-primary">
                        Spot
                    </div>
                );
            case "Cross":
                return (
                    <div className="flex items-center justify-center h-full font-semibold text-primary">
                        Cross Trading Form
                    </div>
                );
            case "Isolated":
                return (
                    <div className="flex items-center justify-center h-full font-semibold text-primary">
                        Isolated Trading Form
                    </div>
                );
            case "Grid":
                return (
                    <div className="flex items-center justify-center h-full font-semibold text-primary">
                        Grid Trading Form
                    </div>
                );
            default:
                return null;
        }
    }, [activeTab]);

    return (
        <Card>
            <Tabs activeTab={activeTab} tabs={tabs} onTabChange={setActiveTab} />
            {tabContent}
        </Card>
    );
};

export default TradingForm;
