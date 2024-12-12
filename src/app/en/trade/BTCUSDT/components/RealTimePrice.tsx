import React, { useState, useEffect } from "react";

interface RealTimePriceProps {
    price: string;
    showIcon?: boolean;
}

const RealTimePrice: React.FC<RealTimePriceProps> = ({ price, showIcon = false }) => {
    const [beforePrice, setBeforePrice] = useState<string>(price);
    const [priceClass, setPriceClass] = useState<string>("text-success");
    const [arrowIcon, setArrowIcon] = useState<string>("↑");

    useEffect(() => {
        if (price > beforePrice) {
            setPriceClass("text-success");
            setArrowIcon("↑");
        } else if (price < beforePrice) {
            setPriceClass("text-error");
            setArrowIcon("↓");
        }
        setBeforePrice(price); // 이전 가격 업데이트
    }, [price, beforePrice]);

    return (
        <strong className={`flex items-center real-time-price text-2xl font-bold w-[100px] ${priceClass}`}>
            {price}
            {showIcon && <span className={`text-2xl font-bold ${priceClass}`}>{arrowIcon}</span>}
        </strong>
    );
};

export default RealTimePrice;
