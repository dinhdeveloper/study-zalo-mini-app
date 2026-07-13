import { ApiEndpoint } from "@/services/core/baseRepository";
import { Method } from "@/services/core/method";

export const AppVersionEndpoints = {
  check: (): ApiEndpoint => ({
    method: Method.POST,
    path: `/api/v2/auth/app-version`,
  }),
} as const;