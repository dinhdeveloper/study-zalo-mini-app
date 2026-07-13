// src/types/api.ts

export interface BaseResponseObject<T = any> {
  result_code: number;
  result_description: string;
  data: T;
  time: string;
  codeStatus: number;
  messageStatus: string;
  message: string;
  description: string;
  errorHint?: string;
  took: number;
}

// Header chuẩn theo sample của Shinhan (APP-TOKEN, CLI-TOKEN, DEVICE-ID...)
export interface ApiHeaders {
  "Accept": string;
  "Content-Type": string;
  "APP-TOKEN": string;
  "CLI-TOKEN": string;
  "TIME-RQ": string;
  "DEVICE-ID": string;
  "Accept-Language": string;
  "client": string;
  "User-Agent": string;
  "app-version": string;
  "App-Name": string;
  "Authorization": string;
}

export type ApiSuccessCallback<T = any> = (success: T) => void;
export type ApiFailureCallback = (failure: BaseResponseObject | null) => void;
export type ApiErrorCallback = (error: unknown) => void;

export interface CallOptions {
  isShowLoading?: boolean;
  isReturnFullBase?: boolean;
}

export interface AppVersionPayload {
  platform: string; // vd: "FLUTTER_IOS", "FLUTTER_ANDROID", hoặc platform tương ứng cho zalo mini app
}