import React, { useState } from "react";

const Mining = () => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        setIsToggled((prev) => !prev);
    };

    return (
        <div className="flex items-center w-full h-full px-10 space-x-10">
            <div className="p-6 w-full bg-gray-100 bg-light-bg1 dark:bg-dark-bg1 shadow-md rounded-md">
                {/* 스위치 토글 */}
                <div className="flex items-center mb-4">
                    <label
                        htmlFor="toggle-mining"
                        className="relative inline-flex items-center cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            id="toggle-mining"
                            className="sr-only"
                            checked={isToggled}
                            onChange={handleToggle}
                        />
                        {/* 배경 */}
                        <div
                            className={`w-14 h-8 rounded-full transition-colors duration-300 ease-in-out hover:bg-primaryHover ${
                                isToggled ? "bg-primary" : "bg-gray-300"
                            }`}
                        ></div>
                        {/* 슬라이더 */}
                        <div
                            className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                                isToggled ? "translate-x-6" : "translate-x-1"
                            }`}
                        ></div>
                    </label>
                    <span className="ml-3 text-light-primaryText dark:text-dark-primaryText font-medium">
                        {isToggled ? "Mining Active" : "Mining Inactive"}
                    </span>
                </div>

                <div
                    className="h-64 overflow-y-auto bg-white p-4 border border-gray-300 rounded-md"
                    style={{ maxHeight: "256px" }}
                >
                </div>
            </div>
        </div>
    );
};

export default Mining;
