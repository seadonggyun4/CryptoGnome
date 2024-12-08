import React from "react";

const Loading = () => {
    return (
        <div className="flex items-center justify-center absolute inset-0">
            <div className="w-8 h-8 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
        </div>
    )
}

export default Loading;