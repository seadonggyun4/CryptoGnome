import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

type UserData = {
    name: string;
    email: string;
    profileImage?: string;
};

type UserInfoMenuProps = {
    userData: UserData | null;
    account: string | null;
    balance: string | null;
    network: string | null;
    onLogout: () => void;
};

const UserInfoMenu: React.FC<UserInfoMenuProps> = ({ userData, account, balance, network, onLogout }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible((prev) => !prev);
    };

    const shortenAccount = (account: string | null) => {
        if (!account) return "N/A";
        return `${account.slice(0, 6)}...${account.slice(-4)}`;
    };

    return (
        <div className="relative inline-block">
            <div
                className="w-10 h-10 rounded-full overflow-hidden cursor-pointer flex items-center justify-center bg-light-bg2 dark:bg-dark-bg2 text-light-iconNormal dark:text-dark-iconNormal"
                onClick={toggleMenu}
            >
                {userData?.profileImage ? (
                    <Image src={userData.profileImage} alt="User" width={100} height={100} className="object-cover" />
                ) : (
                    <FontAwesomeIcon icon={faUser} className="text-2xl" />
                )}
            </div>
            {userData && (
                <div
                    className={`absolute top-12 right-0 bg-light-bg2 dark:bg-dark-bg2 border-2 border-light-line dark:border-dark-line text-light-primaryText dark:text-dark-primaryText shadow-lg rounded-lg list-none p-4 min-w-[350px] z-10 transition-all duration-300 ease-out ${
                        menuVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'
                    }`}
                >
                    <div className="mb-4 w-full flex flex-col items-center justify-center">
                        <strong className="text-bold text-2xl">{userData.name}</strong>
                        <span className=" text-xs text-light-iconNormal dark:text-dark-iconNormal">{userData.email}</span>
                    </div>
                    <p className="py-2 text-xl font-bold text-success">{balance} ETH</p>
                    <p className="py-2">Network: {network}</p>
                    <p className="py-2">Account: {shortenAccount(account)}</p>
                    <div className="flex justify-center items-center mt-4 w-full">
                        <button className="py-2 px-4 bg-error rounded text-white" onClick={onLogout}>Google LogOut</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserInfoMenu;
