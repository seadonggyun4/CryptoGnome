"use client";

import React from "react";
import Card from "@/app/common/elements/Card";
import { usePriceStatisticsQuery } from "@/features/priceStatistics/hooks/usePriceStatisticsQuery";
import { usePriceStatisticsWebSocket } from "@/features/priceStatistics/hooks/usePriceStatisticsWebSocket";

export default function PriceStatistics() {
    const { data, isLoading, error } = usePriceStatisticsQuery();
    usePriceStatisticsWebSocket("BTCUSDT");

    if (isLoading) return <Card>Loading...</Card>;
    if (error) return <Card>Error fetching data</Card>;

    const {
        lastPrice = "N/A",
        priceChange = "N/A",
        priceChangePercent = "N/A",
        highPrice = "N/A",
        lowPrice = "N/A",
        volume = "N/A",
        quoteVolume = "N/A",
    } = data || {};

    return (
        <Card>
            <div className="flex items-center py-2 px-4 space-x-6">
                {/* 왼쪽 영역 */}
                <div className="flex items-center space-x-3">
                    <div className="flex justify-center items-center border-2 border-line dark:border-dark-line cursor-pointer w-6 h-6 p-3 rounded-md">
                        <span className="text-DisabledText dark:text-dark-DisabledText">★</span>
                    </div>
                    <div className="flex flex-col">
                        <div className="text-lg font-semibold text-textPrimary dark:text-dark-textPrimary">
                            BTC/USDT
                        </div>
                        <a
                            href="https://www.binance.com/en/price/bitcoin"
                            target="_blank"
                            className="underline text-sm text-textSecondary dark:text-dark-textSecondary"
                            rel="noopener noreferrer"
                        >
                            Bitcoin Price
                        </a>
                    </div>
                </div>

                {/* 오른쪽 영역 */}
                <div className="flex items-center space-x-6">
                    <div className="flex flex-col">
                        <span className="text-lg font-semibold text-error dark:text-dark-error">
                            ${parseFloat(lastPrice).toFixed(2)}
                        </span>
                        <span className="text-sm text-PrimaryText dark:text-dark-PrimaryText">
                            ${parseFloat(lastPrice).toFixed(2)}
                        </span>
                    </div>
                    <ul className="flex text-sm text-textSecondary dark:text-dark-textSecondary space-x-5">
                        <li className="flex flex-col">
                            <span className="text-DisabledText dark:text-dark-DisabledText">24h Change</span>
                            <p className="text-sm text-error dark:text-dark-error">
                                {parseFloat(priceChange).toFixed(2)} (
                                {parseFloat(priceChangePercent).toFixed(2)}%)
                            </p>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-DisabledText dark:text-dark-DisabledText">24h High</span>
                            <p className="text-PrimaryText dark:text-dark-PrimaryText font-semibold">
                                {parseFloat(highPrice).toFixed(2)}
                            </p>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-DisabledText dark:text-dark-DisabledText">24h Low</span>
                            <p className="text-PrimaryText dark:text-dark-PrimaryText font-semibold">
                                {parseFloat(lowPrice).toFixed(2)}
                            </p>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-DisabledText dark:text-dark-DisabledText">24h Volume(BTC)</span>
                            <p className="text-PrimaryText dark:text-dark-PrimaryText font-semibold">
                                {parseFloat(volume).toLocaleString()}
                            </p>
                        </li>
                        <li className="flex flex-col">
                            <span className="text-DisabledText dark:text-dark-DisabledText">24h Volume(USDT)</span>
                            <p className="text-PrimaryText dark:text-dark-PrimaryText font-semibold">
                                {parseFloat(quoteVolume).toLocaleString()}
                            </p>
                        </li>
                        <li>
                            <span className="text-DisabledText dark:text-dark-DisabledText">Token Tags</span>
                            <div className="flex space-x-2 mt-1">
                                {["POW", "Payments", "Vol", "Hot", "Price Protection"].map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-BadgeBg dark:bg-dark-BadgeBg text-TextLink dark:text-dark-TextLink text-xs font-medium px-1 rounded cursor-pointer"
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
}
