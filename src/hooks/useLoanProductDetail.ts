// src/hooks/useLoanProductDetail.ts
import { useCallback, useState } from "react";
import { callApi } from "@/services/core/baseRepository";
import { BaseResponseObject } from "@/services/core/types";
import { LoanProductEndpoints } from "@/services/loan-product/loan-product.endpoints";
import {
  LoanProductDetail,
  LoanProductDetailListData,
} from "@/services/loan-product/loan-product.types";
import { useStableSnackbar } from "@/hooks/useStableSnackbar";

export function useLoanProductDetail() {
  const [details, setDetails] = useState<LoanProductDetail[]>([]);
  const { showError } = useStableSnackbar();

  const fetchDetail = useCallback((id: number | string) => {
    callApi<LoanProductDetailListData>({
      endpoint: LoanProductEndpoints.detail(id),
      onSuccess: (data) => setDetails(data),
      onFailure: (failure: BaseResponseObject | null) => {
        showError(failure?.message ?? "Không tải được chi tiết sản phẩm");
      },
      onError: (err) => {
        showError("Lỗi kết nối mạng");
        console.error(err);
      },
      isShowLoading: true,
    });
  }, []);

  return { details, fetchDetail };
}