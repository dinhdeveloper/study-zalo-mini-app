import { AxiosRequestConfig } from "axios";
import { httpClient } from "./httpClient";
import { showLoading, hideLoading } from "./loadingStore";
import { Method, MethodType } from "./method";
import {
  BaseResponseObject,
  ApiSuccessCallback,
  ApiFailureCallback,
  ApiErrorCallback,
  CallOptions,
} from "./types";

export interface ApiEndpoint {
  method: MethodType;
  path: string;
}

// src/services/core/baseRepository.ts
export interface CallApiParams<T = any> {
  endpoint: ApiEndpoint;
  onSuccess: ApiSuccessCallback<T>;
  onFailure: ApiFailureCallback;
  onError: ApiErrorCallback;
  request?: Record<string, any>;
  isShowLoading?: boolean;
  isReturnFullBase?: boolean;
}

export async function callApi<T = any>(params: CallApiParams<T>): Promise<void> {
  const {
    endpoint,
    onSuccess,
    onFailure,
    onError,
    request,
    isShowLoading = false,
    isReturnFullBase = false,
  } = params;

  const config: AxiosRequestConfig = {
    method: endpoint.method,
    url: endpoint.path,
    ...(endpoint.method === Method.GET ? { params: request } : { data: request }),
  };

  if (isShowLoading) showLoading();

  try {
    const response = await httpClient.request<BaseResponseObject<T>>(config);
    const base = response.data;

    if (base.result_code === 0) {
      onSuccess(isReturnFullBase ? (base as unknown as T) : base.data);
    } else {
      onFailure(base);
    }
  } catch (err) {
    const axiosErr = err as { response?: { data?: BaseResponseObject } };
    if (axiosErr?.response?.data) {
      onFailure(axiosErr.response.data);
    } else {
      onError(err);
    }
  } finally {
    if (isShowLoading) hideLoading();
  }
}