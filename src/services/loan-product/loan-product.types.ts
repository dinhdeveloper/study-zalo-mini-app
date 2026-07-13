// src/services/loan-product/loan-product.types.ts
export interface LoanProduct {
  id: number;
  title: string;
  mpcCode: string;
  pathIcon?: string;
  productDetails: unknown[];
  type: string;
}

export interface LoanProductListData {
  products: LoanProduct[];
  urlBackground: string;
}

// Field đúng theo response thật /api/loan_products/product/:id
export interface LoanProductDetail {
  id: number;
  title: string;
  mpcCode: string;
  pathIcon?: string;
  description?: string;
  contents: string[]; // checklist — đúng tên field thật
  minLoan?: number;
  maxLoan?: number;
  loanInterest?: number;
  type: string;
  [key: string]: any;
}

// data trả về là mảng
export type LoanProductDetailListData = LoanProductDetail[];