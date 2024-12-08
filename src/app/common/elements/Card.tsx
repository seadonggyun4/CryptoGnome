import React, { ReactNode } from "react";

const Card: React.FC<{
    isLoading?: boolean;
    error?: boolean;
    children: ReactNode;
}> = ({ isLoading, error, children }) => {
    return (
        <article className="bg-light-bg1 dark:bg-dark-bg1 rounded-lg w-full h-full relative">
            {/* 로딩 상태 */}
            {isLoading && (
                <div className="flex items-center justify-center absolute inset-0">
                    <div className="w-8 h-8 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
                </div>
            )}

            {/* 에러 상태 */}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center text-error font-bold">
                    Error.
                </div>
            )}

            {/* 콘텐츠 */}
            {!isLoading && !error && children}
        </article>
    );
};

export default Card;
