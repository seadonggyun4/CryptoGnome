import Card from "@/app/common/elements/Card";

export default function BTCUSDTPage() {
  return (
      <section className="h-full bg-black ">
          <div className="mx-auto max-w-[1280px] h-full max-h-[1500px] px-4 lg:px-0 py-1">
              <div className="flex h-screen gap-1 mb-1">
                  {/* 왼쪽 큰 영역 */}
                  <div className="flex flex-col gap-1 h-full w-full">
                      {/* 상단 영역 */}
                      <div className="h-14">
                          <Card>
                              <h3 className="text-md font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">
                                  BTC/USDT
                              </h3>
                          </Card>
                      </div>


                      {/* 메인 콘텐츠 영역 */}
                      <div className="flex-1 flex gap-1">
                          {/* 왼쪽 Order Book */}
                          <div className="w-80">
                              <Card>
                                  <h3 className="text-md font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">
                                      Order Book
                                  </h3>
                              </Card>
                          </div>


                          {/* 오른쪽 Chart + Spot */}
                          <div className="flex flex-col gap-1 w-full">
                              {/* Chart */}
                              <Card>
                                  <h3 className="text-md font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">Chart</h3>
                              </Card>

                              {/* Spot (Order Form) */}
                              <Card>
                                  <h3 className="text-md font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">Spot</h3>
                              </Card>
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
  );
}