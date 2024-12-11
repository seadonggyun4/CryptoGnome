"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useMetaMaskAuth } from "@/auth/provider/MetaMaskAuthProvider";
import {MAX_WIDTH} from "@/process/constants";
import "@/utils/fontAwesome";

const Header = () => {
    const { account, isConnected, connectMetaMask, error } = useMetaMaskAuth();

    const toggleDarkMode = () => {
        const htmlElement = document.documentElement;
        if (htmlElement.classList.contains("dark")) htmlElement.classList.remove("dark");
        else htmlElement.classList.add("dark");
    };

    const icons = [
        { icon: faGlobe, label: "Language", onClick: () => console.log("Language") },
        { icon: faMoon, label: "Dark Mode", onClick: toggleDarkMode },
    ];

    return (
        <header className="flex justify-center relative bg-light-bg1 text-light-primaryText dark:text-dark-primaryText dark:bg-dark-bg1  ">
            <div className={`flex items-center justify-between py-4 max-w-[${MAX_WIDTH}px] w-full`}>
                {/*왼쪽 영역*/}
                <div className="flex items-center space-x-4">
                    <h1 className="logo flex items-end text-primary font-extrabold text-2xl">
                        Crypto<span className="pl-1 text-base text-light-primaryText dark:text-dark-primaryText">Gnome</span>
                    </h1>
                </div>
                {/*오른쪽 영역*/}
                <menu className="flex items-center space-x-4">
                    <div>
                        {isConnected ? (
                            <p className="text-sm font-medium text-green-500">
                                ACCOUNT: {account?.slice(0, 6)}...{account?.slice(-4)}
                            </p>
                        ) : (
                            <button
                                onClick={connectMetaMask}
                                className="px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-primaryHover transition-colors duration-200"
                            >
                                LogIn
                            </button>
                        )}
                        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
                    </div>
                    <ul className="flex items-center space-x-4">
                        {icons.map(({icon, label, onClick}) => (
                            <li
                                key={label}
                                className="text-xl flex items-center justify-center w-5 h-5 hover:text-primary transition-colors duration-200 cursor-pointer"
                                aria-label={label}
                                onClick={onClick}
                            >
                                <FontAwesomeIcon icon={icon}/>
                            </li>
                        ))}
                    </ul>
                </menu>
            </div>

        </header>
    );
};

export default Header;
