"use client";

import React, { memo } from "react";
import PriceStatistics from "@/app/en/layouts/PriceStatistics";
import OrderBook from "@/app/en/layouts/OrderBook";
import ChartContainer from "@/app/en/layouts/ChartContainer";
import MiningContainer from "@/app/en/layouts/MiningContainer";
import CoinList from "@/app/en/layouts/CoinList";
import MarketTrades from "@/app/en/layouts/MarketTrades";
import TopMovers from "@/app/en/layouts/TopMovers";
import UserHistory from "@/app/en/layouts/UserHistory";


const HomeSection =  () => {
    return (
        <section>
            <div className={`flex flex-col mx-auto max-w-[100rem] max-h-[300rem] h-full px-4 lg:px-0 py-1`}>
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
                                    <MiningContainer/>
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
