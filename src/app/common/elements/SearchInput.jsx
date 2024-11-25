import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@/utils/fontAwesome";

const SearchInput = ({ placeholder = "Search", inputValue, onSearch, onFocus, onBlur }) => {
    const handleInputChange = (e) => {
        if (onSearch) onSearch(e.target.value);
    };

    return (
        <div className="relative w-full">
            {/* 왼쪽 아이콘 */}
            <div className="flex items-center justify-center w-5 h-5 absolute top-1/2 left-3 transform -translate-y-1/2 text-iconNormal dark:text-dark-iconNormal">
                <FontAwesomeIcon icon="search" />
            </div>
            {/* 입력 필드 */}
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={placeholder}
                onFocus={onFocus} // 포커스 이벤트 전달
                onBlur={onBlur}   // 블러 이벤트 전달
                className="w-full pl-10 pr-4 py-2 text-PrimaryText dark:text-dark-PrimaryText bg-bg1 dark:bg-dark-bg1 border border-line dark:border-dark-line rounded-xl focus:outline-none focus:ring-1 focus:ring-primary dark:focus:ring-dark-primary"
            />
        </div>
    );
};

export default SearchInput;
