import React, { memo } from "react";
import { TabsProps } from "@/common/types";

const Tabs: React.FC<TabsProps> = memo(({ activeTab, tabs, onTabChange }) => {
    const handleTabClick = (key: string) => {
        if (activeTab !== key) {
            onTabChange(key);
        }
    };

    return (
        <div className="flex border-b border-light-line dark:border-dark-line">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    className={`px-4 py-2.5 text-sm font-semibold relative flex flex-col items-center ${
                        activeTab === tab.key
                            ? "text-light-primaryText dark:text-dark-primaryText"
                            : "text-light-iconNormal dark:text-dark-iconNormal"
                    }`}
                    onClick={() => handleTabClick(tab.key)}
                >
                    {tab.label}
                    {activeTab === tab.key && (
                        <span className="absolute bottom-0 w-5 h-1 bg-primary"></span>
                    )}
                </button>
            ))}
        </div>
    );
});

Tabs.displayName = "Tabs";

export default Tabs;
