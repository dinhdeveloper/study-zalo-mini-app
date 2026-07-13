import { callApi } from "@/services/core/baseRepository";
import { BaseResponseObject } from "@/services/core/types";
import { AppVersionEndpoints } from "./app-version.endpoints";
import { AppVersionPayload, AppVersionData } from "./app-version.types";

export function checkAppVersion(): void {
  const payload: AppVersionPayload = {
    plaform: "FLUTTER_IOS",
  };

  callApi<AppVersionData>({
    endpoint: AppVersionEndpoints.check(),
    onSuccess: (data) => console.log("Current backend version:", data.version),
    onFailure: (failure) => console.error("Check version failed:", failure?.message),
    onError: (err) => console.error("Network error:", err),
    isShowLoading: false,
    request: { plaform: "FLUTTER_IOS" },
  });
}