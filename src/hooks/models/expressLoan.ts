export interface ExpressLoanAnswer {
  questionType: string;
  value: string;
}

export interface ExpressLoanOption {
  [key: string]: any;
}

export interface ExpressLoanQuestion {
  questionID?: number;
  content?: string;
  progress: number;
  enable: boolean;
  options: ExpressLoanOption[];
  questionType: string;
  nextQuestionType?: string;
  productFlow?: string;
  answer?: ExpressLoanAnswer;
}

export interface ApplyForEkyc {
  configTimeOutQrCode: number;
  configTimeOutIdChip: number;
  numOfChipScans: number;
}

export interface Promotion {
  [key: string]: any;
}

export interface ExpressLoanData {
  generalConfigurationLoanId: number;
  minValue: number;
  maxValue: number;
  maxProgress: number;
  stepProgress: number;
  deviceId: string;
  defaultTenure: number;
  period: number[];

  questions: ExpressLoanQuestion[];

  flagLoanInsurance: boolean;
  tootipInsurance: string;
  minIncome: number;

  promotions: Promotion[];

  applyForEkyc: ApplyForEkyc;

  refId: string;
  selfieDocumentTypeId: number;
}