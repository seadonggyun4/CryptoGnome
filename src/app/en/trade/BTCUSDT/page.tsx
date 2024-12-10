import ReactQueryProvider from "@/process/store/queryClientProvider";
import { WebSocketProvider } from "@/process/webSocket/provider/WebSocketContext";
import { TradingContextProvider } from "@/app/en/trade/BTCUSDT/provider/TradingContext";
import { ToastProvider } from "@/app/common/provider/ToastContext";
import HomeSection from "@/app/en/trade/BTCUSDT/HomeSection";
import Header from "@/app/common/components/Header";
import VideoBg from "@/app/common/components/VideoBg";

export default function BTCUSDTPage() {
  return (
    <ReactQueryProvider>
        <ToastProvider>
            <TradingContextProvider>
                <WebSocketProvider>
                    <VideoBg/>
                    <Header/>
                    <HomeSection/>
                </WebSocketProvider>
            </TradingContextProvider>
        </ToastProvider>
    </ReactQueryProvider>
  );
}