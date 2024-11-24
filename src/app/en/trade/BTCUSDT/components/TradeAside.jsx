"use client";

import Card from "@/app/common/elements/Card";
import Tabs from "@/app/common/elements/Tabs";
import {useMemo, useState} from "react";

export default function TradeAside() {
    const tabs = [
        { key: "marketTrades", label: "Market Trades" },
        { key: "myTrades", label: "My Trades" },
    ];

    const [currentTab, setCurrentTab] = useState(tabs[0].key);

    const tabContent = useMemo(() => {
        switch (currentTab) {
            case "marketTrades":
                return (
                    <div className="flex items-center justify-center h-full text-PrimaryText dark:text-dark-PrimaryText">
                        <span className="mr-2 text-primary">Log In</span> or <span className="ml-2 text-primary">Register</span> Now to trade
                    </div>
                );
            case "myTrades":
                return (
                    <div className="flex items-center justify-center h-full text-PrimaryText dark:text-dark-PrimaryText">
                        <span className="mr-2 text-primary">Log In</span> or <span className="ml-2 text-primary">Register</span> Now to trade
                    </div>
                );
            default:
                return null;
        }
    }, [currentTab]);


    return(
        <Card>
            <Tabs activeTab={currentTab} tabs={tabs} onTabChange={setCurrentTab} />
            <div className="h-96">
                {tabContent}
            </div>
        </Card>
    )
}