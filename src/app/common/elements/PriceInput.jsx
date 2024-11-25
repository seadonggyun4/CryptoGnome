import React from "react";

const PriceInput = ({ placeholder = "Price", value, onChange, unit = "USDT" }) => {
    const handleIncrease = () => {
        if (onChange) onChange(value + 1); // Increment value
    };

    const handleDecrease = () => {
        if (onChange) onChange(value - 1); // Decrement value
    };

    return (
        <div className="flex items-center w-full border border-line dark:border-dark-line rounded-md hover:border-primary dark:hover:border-dark-primary focus-within:border-primary focus-within:ring-1 focus-within:ring-primary overflow-hidden transition">
            <div className="text-iconNormal dark:text-dark-iconNormal pl-2">
                {placeholder}
            </div>
            <input
                type="number"
                className="flex-1 bg-transparent text-right px-2 focus:outline-none text-PrimaryText dark:text-dark-PrimaryText font-semibold text-sm no-spinner"
                value={value}
                onChange={(e) => onChange && onChange(parseFloat(e.target.value) || 0)}
            />
            <span className="pr-2 text-iconNormal dark:text-dark-iconNormal">
                {unit}
            </span>
            <div className=" flex flex-col items-center">
                <button
                    type="button"
                    onClick={handleIncrease}
                    className="transition w-10 text-iconNormal dark:text-dark-iconNormal hover:text-PrimaryText dark:hover:text-dark-PrimaryText border border-line dark:border-dark-line"
                >
                    ^
                </button>
                <button
                    type="button"
                    onClick={handleDecrease}
                    className="transition w-10 text-iconNormal dark:text-dark-iconNormal hover:text-PrimaryText dark:hover:text-dark-PrimaryText transform rotate-180 border border-line dark:border-dark-line"
                >
                    ^
                </button>
            </div>
        </div>
    );
};

export default PriceInput;
