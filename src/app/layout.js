import "./globals.css";
import Header from '@/app/common/components/Header';


export const metadata = {
    title: "BTC USDT | Bitcoin to USDT – Binance Spot",
    description: "Trade BTC to USDT and other cryptocurrencies in the world’s largest cryptocurrency exchange. Find real-time live price with technical indicators to help you analyze BTC/USDT changes.",
    keywords: 'Blockchain Crypto Exchange, Cryptocurrency Exchange, Bitcoin Trading, Ethereum price trend, BNB, CZ, BTC price, ETH wallet registration, LTC price, Binance, Poloniex, Bittrex'
};

export default function RootLayout({ children }) {
  return (
      <html lang="en" className="dark">
          <head>
              <link rel="icon" href="/favicon.ico"/>
          </head>
          <body>
              <Header/>
              {children}
          </body>
      </html>
  );
}
