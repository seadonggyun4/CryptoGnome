import Card from "@/app/common/elements/Card";
import PriceStatistics from "@/app/en/trade/BTCUSDT/components/PriceStatistics";
import StoreProvider from "@/process/store/queryClientProvider";
import { PriceStatisticsProvider } from "@/features/priceStatistics/provider/PriceStatisticsContext";
import OrderBook from "@/app/en/trade/BTCUSDT/components/OrderBook";
import ChartContainer from "@/app/en/trade/BTCUSDT/components/ChartContainer";
import TradingForm from "@/app/en/trade/BTCUSDT/components/TradingForm";

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
                                  <div className="w-96">
                                      <OrderBook/>
                                  </div>


                                  {/* 오른쪽 Chart + Spot */}
                                  <div className="flex flex-col gap-1 w-full">
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
                                  <h3 className="text-md font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">
                                      USDT
                                  </h3>
                              </Card>
                              <Card>
                                  <h3 className="text-md font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">
                                      MarketTrandes
                                  </h3>
                              </Card>
                              <Card>
                                  <h3 className="text-md font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">
                                      topMovers
                                  </h3>
                              </Card>
                          </div>
                      </div>

                      <div className="h-80 mb-1">
                          <Card>
                              <h3 className="text-md font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">
                                  openOder
                              </h3>
                          </Card>
                      </div>
                  </div>
              </section>
          </PriceStatisticsProvider>
      </StoreProvider>
  );
}