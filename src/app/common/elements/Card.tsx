import React, { ReactNode } from "react";
import Loading from "@/app/common/elements/Loading";
import { ErrorCode } from "@/process/types";

const Card: React.FC<{
    isLoading?: boolean;
    error?: ErrorCode | null;
    children: ReactNode;
}> = ({ isLoading, error, children }) => {
    return (
        <article className="bg-light-bg1 dark:bg-dark-bg1 rounded-lg w-full h-full relative backdrop-blur-lg overflow-hidden">
            {/* 로딩 상태 */}
            {isLoading && (
                <Loading />
            )}

            {/* 에러 상태 */}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center text-error font-semibold">
                    Error.
                </div>
            )}

            {/* 콘텐츠 */}
            {!isLoading && !error && children}
        </article>
    );
};

export default Card;
