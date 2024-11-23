import Card from "@/app/common/elements/Card";

export default function BTCUSDTPage() {
  return (
      <section className="bg-black ">
          <div className="mx-auto max-w-[1528px] h-full px-4 lg:px-0 py-1">
              <div className="flex h-screen gap-1 mb-1">
                  {/* 왼쪽 큰 영역 */}
                  <div className="flex flex-col gap-1 h-full w-full">
                      {/* 상단 영역 */}
                      <div>
                          <Card>
                              <div className="flex items-center py-2 px-4 space-x-6">
                                  {/* 왼쪽 영역: 타이틀과 설명 */}
                                  <div className="flex items-center space-x-3">
                                      <div className="flex justify-center items-center border-2 border-line dark:border-dark-line cursor-pointer w-6 h-6 p-3 rounded-md">
                                          <span className="text-DisabledText dark:text-dark-DisabledText">★</span>
                                      </div>
                                      <div className="flex flex-col">
                                      <div
                                              className="text-lg font-semibold text-textPrimary dark:text-dark-textPrimary">
                                              BTC/USDT
                                          </div>
                                          <p className="text-sm text-textSecondary dark:text-dark-textSecondary">
                                              Bitcoin Price
                                          </p>
                                      </div>
                                  </div>
                                  {/* 오른쪽 영역: 가격, 변화량, 기타 데이터 */}
                                  <div className="flex items-center space-x-6">
                                      <div className="flex flex-col">
                                            <span className="text-lg font-semibold text-error dark:text-dark-error">
                                                98,695.00
                                            </span>
                                            <span className="text-sm text-error dark:text-dark-error">
                                                $269.41 (-0.27%)
                                            </span>
                                      </div>
                                      <ul
                                          className="flex text-sm text-textSecondary dark:text-dark-textSecondary space-x-10">
                                          <li className="flex flex-col">
                                              <span>24h High</span>
                                              <p className="text-PrimaryText dark:text-dark-PrimaryText font-semibold">99,588.01</p>
                                          </li>
                                          <li>
                                              <span>24h Low</span>
                                              <p className="text-PrimaryText dark:text-dark-PrimaryText font-semibold">97,122.11</p>
                                          </li>
                                          <li>
                                              <span>24h Volume(BTC)</span>
                                              <p className="text-PrimaryText dark:text-dark-PrimaryText font-semibold">41,258.98</p>
                                          </li>
                                          <li>
                                              <span>24h Volume(USDT)</span>
                                              <p className="text-PrimaryText dark:text-dark-PrimaryText font-semibold">4,069,087,907.14</p>
                                          </li>
                                          <li >
                                              <span>Token Tags</span>
                                              <div className="flex space-x-2 mt-1">
                                                  {["POW", "Payments", "Vol", "Hot", "Price Protection"].map((tag, index) => (
                                                      <span
                                                          key={index}
                                                          className="bg-BadgeBg dark:bg-dark-BadgeBg text-TextLink dark:text-dark-TextLink text-xs font-medium px-1  rounded cursor-pointer"
                                                      >
                                                          {tag}
                                                      </span>
                                                  ))}
                                              </div>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
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