// src/config/env.ts

export const Environment = {
  DEV: "dev",
  UAT: "uat",
  UAT3: "uat3",
  STAGING: "staging",
  PROD: "prod",
} as const;

export type EnvironmentType = (typeof Environment)[keyof typeof Environment];

const BASE_URLS: Record<EnvironmentType, string> = {
  [Environment.DEV]: "https://uat.shinhanfinance.net/api_ishin_sit2",
  [Environment.UAT]: "https://uat.shinhanfinance.net/api_ishin_u2",
  [Environment.UAT3]: "https://uat.shinhanfinance.net/api_ishin_u3",
  [Environment.STAGING]: "https://stg.shinhanfinance.net/api_ishin_stg2",
  [Environment.PROD]: "https://m2.shinhanfinance.com.vn/gw5",
};

/**
 * Lấy environment hiện tại từ biến môi trường VITE_APP_ENV
 * (khai báo trong .env / .env.<mode>, hoặc truyền lúc build/start).
 * Mặc định: dev — giống hành vi `default: return baseUrlDev` bên Flutter.
 */
export function getEnvironment(): EnvironmentType {
  const raw = (import.meta.env.VITE_APP_ENV ?? "").toString().toLowerCase();

  switch (raw) {
    case Environment.DEV:
      return Environment.DEV;
    case Environment.UAT:
      return Environment.UAT;
    case Environment.UAT3:
      return Environment.UAT3;
    case Environment.STAGING:
      return Environment.STAGING;
    case Environment.PROD:
      return Environment.PROD;
    default:
      return Environment.DEV;
  }
}

export function getBaseUrl(): string {
  const environment = getEnvironment();
  return BASE_URLS[environment] ?? BASE_URLS[Environment.DEV];
}