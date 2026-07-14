import { ApiEndpoint } from "@/services/core/baseRepository";
import { Method } from "@/services/core/method";

export const LoanProductEndpoints = {
  byType: (type: string): ApiEndpoint => ({
    method: Method.GET,
    path: `/api/loan_products/product_by_type?type=${type}`,
  }),
  detail: (id: number | string): ApiEndpoint => ({
    method: Method.GET,
    path: `/api/loan_products/product/${id}`,
  }),

  getList: (id: string): ApiEndpoint => ({
    method: Method.GET,
    path: `/api/loan_products/loan/${id}`,
  }),
} as const;