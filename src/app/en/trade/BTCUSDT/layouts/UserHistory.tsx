"use client";

import Card from "@/app/common/elements/Card";
import Tabs from "@/app/common/elements/Tabs";
import {useMemo, useState} from "react";
import { Tab } from '@/app/common/types'


const UserHistory = () => {
    const tabs:Tab[] = [
        { key: "openOders", label: `Open Oders(${0})` },
        { key: "orderHistory", label: "Order History" },
        { key: "tradHistory", label: "Trad History" },
        { key: "funds", label: "fFunds" },
        { key: "gridOrders", label: "Grid Orders" },
    ];

    const [currentTab, setCurrentTab] = useState(tabs[0].key);

    const tabContent = useMemo(() => {
        switch (currentTab) {
            case "openOders":
                return (
                    <div className="flex items-center justify-center h-full text-primaryText dark:text-dark-primaryText">
                        <span className="mr-2 text-primary">Log In</span> or <span className="ml-2 text-primary">Register</span> Now to trade
                    </div>
                );
            case "orderHistory":
                return (
                    <div className="flex items-center justify-center h-full text-primaryText dark:text-dark-primaryText">
                        <span className="mr-2 text-primary">Log In</span> or <span className="ml-2 text-primary">Register</span> Now to trade
                    </div>
                );
            case "tradHistory":
                return (
                    <div className="flex items-center justify-center h-full text-primaryText dark:text-dark-primaryText">
                        <span className="mr-2 text-primary">Log In</span> or <span className="ml-2 text-primary">Register</span> Now to trade
                    </div>
                );
            case "funds":
                return (
                    <div className="flex items-center justify-center h-full text-primaryText dark:text-dark-primaryText">
                        <span className="mr-2 text-primary">Log In</span> or <span className="ml-2 text-primary">Register</span> Now to trade
                    </div>
                );
            case "gridOrders":
                return (
                    <div className="flex items-center justify-center h-full text-primaryText dark:text-dark-primaryText">
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
            {tabContent}
        </Card>
    )
}

export default UserHistory;