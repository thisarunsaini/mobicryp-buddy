import { Frequency, MintType } from "../../types/PlanType";
import { PlanListType } from "../../types/PlanTypes";

export const PlantListing: PlanListType = {
  Daily: [
    {
      hub: 55,
      hubName: "$55 | Base Package",
      capacity: 300,
      durationInMonths: 25,
      frequency: Frequency.Daily,
      growth: 250,
      type: MintType.Manual,
      remarks: "Base Package",
    },
    {
      hub: 165,
      hubName: "$165 | Base Package",
      capacity: 900,
      durationInMonths: 25,
      frequency: Frequency.Daily,
      growth: 250,
      type: MintType.Manual,
      remarks: "Base Package",
    },
  ],
  Holding: [
    {
      hub: 666,
      hubName: "$666 | Base Package",
      capacity: 6666,
      durationInMonths: 18,
      growth: 300,
      frequency: Frequency.Holding,
      type: MintType.Auto,
      remarks: "Special",
      endDate: "31-12-2024",
    },
  ],
  "Half Yearly": [
    {
      hub: 666,
      hubName: "$666 | Base Package",
      capacity: 6666,
      durationInMonths: 18,
      growth: 300,
      frequency: Frequency.HalfYearly,
      type: MintType.Auto,
      remarks: "Special",
      endDate: "31-12-2024",
    },
  ],
  Quarterly: [
    {
      hub: 666,
      hubName: "$666 | Base Package",
      capacity: 6666,
      durationInMonths: 18,
      growth: 300,
      frequency: Frequency.Quarterly,
      type: MintType.Auto,
      remarks: "Special",
      endDate: "31-12-2024",
    },
  ],
};
