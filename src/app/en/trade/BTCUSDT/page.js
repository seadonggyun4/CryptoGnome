import StoreProvider from "@/process/store/queryClientProvider";
// import { TickerSymbolProvider } from "@/features/ticker/provider/TickerSymbolContext";
import { WebSocketProvider } from "@/process/webSocket/provider/WebSocketContext";
import HomeSection from "@/app/en/trade/BTCUSDT/HomeSection";

export default function BTCUSDTPage() {
  return (
      <StoreProvider>
          <WebSocketProvider>
              {/*<TickerSymbolProvider>*/}
                      <HomeSection />
              {/*</TickerSymbolProvider>*/}
          </WebSocketProvider>
      </StoreProvider>
  );
}