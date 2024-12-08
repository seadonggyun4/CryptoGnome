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
        <strong className={`text-lg font-semibold w-[100px] ${priceClass}`}>
            {price}
            {showIcon && <span className={`text-lg font-semibold ${priceClass}`}>{arrowIcon}</span>}
        </strong>
    );
};

export default RealTimePrice;
