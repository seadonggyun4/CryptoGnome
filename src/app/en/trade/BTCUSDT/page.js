import ReactQueryProvider from "@/process/store/queryClientProvider";
import { WebSocketProvider } from "@/process/webSocket/provider/WebSocketContext";
import { SymbolProvider } from "@/app/en/trade/BTCUSDT/provider/SymbolContext";
import HomeSection from "@/app/en/trade/BTCUSDT/HomeSection";
import Header from "@/app/common/components/Header";

export default function BTCUSDTPage() {
  return (
    <ReactQueryProvider>
        <SymbolProvider>
          <WebSocketProvider>
              <Header/>
              <HomeSection />
          </WebSocketProvider>
        </SymbolProvider>
    </ReactQueryProvider>
  );
}