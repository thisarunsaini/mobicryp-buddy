export interface PlanType {
  hub: number;
  hubName: string;
  capacity: number;
  durationInMonths: number;
  frequency: Frequency;
  growth: number;
  type: MintType;
  remarks?: string;
  endDate?: string;
}

export enum Frequency {
  Daily = "Daily",
  Holding = "Holding",
  HalfYearly = "Half Yearly",
  Quarterly = "Quarterly",
}

export enum MintType {
  Manual = "manual",
  Auto = "auto",
}
