import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@/utils/fontAwesome'; // Font Awesome 설정 파일

export default function Header() {
    const navItems = [
        'Buy Crypto',
        'Markets',
        'Trade',
        'Futures',
        'Earn',
        'Square',
        'More',
    ];


    const icons = [
        { icon: 'file-arrow-down', label: 'Help' },
        { icon: 'globe', label: 'Language' },
        { icon: 'clipboard', label: 'Video' },
        { icon: 'gear', label: 'Settings' },
        { icon: 'moon', label: 'Dark Mode' },
    ];

    return (
        <header className="bg-bg1 text-textWhite flex items-center justify-between px-6 dark:bg-dark-bg1 dark:text-dark-textWhite">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
                <div className="w-32">
                    <img
                        src="/title.png"
                        alt="Binance Logo"
                        className="w-full h-auto object-contain"
                    />
                </div>
                <nav className="flex space-x-7 text-sm">
                    {navItems.map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="hover:text-primary transition-colors duration-200 dark:hover:text-dark-primary"
                        >
                            {item}
                        </a>
                    ))}
                </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
                <div
                    key="Search"
                    className="flex items-center justify-center w-5 h-5 text-textWhite hover:text-primary transition-colors duration-200 dark:text-dark-textWhite dark:hover:text-dark-primary cursor-pointer"
                    aria-label="Search"
                >
                    <FontAwesomeIcon icon="search"/>
                </div>
                <button
                    className="text-sm bg-line text-PrimaryText py-2 px-3 rounded-md hover:opacity-80 transition duration-200 dark:bg-dark-line dark:text-dark-PrimaryText">
                    Log In
                </button>
                <button
                    className="text-sm bg-primary text-textBlack py-2 px-3 rounded-md hover:opacity-80 transition duration-200 dark:bg-dark-primary dark:text-dark-textBlack">
                    Sign Up
                </button>
                {icons.map(({icon, label}) => (
                    <div
                        key={label}
                        className="flex items-center justify-center w-5 h-5 text-textWhite hover:text-primary transition-colors duration-200 dark:text-dark-textWhite dark:hover:text-dark-primary cursor-pointer"
                        aria-label={label}
                    >
                        <FontAwesomeIcon icon={icon}/>
                    </div>
                ))}
            </div>
        </header>
    );
}
