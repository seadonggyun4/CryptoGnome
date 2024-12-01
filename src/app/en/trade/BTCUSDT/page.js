import StoreProvider from "@/process/store/queryClientProvider";
import { PriceStatisticsProvider } from "@/app/en/trade/BTCUSDT/provider/PriceStatisticsContext";
import { TradePriceProvider } from "@/app/en/trade/BTCUSDT/provider/TradePriceContext";
import HomeSection from "@/app/en/trade/BTCUSDT/HomeSection";

export default function BTCUSDTPage() {
  return (
      <StoreProvider>
          <PriceStatisticsProvider>
              <TradePriceProvider>
                <HomeSection />
              </TradePriceProvider>
          </PriceStatisticsProvider>
      </StoreProvider>
  );
}