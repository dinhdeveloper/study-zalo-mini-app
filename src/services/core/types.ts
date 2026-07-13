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

export type ApiSuccessCallback<T = any> = (success: T) => void;
export type ApiFailureCallback = (failure: BaseResponseObject | null) => void;
export type ApiErrorCallback = (error: unknown) => void;

export interface CallOptions {
  isShowLoading?: boolean;
  isReturnFullBase?: boolean;
}