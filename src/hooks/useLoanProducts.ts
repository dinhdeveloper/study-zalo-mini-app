import { useCallback, useState } from "react";
import { callApi } from "@/services/core/baseRepository";
import { BaseResponseObject } from "@/services/core/types";
import { LoanProductEndpoints } from "@/services/loan-product/loan-product.endpoints";
import { LoanProduct, LoanProductListData } from "@/services/loan-product/loan-product.types";
import { useStableSnackbar } from "@/hooks/useStableSnackbar";

import { ExpressLoanQuestion, ExpressLoanData } from "./models/expressLoan";

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

export function useListQuestionExLoan() {
  const [questions, setQuestions] = useState<ExpressLoanQuestion[]>([]);
  const { showError } = useStableSnackbar();

  const fetchListQuestion = useCallback(
    (idLoan: string) => {
      callApi<ExpressLoanData>({
        endpoint: LoanProductEndpoints.getList(idLoan),

        onSuccess: (data) => {
          setQuestions(data.questions);
        },

        onFailure: (failure) => {
          showError(failure?.message ?? "Có lỗi xảy ra");
        },

        onError: (err) => {
          showError("Có vẻ như bạn đang gặp trở ngại trong kết nối");
          console.error(err);
        },

        isShowLoading: true,
      });
    },
    [showError]
  );

  return {
    questions,
    fetchListQuestion,
  };
}

export function getAnswerText(value?: string): string {
  if (!value) return "";

  try {
    const json = JSON.parse(value);

    const firstValue = Object.values(json)[0];

    return firstValue ? String(firstValue) : "";
  } catch {
    return value;
  }
}