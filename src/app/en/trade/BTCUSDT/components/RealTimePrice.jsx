import React, { useState, useEffect } from "react";

const RealTimePrice = ({ price, showIcon = false }) => {
    const [beforePrice, setBeforePrice] = useState(price);
    const [priceClass, setPriceClass] = useState("text-success");
    const [arrowIcon, setArrowIcon ] = useState("↑");

    useEffect(() => {
        if (price > beforePrice){
            setPriceClass("text-success");
            setArrowIcon("↑")
        }
        else if (price < beforePrice){
            setPriceClass("text-error");
            setArrowIcon("↓")
        }
        setBeforePrice(price); // 이전 가격 업데이트
    }, [price, beforePrice]);

    return (
        <strong className={`text-lg font-semibold w-[100px] ${priceClass}`}>
            {price}{showIcon && <span className={`text-lg font-semibold ${priceClass}`}>{arrowIcon}</span>}
        </strong>
    );
};

export default RealTimePrice;
