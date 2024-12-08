"use client";

import React, { memo } from "react";
import PriceStatistics from "@/app/en/trade/BTCUSDT/layouts/PriceStatistics";
import OrderBook from "@/app/en/trade/BTCUSDT/layouts/OrderBook";
import ChartContainer from "@/app/en/trade/BTCUSDT/layouts/ChartContainer";
import TradingForm from "@/app/en/trade/BTCUSDT/layouts/TradingForm";
import CoinList from "@/app/en/trade/BTCUSDT/layouts/CoinList";
import MarketTrades from "@/app/en/trade/BTCUSDT/layouts/MarketTrades";
import TopMovers from "@/app/en/trade/BTCUSDT/layouts/TopMovers";
import UserHistory from "@/app/en/trade/BTCUSDT/layouts/UserHistory";


const HomeSection =  () => {
    return (
        <section>
            <div className="flex flex-col mx-auto max-w-[1528px] min-h-[120vh] h-full px-4 lg:px-0 py-1">
                <div className="flex-1 flex gap-1 mb-1">
                    {/*main*/}
                    <div className="flex flex-col gap-1 w-full">
                        <div className="min-h-20">
                            <PriceStatistics />
                        </div>
                        <div className="flex-1 flex gap-1">
                            <div className="w-80">
                                <OrderBook />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <div className="flex-1 h-full">
                                    <ChartContainer/>
                                </div>
                                <div className="flex-1">
                                    <TradingForm/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*aside*/}
                    <aside className="flex flex-col gap-1 w-96">
                        <div className="flex-1">
                            <CoinList/>
                        </div>
                        <div className="flex-2 min-h-48">
                            <MarketTrades/>
                        </div>
                        <div className="flex-2 min-h-40">
                            <TopMovers/>
                        </div>
                    </aside>
                </div>
                <div className="h-80 mb-1">
                    <UserHistory />
                </div>
            </div>
        </section>
    );
};

export default memo(HomeSection);
