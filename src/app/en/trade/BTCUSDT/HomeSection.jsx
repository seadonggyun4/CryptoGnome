"use client";

import React, { memo } from "react";
import PriceStatistics from "@/app/en/trade/BTCUSDT/layouts/PriceStatistics";
import OrderBook from "@/app/en/trade/BTCUSDT/layouts/OrderBook";
import ChartContainer from "@/app/en/trade/BTCUSDT/layouts/ChartContainer";
import TradingForm from "@/app/en/trade/BTCUSDT/layouts/TradingForm";
import CoinList from "@/app/en/trade/BTCUSDT/layouts/CoinList";
import TradeAside from "@/app/en/trade/BTCUSDT/layouts/TradeAside";
import TopMovers from "@/app/en/trade/BTCUSDT/layouts/TopMovers";
import UserHistory from "@/app/en/trade/BTCUSDT/layouts/UserHistory";

const HomeSection = () => {
    return (
        <section>
            <div className="mx-auto max-w-[1528px] h-full px-4 lg:px-0 py-1">
                <div className="flex h-full gap-1 mb-1">
                    <div className="flex flex-col gap-1 h-full w-full">
                        <div>
                            <PriceStatistics />
                        </div>
                        <div className="flex-1 flex gap-1">
                            <div className="w-80">
                                <OrderBook />
                            </div>
                            <div className="flex-1 flex flex-col gap-1">
                                <ChartContainer />
                                <TradingForm />
                            </div>
                        </div>
                    </div>
                    <aside className="flex flex-col gap-1 h-full w-96">
                        <CoinList />
                        <TradeAside />
                        <TopMovers />
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
