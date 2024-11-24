import Card from "@/app/common/elements/Card";
import PriceStatistics from "@/app/en/trade/BTCUSDT/components/PriceStatistics";
import StoreProvider from "@/process/store/queryClientProvider";
import { PriceStatisticsProvider } from "@/features/priceStatistics/provider/PriceStatisticsContext";
import OrderBook from "@/app/en/trade/BTCUSDT/components/OrderBook";
import ChartContainer from "@/app/en/trade/BTCUSDT/components/ChartContainer";
import TradingForm from "@/app/en/trade/BTCUSDT/components/TradingForm";
import UserHistory from "@/app/en/trade/BTCUSDT/components/UserHistory";
import TradeAside from "@/app/en/trade/BTCUSDT/components/TradeAside";

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
                                  <PriceStatistics/>
                              </div>


                              {/* 메인 콘텐츠 영역 */}
                              <div className="flex-1 flex gap-1">
                                  {/* Order Book */}
                                  <div className="w-80">
                                      <OrderBook/>
                                  </div>


                                  {/* 오른쪽 Chart + Spot */}
                                  <div className="flex-1 flex flex-col gap-1">
                                      {/* Chart */}
                                      <ChartContainer />

                                      {/* tradingForm */}
                                      <TradingForm />
                                  </div>
                              </div>
                          </div>

                          {/* 오른쪽 작은 영역 */}
                          <div className="flex flex-col gap-1 h-full w-96">
                              <Card>
                                  <div className="min-h-96">
                                      <h3 className="flex items-center justify-center text-md font-semibold text-textPrimary dark:text-dark-textPrimary">
                                          USDT
                                      </h3>
                                  </div>
                              </Card>
                              <TradeAside/>
                              <div className="flex-1">
                                  <Card>
                                      <h3 className="text-md font-semibold text-textPrimary dark:text-dark-textPrimary">
                                          topMovers
                                      </h3>
                                  </Card>
                              </div>
                          </div>
                      </div>

                      <div className="h-80 mb-1">
                          <UserHistory />
                      </div>
                  </div>
              </section>
          </PriceStatisticsProvider>
      </StoreProvider>
  );
}