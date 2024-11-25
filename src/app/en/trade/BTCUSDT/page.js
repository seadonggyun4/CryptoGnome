import Card from "@/app/common/elements/Card";
import PriceStatistics from "@/app/en/trade/BTCUSDT/layouts/PriceStatistics";
import StoreProvider from "@/process/store/queryClientProvider";
import { PriceStatisticsProvider } from "@/features/priceStatistics/provider/PriceStatisticsContext";
import OrderBook from "@/app/en/trade/BTCUSDT/layouts/OrderBook";
import ChartContainer from "@/app/en/trade/BTCUSDT/layouts/ChartContainer";
import TradingForm from "@/app/en/trade/BTCUSDT/layouts/TradingForm";
import UserHistory from "@/app/en/trade/BTCUSDT/layouts/UserHistory";
import TradeAside from "@/app/en/trade/BTCUSDT/layouts/TradeAside";
import TopMovers from "@/app/en/trade/BTCUSDT/layouts/TopMovers";
import CoinList from "@/app/en/trade/BTCUSDT/layouts/CoinList";

export default function BTCUSDTPage() {
  return (
      <StoreProvider>
          <PriceStatisticsProvider>
              <section>
                  <div className="mx-auto max-w-[1528px] h-full px-4 lg:px-0 py-1">
                      <div className="flex h-full gap-1 mb-1">
                          {/* 왼쪽 큰 영역 */}
                          <div className="flex flex-col gap-1 h-full w-full">
                              <div>
                                  {/*<PriceStatistics/>*/}
                              </div>


                              {/* 메인 콘텐츠 영역 */}
                              <div className="flex-1 flex gap-1">
                                  {/* Order Book */}
                                  <div className="w-80">
                                      {/*<OrderBook/>*/}
                                  </div>


                                  {/* 오른쪽 Chart + Spot */}
                                  <div className="flex-1 flex flex-col gap-1">
                                      {/* Chart */}
                                      {/*<ChartContainer />*/}

                                      {/* tradingForm */}
                                      {/*<TradingForm />*/}
                                  </div>
                              </div>
                          </div>

                          {/* 오른쪽 aside 영역 */}
                          <aside className="flex flex-col gap-1 h-full w-96">
                              <CoinList />
                              {/*<TradeAside/>*/}
                              {/*<TopMovers />*/}
                          </aside>
                      </div>

                      <div className="h-80 mb-1">
                          {/*<UserHistory />*/}
                      </div>
                  </div>
              </section>
          </PriceStatisticsProvider>
      </StoreProvider>
  );
}