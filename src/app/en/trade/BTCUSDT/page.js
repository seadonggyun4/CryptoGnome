import StoreProvider from "@/process/store/queryClientProvider";
import { WebSocketProvider } from "@/process/webSocket/provider/WebSocketContext";
import HomeSection from "@/app/en/trade/BTCUSDT/HomeSection";

export default function BTCUSDTPage() {
  return (
      <StoreProvider>
          <WebSocketProvider>
              <HomeSection />
          </WebSocketProvider>
      </StoreProvider>
  );
}