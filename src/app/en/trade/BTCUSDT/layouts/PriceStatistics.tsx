"use client";

import React from "react";
import Card from "@/app/common/elements/Card";
import RealTimePrice from "@/app/en/trade/BTCUSDT/components/RealTimePrice";
import { useTicker } from "@/features/ticker/hooks/useTicker";
import { useTradingContext } from "@/app/en/trade/BTCUSDT/provider/TradingContext";
import { useSliceSymbol } from "@/app/en/trade/BTCUSDT/hooks/useSliceSymbol";
import { SliceSymbolResult } from "@/app/en/trade/BTCUSDT/types";

// 컴포넌트 정의
const PriceStatistics: React.FC = () => {
    const { symbol } = useTradingContext();
    const { data, isLoading, error } = useTicker(symbol);
    const { base, quote }: SliceSymbolResult = useSliceSymbol(symbol);

    return (
        <Card isLoading={isLoading} error={error}>
            <div className="flex items-center py-2 px-4 space-x-6">
                {/* 왼쪽 영역 */}
                <div className="flex items-center space-x-3">
                    <div
                        className="flex justify-center items-center border-2 border-light-line dark:border-dark-line cursor-pointer w-6 h-6 p-3 rounded-md">
                        <span className="text-light-iconNormal dark:text-dark-iconNormal">★</span>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-lg font-semibold text-light-primaryText dark:text-dark-primaryText">
                            {`${base}/${quote}`}
                        </div>
                        <a
                            href="https://www.binance.com/en/price/bitcoin"
                            target="_blank"
                            className="underline text-sm text-light-primaryText dark:text-dark-primaryText"
                            rel="noopener noreferrer"
                        >
                            Bitcoin Price
                        </a>
                    </div>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="flex flex-col">
                        <RealTimePrice price={parseFloat(data?.[0]?.lastPrice || "0").toFixed(2)}/>
                        <span className="text-sm text-light-primaryText dark:text-dark-primaryText">
                                ${parseFloat(data?.[0]?.lastPrice || "0")}
                            </span>
                    </div>
                    <ul className="flex text-sm space-x-5">
                        <li className="flex flex-col">
                            <span className="text-light-iconNormal dark:text-dark-iconNormal">24h Change</span>
                            <p className="text-sm text-error">
                                {parseFloat(data?.[0]?.priceChangePercent || "0").toFixed(2)}%
                            </p>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-light-iconNormal dark:text-dark-iconNormal">24h High</span>
                            <p className="text-light-primaryText dark:text-dark-primaryText font-semibold">
                                {parseFloat(data?.[0]?.highPrice || "0").toFixed(2)}
                            </p>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-light-iconNormal dark:text-dark-iconNormal">24h Low</span>
                            <p className="text-light-primaryText dark:text-dark-primaryText font-semibold">
                                {parseFloat(data?.[0]?.lowPrice || "0").toFixed(2)}
                            </p>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-light-iconNormal dark:text-dark-iconNormal">24h Volume(BTC)</span>
                            <p className="text-light-primaryText dark:text-dark-primaryText font-semibold">
                                {parseFloat(data?.[0]?.volume || "0").toLocaleString()}
                            </p>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-light-iconNormal dark:text-dark-iconNormal">24h Volume(USDT)</span>
                            <p className="text-light-primaryText dark:text-dark-primaryText font-semibold">
                                {parseFloat(data?.[0]?.quoteVolume || "0").toLocaleString()}
                            </p>
                        </li>
                        <li>
                            <span className="text-light-iconNormal dark:text-dark-iconNormal">Token Tags</span>
                            <div className="flex space-x-2 mt-1">
                                {["POW", "Payments", "Vol", "Hot", "Price Protection"].map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-badgeBg text-textLink text-xs font-medium px-1 rounded cursor-pointer"
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
    );
};

export default PriceStatistics;
