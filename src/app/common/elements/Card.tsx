import React, { ReactNode } from "react";
import Loading from "@/app/common/elements/Loading";

const Card: React.FC<{
    isLoading?: boolean;
    error?: Error | null;
    children: ReactNode;
}> = ({ isLoading, error, children }) => {
    return (
        <article className="bg-light-bg1 dark:bg-dark-bg1 rounded-lg w-full h-full relative">
            {/* 로딩 상태 */}
            {isLoading && (
                <Loading />
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
