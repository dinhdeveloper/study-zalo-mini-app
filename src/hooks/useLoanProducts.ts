import { useCallback, useState } from "react";
import { callApi } from "@/services/core/baseRepository";
import { BaseResponseObject } from "@/services/core/types";
import { LoanProductEndpoints } from "@/services/loan-product/loan-product.endpoints";
import { LoanProduct, LoanProductListData } from "@/services/loan-product/loan-product.types";
import { useStableSnackbar } from "@/hooks/useStableSnackbar";

export function useLoanProducts() {
  const [products, setProducts] = useState<LoanProduct[]>([]);
  const { showError } = useStableSnackbar();

  const fetchByType = useCallback((type: string) => {
    // GET không cần request
    callApi<LoanProductListData>({
      endpoint: LoanProductEndpoints.byType(type),
      onSuccess: (data) => setProducts(data.products),
      onFailure: (failure) => showError(failure?.message ?? "Có lỗi xảy ra"),
      onError: (err) => {
        showError("Có vẻ như bạn đang gặp trở ngại trong kết nối");
        console.error(err);
      },
      isShowLoading: true,
    });
  }, []);

  return { products, fetchByType };
}