import { PlanType } from "./PlanType";

export interface PlanListType {
  [Frequency.Daily]?: PlanType[];
  [Frequency.HalfYearly]?: PlanType[];
  [Frequency.Holding]?: PlanType[];
  [Frequency.Quarterly]?: PlanType[];
  [Frequency.Yearly]?: PlanType[];
}

export const extractPlans = (planList: PlanListType): PlanType[] => {
  const plans: PlanType[] = [];

  Object.values(Frequency).forEach((frequency) => {
    if (planList[frequency]) {
      plans.push(...(planList[frequency] as PlanType[]));
    }
  });

  return plans;
};

export enum Frequency {
  Daily = "Daily",
  Holding = "Holding",
  HalfYearly = "Half Yearly",
  Quarterly = "Quarterly",
  Yearly = "Yearly",
}
