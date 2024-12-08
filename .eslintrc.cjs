module.exports = {
  extends: [
    "next/core-web-vitals", // Next.js ESLint 설정
    "plugin:@typescript-eslint/recommended" // TypeScript ESLint 설정
  ],
  parser: "@typescript-eslint/parser", // TypeScript 파서 사용
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.json", // TypeScript 설정 파일 경로
  },
  plugins: ["@typescript-eslint"],
  rules: {
    // 원하는 ESLint 규칙 추가
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "off",
  },
};
