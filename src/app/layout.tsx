import "./globals.css";
import { ReactNode } from "react";

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
        </head>
        <body className="bg-light-bg dark:bg-dark-bg">
        {children}
        </body>
        </html>
    );
}
