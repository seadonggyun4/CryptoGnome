/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/', // 루트 경로
                destination: '/en', // 리디렉션 대상 경로
                permanent: true, // true: 301 리디렉션, false: 302 리디렉션
            },
        ];
    },
    webpack(config) {
        // Font Awesome의 기본 CSS 로드 방지 설정
        config.resolve.alias['@fortawesome/fontawesome-svg-core/styles.css'] = false;
        return config;
    },
    images: {
        domains: ['lh3.googleusercontent.com'], // Add this line
    },
    reactStrictMode: false,
};

export default nextConfig;
