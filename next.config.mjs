/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/', // 루트 경로
                destination: '/en/trade/BTCUSDT', // 리디렉션 대상 경로
                permanent: true, // true: 301 리디렉션, false: 302 리디렉션
            },
        ];
    },
};
export default nextConfig;
