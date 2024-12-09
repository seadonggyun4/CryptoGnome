import ReactQueryProvider from "@/process/store/queryClientProvider";
import { WebSocketProvider } from "@/process/webSocket/provider/WebSocketContext";
import { TradingContextProvider } from "@/app/en/trade/BTCUSDT/provider/TradingContext";
import { ToastProvider } from "@/app/common/provider/ToastContext";
import HomeSection from "@/app/en/trade/BTCUSDT/HomeSection";
import Header from "@/app/common/components/Header";

export default function BTCUSDTPage() {
  return (
    <ReactQueryProvider>
        <ToastProvider>
            <TradingContextProvider>
              <WebSocketProvider>
                      <Header/>
                      <HomeSection />
              </WebSocketProvider>
            </TradingContextProvider>
        </ToastProvider>
    </ReactQueryProvider>
  );
}