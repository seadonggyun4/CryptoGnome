import React from "react";
import Loading from "@/common/elements/Loading";

const GoogleCallbackPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen font-sans">
            <Loading />
        </div>
    );
};

export default GoogleCallbackPage;
