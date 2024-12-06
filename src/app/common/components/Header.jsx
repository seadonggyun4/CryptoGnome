"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@/utils/fontAwesome'; // Font Awesome 설정 파일

const Header = () => {
    // 다크 모드 토글 함수
    const toggleDarkMode = () => {
        const htmlElement = document.documentElement;
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
        } else {
            htmlElement.classList.add('dark');
        }
    };

    // 아이콘 정의
    const icons = [
        { icon: 'globe', label: 'Language', onClick: () => console.log('Language') },
        { icon: 'moon', label: 'Dark Mode', onClick: toggleDarkMode },
    ];

    return (
        <header className="bg-light-bg1 text-light-primaryText dark:text-dark-primaryText dark:bg-dark-bg1 flex items-center justify-between px-6">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
                <div className="w-32">
                    <img
                        src="/title.png"
                        alt="Binance Logo"
                        className="w-full h-auto object-contain"
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
                {icons.map(({ icon, label, onClick }) => (
                    <div
                        key={label}
                        className="text-xl flex items-center justify-center w-5 h-5 hover:text-primary transition-colors duration-200 cursor-pointer"
                        aria-label={label}
                        onClick={onClick} // 각 아이콘의 onClick 동작 실행
                    >
                        <FontAwesomeIcon icon={icon} />
                    </div>
                ))}
            </div>
        </header>
    );
}

export default Header;
