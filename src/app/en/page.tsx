import ReactQueryProvider from "@/process/store/queryClientProvider";
import { WebSocketProvider } from "@/process/webSocket/provider/WebSocketContext";
import { TradingContextProvider } from "@/app/en/provider/TradingContext";
import { ToastProvider } from "@/common/provider/ToastContext";
import { GoogleAuthProvider } from "@/auth/google/provider/GoogleAuthProvider";
import { MetaMaskProvider } from "@/auth/metaMask/provider/MetaMaskProvider";
import HomeSection from "@/app/en/HomeSection";
import Header from "@/common/components/Header";
import VideoBg from "@/common/components/VideoBg";

export default function BTCUSDTPage() {
  return (
    <ReactQueryProvider>
        <ToastProvider>
            <MetaMaskProvider>
                <GoogleAuthProvider>
                    <TradingContextProvider>
                        <WebSocketProvider>
                            <VideoBg/>
                            <Header/>
                            <HomeSection/>
                        </WebSocketProvider>
                    </TradingContextProvider>
                </GoogleAuthProvider>
            </MetaMaskProvider>
        </ToastProvider>
    </ReactQueryProvider>
  );
}