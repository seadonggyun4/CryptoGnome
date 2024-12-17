"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useGoogleAuth } from "@/auth/google/provider/GoogleAuthProvider";
import "@/utils/fontAwesome";
import { useToast } from "@/app/common/provider/ToastContext";
import GoogleLoginButton from "@/app/common/elements/GoogleLoginButton";
import UserInfoMenu from "@/app/common/elements/UserInfoMenu";
import Image from "next/image";
import React from "react";

const Header = () => {
    const { showToast } = useToast();
    const {
        user: googleUser,
        login: loginWithGoogle,
        logout: logoutGoogle,
        account,
        balance,
        network,
        isMetaMaskInstalled,
    } = useGoogleAuth();

    const toggleDarkMode = () => {
        const htmlElement = document.documentElement;
        if (htmlElement.classList.contains("dark")) htmlElement.classList.remove("dark");
        else htmlElement.classList.add("dark");
    };


    const icons = [
        { icon: faGlobe, label: "Language", onClick: () => console.log("Language") },
        { icon: faMoon, label: "Dark Mode", onClick: toggleDarkMode },
    ];

    const moveToInstallMetaMask = () => {
        window.open("https://metamask.io/download/", "_blank");
    }

    return (
        <header className="flex justify-center relative bg-light-bg1 text-light-primaryText dark:text-dark-primaryText dark:bg-dark-bg1">
            <div className={`flex items-center justify-between py-4 max-w-[100rem] w-full`}>
                {/* 왼쪽 영역 */}
                <div className="flex items-center space-x-4">
                    <h1 className="logo flex items-end text-primary font-extrabold text-2xl">
                        Crypto
                        <span className="pl-1 text-base text-light-primaryText dark:text-dark-primaryText">
                            Gnome
                        </span>
                    </h1>
                </div>

                {/* 오른쪽 영역 */}
                <menu className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                        {/* MetaMask 상태 */}
                        {isMetaMaskInstalled && <UserInfoMenu userData={googleUser} account={account} balance={balance} network={network} onLogout={logoutGoogle} />}
                        {/* 버튼 그룹 */}
                        <div className="flex space-x-2">
                            {
                                !googleUser && <GoogleLoginButton text="Google&nbsp;Login" onClick={loginWithGoogle}/>
                            }
                            {googleUser && !isMetaMaskInstalled && (
                                <button
                                    className="flex items-center px-7 py-2 bg-info text-white rounded-md
                                     hover:shadow-[4px_4px_12px_rgb(0,138,255)] transition-all duration-300"
                                    onClick={moveToInstallMetaMask}
                                >
                                    <Image
                                        className="mr-2 object-contain"
                                        src="/assets/img/metaMaskIcon.png"
                                        alt="metaMask"
                                        width={24}
                                        height={24}
                                    />
                                    install MetaMask
                                </button>
                            )}
                        </div>
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
