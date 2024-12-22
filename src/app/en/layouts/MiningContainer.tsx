"use client";

import { useState, useMemo } from "react";
import Tabs from "@/common/elements/Tabs";
import Card from "@/common/elements/Card";
import { TabType } from '@/common/types'
import Mining from "@/app/en/components/Mining";

const MiningContainer = () => {
    const tabs:TabType[] = [
        { key: "Mining", label: "Mining" },
        { key: "ChartOfMining", label: "Chart of Mining" },
    ];

    const [activeTab, setActiveTab] = useState(tabs[0].key); // 기본 탭 설정: Spot

    const tabContent = useMemo(() => {
        switch (activeTab) {
            case "Mining":
                return (
                    <Mining />
                );
            case "ChartOfMining":
                return (
                    <div className="flex items-center justify-center h-full font-semibold text-primary">
                        Chart of Mining
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

export default MiningContainer;
