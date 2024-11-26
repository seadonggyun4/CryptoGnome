import React, { memo } from "react";

const Tabs = memo(({ activeTab, tabs, onTabChange }) => {
    const handleTabClick = (key) => {
        if (activeTab !== key) {
            onTabChange(key);
        }
    };

    return (
        <div className="flex border-b border-line dark:border-dark-line">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    className={`px-4 py-2.5 text-sm font-semibold relative flex flex-col items-center ${
                        activeTab === tab.key
                            ? "text-PrimaryText dark:text-dark-PrimaryText"
                            : "text-iconNormal dark:text-dark-iconNormal"
                    }`}
                    onClick={() => handleTabClick(tab.key)}
                >
                    {tab.label}
                    {activeTab === tab.key && (
                        <span className="absolute bottom-0 w-5 h-1 bg-primary dark:bg-dark-primary"></span>
                    )}
                </button>
            ))}
        </div>
    );
});

Tabs.displayName = "Tabs";

export default Tabs;
