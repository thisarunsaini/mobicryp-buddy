import { PlanType } from "./PlanType";
import { RowType } from "./RowType";

export interface Timeline {
  plan: PlanType;
  rows: RowType[];
  selectedRow: number | null;
  // We store which row triggered this table (for reference)
  triggeredFrom?: {
    timelineIndex: number;
    rowIndex: number;
  };
  // Keep track of leftover from prior selection (for reference / debug)
  leftoverUsed?: number;
}