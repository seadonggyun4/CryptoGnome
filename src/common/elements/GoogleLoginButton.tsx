import React from 'react';
import Image from "next/image";

type GoogleLoginButtonProps = {
    text: string;
    onClick: () => void;
};

const GoogleLoginButton: React.FC<GoogleLoginButtonProps> = ({ text, onClick }) => {
    return (
        <button className="
                flex items-center
                px-7 py-2 rounded-lg
                bg-dark-bg2
                text-dark-primaryText
                dark:bg-light-bg2
                dark:text-light-primaryText text-sm
                font-semibold leading-6
                transition-all duration-300
                hover:shadow-[4px_4px_12px_rgba(252,213,53,0.5)]"
                onClick={onClick}
        >
            <Image
                className="mr-2 object-contain"
                src="/assets/img/googleIcon.png"
                alt="google"
                width={24}
                height={24}
            />
            {text}
        </button>
    );
};

export default GoogleLoginButton;
