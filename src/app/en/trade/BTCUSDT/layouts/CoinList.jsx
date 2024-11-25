"use client";

import React, { useState } from "react";
import Card from "@/app/common/elements/Card";
import SearchInput from "@/app/common/elements/SearchInput";

export default function CoinList() {
    const [searchText, setSearchText] = useState("");

    return(
        <Card>
            <div className="h-96">
                <SearchInput inputValue={searchText} onSearch={setSearchText} />
            </div>
        </Card>
    )
}