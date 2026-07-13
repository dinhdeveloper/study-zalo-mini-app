import axios, {
  AxiosInstance,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { getBaseUrl } from "@/config/env";

export const ENABLE_API_LOG = import.meta.env.DEV;

const BASE_URL = getBaseUrl();

// Header tĩnh — đã test work bằng curl thật (Postman confirmed)
const STATIC_HEADERS: Record<string, string> = {
  "Accept": "application/json; charset=utf-8",
  "Content-Type": "application/json; charset=utf-8",
  "APP-TOKEN": "1b897044df412680bbfde38852329bfd",
  "CLI-TOKEN": "DdK8EiyFCxBRc52qu40aItibqWZ9zQrw",
  "TIME-RQ": "123",
  "DEVICE-ID": "630C01AC-F65E-475D-A11E-D0CFD8FBF69E",
  "Accept-Language": "vi",
  "client": "ios_app",
  "app-version": "1.0.0",
  "App-Name": "CrossPlatform",
};

export const httpClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  // Không dùng withCredentials — server UAT không set CORS cho credentialed requests.
});

function buildCurlCommand(config: InternalAxiosRequestConfig): string {
  const method = config.method?.toUpperCase() ?? "GET";
  const baseUrl = config.baseURL ?? "";
  const url = config.url ?? "";

  let fullUrl = `${baseUrl}${url}`;
  if (config.params) {
    const query = new URLSearchParams(config.params).toString();
    if (query) fullUrl += (fullUrl.includes("?") ? "&" : "?") + query;
  }

  let curl = `curl -X ${method} "${fullUrl}"`;

  const headers = (config.headers as any).toJSON
    ? (config.headers as any).toJSON()
    : (config.headers as unknown as Record<string, any>);

  Object.entries(headers).forEach(([key, value]) => {
    if (typeof value === "string") {
      curl += ` \\\n  -H "${key}: ${value}"`;
    }
  });

  if (config.data) {
    const bodyStr = typeof config.data === "string" ? config.data : JSON.stringify(config.data);
    curl += ` \\\n  -d '${bodyStr}'`;
  }

  return curl;
}

httpClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  Object.entries(STATIC_HEADERS).forEach(([key, value]) => {
    config.headers.set(key, value);
  });

  if (ENABLE_API_LOG) {
    console.groupCollapsed(
      `%c[API REQUEST] ${config.method?.toUpperCase()} ${config.url}`,
      "color: #2563eb; font-weight: bold;"
    );
    console.log("Params:", config.params);
    console.log("Body:", config.data);
    console.log("Headers:", STATIC_HEADERS);
    console.log("%c--- COPY CURL BELOW ---", "color:#9333ea;font-weight:bold;");
    console.log(buildCurlCommand(config));
    console.groupEnd();
  }

  return config;
});

httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (typeof response.data === "string") {
      try {
        response.data = response.data.length ? JSON.parse(response.data) : response.data;
      } catch {
        // giữ nguyên nếu không phải JSON hợp lệ
        console.log("catch:", "giữ nguyên nếu không phải JSON hợp lệ");
      }
    }

    // src/services/core/httpClient.ts — trong response interceptor
  if (ENABLE_API_LOG) {
    const body = response.data;
    const isSuccess = body?.result_code === 0;

    console.groupCollapsed(
      `%c[API RESPONSE] ${isSuccess ? "✅" : "⚠️"} ${response.config.method?.toUpperCase()} ${response.config.url} → ${response.status}`,
      `color: ${isSuccess ? "#16a34a" : "#f59e0b"}; font-weight: bold;`
    );
    console.log("Full JSON:");
    console.log(JSON.stringify(body, null, 2)); // in ra dạng JSON string, dễ copy
    console.groupEnd();
  }

    return response;
  },
  (error: AxiosError) => {
    if (ENABLE_API_LOG) {
      console.groupCollapsed(
        `%c[API ERROR] ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
        "color: #dc2626; font-weight: bold;"
      );
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Message:", error.message);
      console.groupEnd();
    }
    return Promise.reject(error);
  }
);