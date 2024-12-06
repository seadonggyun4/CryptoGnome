import StoreProvider from "@/process/store/queryClientProvider";
import { TickerProvider } from "@/features/ticker/provider/TickerContext";
import { WebSocketProvider } from "@/process/webSocket/provider/WebSocketContext";
import HomeSection from "@/app/en/trade/BTCUSDT/HomeSection";

export default function BTCUSDTPage() {
  return (
      <StoreProvider>
          <WebSocketProvider>
              <TickerProvider>
                      <HomeSection />
              </TickerProvider>
          </WebSocketProvider>
      </StoreProvider>
  );
}