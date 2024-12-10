"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faMoon } from "@fortawesome/free-solid-svg-icons"; // 아이콘 임포트
import Image from "next/image"; // Next.js Image 컴포넌트
import "@/utils/fontAwesome"; // Font Awesome 설정 파일

const Header = () => {
    // 다크 모드 토글 함수
    const toggleDarkMode = () => {
        const htmlElement = document.documentElement;
        if (htmlElement.classList.contains("dark")) htmlElement.classList.remove("dark")
        else htmlElement.classList.add("dark");
    };

    const icons = [
        { icon: faGlobe, label: "Language", onClick: () => console.log("Language") },
        { icon: faMoon, label: "Dark Mode", onClick: toggleDarkMode },
    ];

    return (
        <header className="relative bg-light-bg1 text-light-primaryText dark:text-dark-primaryText dark:bg-dark-bg1 flex items-center justify-between px-6">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
                <div className="w-32">
                    <Image
                        src="/title.png"
                        alt="Binance Logo"
                        width={128} // 이미지의 가로 크기
                        height={32} // 이미지의 세로 크기
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
                        onClick={onClick}
                    >
                        <FontAwesomeIcon icon={icon} />
                    </div>
                ))}
            </div>
        </header>
    );
};

export default Header;
