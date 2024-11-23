export default function BTCUSDTPage() {
  return (
      <section className="flex flex-col h-screen bg-black">
          <div className="flex flex-1 h-full">
              {/* 왼쪽 큰 영역 */}
              <div className="flex flex-col gap-3 flex-1 p-4 h-full">
                  {/* 상단 영역 */}
                  <div className="flex-2 bg-bg1 dark:bg-dark-bg1 rounded-lg p-3">
                      <h3 className="text-md font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">
                          Order Book
                      </h3>
                  </div>

                  {/* 메인 콘텐츠 영역 */}
                  <div className="flex-1 flex space-x-4 ">
                      {/* 왼쪽 Order Book */}
                      <div className=" flex-2 bg-bg1 dark:bg-dark-bg1 rounded-lg p-3">
                          <h3 className="text-md font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">
                              Order Book
                          </h3>
                      </div>

                      {/* 오른쪽 Chart + Spot */}
                      <div className="flex-1 flex flex-col space-y-4">
                          {/* Chart */}
                          <div className="flex-1 bg-bg1 dark:bg-dark-bg1 rounded-lg p-3">
                              <h3 className="text-md font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">Chart</h3>
                          </div>

                          {/* Spot (Order Form) */}
                          <div className="flex-1 bg-bg1 dark:bg-dark-bg1 rounded-lg p-3">
                              <h3 className="text-md font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">Spot</h3>
                          </div>
                      </div>
                  </div>
              </div>

              {/* 오른쪽 작은 영역 */}
              <div className="flex flex-col gap-3  flex-2  p-4 h-full">
                  <div className="h-full bg-bg1 dark:bg-dark-bg1 rounded-lg p-3">
                      <h3 className="text-md font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">
                        USDT
                      </h3>
                  </div>
                  <div className="h-full bg-bg1 dark:bg-dark-bg1 rounded-lg p-3">
                      <h3 className="text-md font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">
                        MarketTrandes
                      </h3>
                  </div>
                  <div className="h-full bg-bg1 dark:bg-dark-bg1 rounded-lg p-3">
                      <h3 className="text-md font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">
                          topMovers
                      </h3>
                  </div>
              </div>
          </div>

          <div className="h-40 flex items-center justify-between px-4 py-2">
              <div className="h-full w-full bg-bg1 dark:bg-dark-bg1 rounded-lg p-3">
                  <h3 className="text-md font-semibold text-textPrimary dark:text-dark-textPrimary mb-2">
                      openOder
                  </h3>
              </div>
          </div>
      </section>
  );
}