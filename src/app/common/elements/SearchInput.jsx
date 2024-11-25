import { useState } from "react";

const SearchInput = ({ placeholder = "Search", onSearch }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (onSearch) onSearch(e.target.value)
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                className="w-full px-4 py-2 text-sm text-PrimaryText dark:text-dark-PrimaryText bg-gray-800 dark:bg-dark-bg border border-line dark:border-dark-line rounded focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary"
            />
            <span className="absolute top-1/2 right-3 transform -translate-y-1/2 text-iconNormal dark:text-dark-iconNormal">
                🔍
            </span>
        </div>
    );
};

export default SearchInput;
