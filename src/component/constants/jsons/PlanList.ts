import { Frequency, MintType } from "../../types/PlanType";
import { PlanListType } from "../../types/PlanTypes";

export const PlantListing: PlanListType = {
  Daily: [
    {
      hub: 55,
      hubName: "$55 | 300 | Base Package",
      capacity: 300,
      durationInMonths: 25,
      frequency: Frequency.Daily,
      growth: 250,
      type: MintType.Manual,
      remarks: "Base Package",
    },
    {
      hub: 165,
      hubName: "$165 | 900 | Base Package",
      capacity: 900,
      durationInMonths: 25,
      frequency: Frequency.Daily,
      growth: 250,
      type: MintType.Manual,
      remarks: "Base Package",
    },
    {
      hub: 1650,
      hubName: "$1650 | 16000 | Travel Package",
      capacity: 16000,
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
      hubName: "$666 | 6666 | Base Package",
      capacity: 6666,
      durationInMonths: 18,
      growth: 300,
      frequency: Frequency.Holding,
      type: MintType.Auto,
      remarks: "Special",
      endDate: "31-12-9999",
    },
  ],
  "Half Yearly": [
    {
      hub: 666,
      hubName: "$666 | 6666 | Base Package",
      capacity: 6666,
      durationInMonths: 18,
      growth: 300,
      frequency: Frequency.HalfYearly,
      type: MintType.Auto,
      remarks: "Special",
      endDate: "31-12-9999",
    },
    {
      hub: 550,
      hubName: "$550 | $5555 | Kohinoor 2.0",
      capacity: 5555,
      durationInMonths: 30,
      growth: 350,
      frequency: Frequency.HalfYearly,
      type: MintType.Auto,
      remarks: "Special",
      endDate: "31-12-9999",
    },
    {
      hub: 900,
      hubName: "$900 | $5500 | Diamond",
      capacity: 5500,
      durationInMonths: 30,
      growth: 350,
      frequency: Frequency.HalfYearly,
      type: MintType.Auto,
      remarks: "Special",
      endDate: "31-12-9999",
    },
  ],
  Quarterly: [
    {
      hub: 666,
      hubName: "$666 | 6666 | Pearl Package",
      capacity: 6666,
      durationInMonths: 18,
      growth: 300,
      frequency: Frequency.Quarterly,
      type: MintType.Auto,
      remarks: "Special",
      endDate: "31-12-9999",
    },
  ],
};
