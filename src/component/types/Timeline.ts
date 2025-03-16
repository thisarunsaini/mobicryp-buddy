import { PlanType } from "./PlanType";
import { RowType } from "./RowType";

export interface Timeline {
  plan: PlanType;
  rows: RowType[];
  selectedRow: number | null;
  triggeredFrom?: {
    timelineIndex: number;
    rowIndex: number;
  };
  leftoverUsed?: number;
  treatDailyAsMonthly?: boolean; // newly added
}