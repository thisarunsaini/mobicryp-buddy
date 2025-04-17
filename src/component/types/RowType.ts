import { PlanType } from "./PlanType";

export interface RowType {
  planNo: number;
  returnDate: string;
  total: number;
  returnAmount: number;
  returnAmountList: number[];
  plan:PlanType
  reInvestmentAmount: number; // newly added
  growth?: number;       // newly added
  matched: boolean;     // newly added
  uniqueId?: string;
  reInvest:boolean;
}