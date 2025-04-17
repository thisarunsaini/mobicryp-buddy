import { PlanType } from "./PlanType";

export interface RowType {
  planNo: number;
  returnDate: string;
  total: number;
  returnAmount: number;
  returnAmountList: number[];
  carriedFromDateMatches?: number;
  plan:PlanType
  reInvestmentAmount: number; // newly added
  growth?: number;       // newly added
  matched: boolean;     // newly added
  unmatchedCarry?: number; // newly added
  notes?:string;
  uniqueId?: string;
}