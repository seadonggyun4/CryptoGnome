import { ReactNode } from "react";
import "./style/globals.css";
import './style/custom.css';

export const metadata = {
    title: "Crypto Gnome",
    description: "Trade BTC to USDT and other cryptocurrencies in the world’s largest cryptocurrency exchange. Find real-time live price with technical indicators to help you analyze BTC/USDT changes.",
    keywords: 'Blockchain Crypto Exchange, Cryptocurrency Exchange, Bitcoin Trading, Ethereum price trend, BNB, CZ, BTC price, ETH wallet registration, LTC price, Binance, Poloniex, Bittrex'
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className="dark">
        <head>
            <link rel="icon" href="/favicon.ico"/>
            {/* Google API를 정적으로 로드 */}
            <script
                src="https://accounts.google.com/gsi/client"
                async
                defer
            />
        </head>
        <body className="bg-light-bg dark:bg-dark-bg">
        {children}
        </body>
        </html>
    );
}
