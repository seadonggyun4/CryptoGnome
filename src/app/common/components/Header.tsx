"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useMetaMaskAuth } from "@/auth/metamask/provider/MetaMaskAuthProvider";
// import { useGoogleAuth } from "@/auth/google/provider/GoogleAuthProvider";
import "@/utils/fontAwesome";
import { useToast } from "@/app/common/provider/ToastContext";
import { useEffect } from "react";

const Header = () => {
    const { showToast } = useToast();
    const {
        account,
        isConnected: isMetaMaskConnected,
        balance,
        network,
        connectMetaMask,
        disconnectMetaMask,
        error: metaMaskError,
    } = useMetaMaskAuth();

    // const {
    //     user: googleUser,
    //     login: loginWithGoogle,
    //     logout: logoutGoogle,
    // } = useGoogleAuth();

    const toggleDarkMode = () => {
        const htmlElement = document.documentElement;
        if (htmlElement.classList.contains("dark")) htmlElement.classList.remove("dark");
        else htmlElement.classList.add("dark");
    };

    const icons = [
        { icon: faGlobe, label: "Language", onClick: () => console.log("Language") },
        { icon: faMoon, label: "Dark Mode", onClick: toggleDarkMode },
    ];

    useEffect(() => {
        if (isMetaMaskConnected) {
            showToast("Successfully connected with MetaMask", "success");
        } else if (metaMaskError) {
            showToast(metaMaskError.text, "error");
            if (metaMaskError.type === "MetaMaskNotInstalled") {
                setTimeout(() => {
                    window.open("https://metamask.io/download/", "_blank");
                }, 2000);
            }
        }
    }, [metaMaskError, isMetaMaskConnected]);

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
                        {isMetaMaskConnected && (
                            <>
                                <p>Balance: {balance} ETH</p>
                                <p>Network: {network}</p>
                                <p className="text-sm font-medium text-green-500">
                                    ACCOUNT: {account?.slice(0, 6)}...{account?.slice(-4)}
                                </p>
                            </>
                        )}


                        {/* 버튼 그룹 */}
                        <div className="flex space-x-2">
                            {/*{googleUser ? (*/}
                            {/*    <button*/}
                            {/*        onClick={logoutGoogle}*/}
                            {/*        className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition-colors duration-200"*/}
                            {/*    >*/}
                            {/*        Logout Google*/}
                            {/*    </button>*/}
                            {/*) : (*/}
                            {/*    <button*/}
                            {/*        onClick={loginWithGoogle}*/}
                            {/*        className="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition-colors duration-200"*/}
                            {/*    >*/}
                            {/*        Login with Google*/}
                            {/*    </button>*/}
                            {/*)}*/}

                            <button
                                onClick={
                                    isMetaMaskConnected ? disconnectMetaMask : connectMetaMask
                                }
                                className="px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-primaryHover transition-colors duration-200"
                            >
                                {isMetaMaskConnected ? "LogOut MetaMask" : "LogIn MetaMask"}
                            </button>
                        </div>
                    </div>
                    <ul className="flex items-center space-x-4">
                        {icons.map(({ icon, label, onClick }) => (
                            <li
                                key={label}
                                className="text-xl flex items-center justify-center w-5 h-5 hover:text-primary transition-colors duration-200 cursor-pointer"
                                aria-label={label}
                                onClick={onClick}
                            >
                                <FontAwesomeIcon icon={icon} />
                            </li>
                        ))}
                    </ul>
                </menu>
            </div>
        </header>
    );
};

export default Header;
