import { PlanType } from "./PlanType";

export interface PlanListType {
  [Frequency.Daily]?: PlanType[];
  [Frequency.HalfYearly]?: PlanType[];
  [Frequency.Holding]?: PlanType[];
  [Frequency.Quarterly]?: PlanType[];
}

export enum Frequency {
  Daily = "Daily",
  Holding = "Holding",
  HalfYearly = "Half Yearly",
  Quarterly = "Quarterly",
}
