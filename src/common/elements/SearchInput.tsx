import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@/utils/fontAwesome";
import React from "react";

interface SearchInputProps {
    placeholder?: string; // 검색 입력창의 기본 텍스트
    inputValue: string; // 현재 입력값
    onSearch?: (value: string) => void; // 검색 이벤트 핸들러
    onFocus?: () => void; // 포커스 이벤트 핸들러
    onBlur?: () => void; // 블러 이벤트 핸들러
}

const SearchInput: React.FC<SearchInputProps> = ({
         placeholder = "Search",
         inputValue,
         onSearch,
         onFocus,
         onBlur,
     }) => {
    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (onSearch) onSearch(e.target.value);
    };

    return (
        <div className="relative w-full">
            {/* 왼쪽 아이콘 */}
            <div className="flex items-center justify-center w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-light-iconNormal dark:text-dark-iconNormal">
                <FontAwesomeIcon icon="search" />
            </div>
            {/* 입력 필드 */}
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                onFocus={onFocus}
                onBlur={onBlur}
                className="w-full pl-10 pr-4 py-2 text-light-primaryText dark:text-dark-primaryText bg-light-bg1 dark:bg-dark-bg1 border border-light-line dark:border-dark-line rounded-xl focus:outline-none focus:ring-1 focus:ring-primary"
            />
        </div>
    );
};

export default SearchInput;
