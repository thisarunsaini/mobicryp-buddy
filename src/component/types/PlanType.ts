export interface PlanType {
  planId: number;
  hub: number;
  hubName: string;
  capacity: number;
  durationInMonths: number;
  frequency: Frequency;
  growth: number;
  type: MintType;
  remarks?: string;
  endDate?: string;
  removable?: boolean | true;
}

export enum Frequency {
  Daily = "Daily",
  Holding = "Holding",
  HalfYearly = "Half Yearly",
  Quarterly = "Quarterly",
}

export function getFrequencyType(frequency: string): Frequency {
  switch (frequency) {
    case Frequency.Daily:
      return Frequency.Daily;
    case Frequency.Holding:
      return Frequency.Holding;
    case Frequency.HalfYearly:
      return Frequency.HalfYearly;
    case Frequency.Quarterly:
      return Frequency.Quarterly;
    default:
      return Frequency.Daily;
  }
}

export enum MintType {
  Manual = "manual",
  Auto = "auto",
}
