//
// growthPlannerUtils.ts
//
import { PlanType } from "../types/PlanType"; 
import { Frequency } from "../types/PlanTypes"; 
import { RowType } from "../types/RowType";
import { Timeline } from "../types/Timeline";
// ^ Adjust this path and import names to match your project

/**
 * Helper: how many months each frequency represents
 */
export function getFrequencyMonths(freq: Frequency): number {
  switch (freq) {
    case Frequency.Daily:
      // For daily, we’ll handle logic differently, so we typically won’t use this.
      return 1 / 30; // fallback, but not used for daily 
    case Frequency.Quarterly:
      return 3;
    case Frequency.HalfYearly:
      return 6;
    case Frequency.Yearly:
      return 12;
    // Extend as needed
    default:
      // If "Holding" or something else, choose a default
      return 1;
  }
}

/////////////////////////////////////
// 1) Helper function
/////////////////////////////////////
function differenceInDays(start: Date, end: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = end.getTime() - start.getTime();
  // We do Math.ceil so that a partial day counts as a full day, if needed
  const dayCount = Math.ceil(diff / msPerDay);
  return dayCount < 0 ? 0 : dayCount;
}

/**
 * Creates a new timeline for a plan, given leftover (carryAmount),
 * the current array of timelines, and optionally the row that triggered it.
 */
export function createTimeline(
  plan: PlanType,
  carryAmount: number | null,
  timelines: Timeline[],
  triggeredBy?: { timelineIndex: number; rowIndex: number }
): Timeline {
  // Subtract capacity + hub from leftover
  let leftover = carryAmount ?? 0;
  leftover -= plan.capacity;
  leftover -= plan.hub;
  if (leftover < 0) {
    console.warn(
      `Insufficient leftover (${carryAmount ?? 0}) for plan with total cost = ${
        plan.capacity + plan.hub
      }`
    );
    leftover = 0;
  }

  // If triggeredBy is defined, we start from the triggered row’s returnDate;
  // otherwise, we start from "now."
  let baseDate = new Date();
  if (triggeredBy) {
    const priorTL = timelines[triggeredBy.timelineIndex];
    const triggeredRow = priorTL.rows[triggeredBy.rowIndex];
    baseDate = new Date(triggeredRow.returnDate);
  }

  // Decide if it’s daily
  const isDaily = plan.frequency === Frequency.Daily;
  let rows: RowType[] = [];

  if (isDaily) {
    ///////////////////////////////////////
    // DAILY FREQUENCY: day-by-day loop
    ///////////////////////////////////////
    // 1) Compute the end date by adding durationInMonths to baseDate
    const endDate = new Date(baseDate);
    endDate.setMonth(endDate.getMonth() + plan.durationInMonths);

    // 2) Calculate how many days total
    const totalDays = differenceInDays(baseDate, endDate);

    let runningTotal = 0;
    let currentDate = new Date(baseDate);

    for (let i = 0; i < totalDays; i++) {
      // Move forward 1 day after the first iteration
      if (i > 0) {
        currentDate.setDate(currentDate.getDate() + 1);
      }

      // Distribute plan’s total growth across all days
      const dailyGrowth = (plan.capacity * plan.growth) / 100 / totalDays;

      // For any date matches from a prior timeline, add that row’s returnAmount
      let matchedReturnAmount = 0;
      if (triggeredBy) {
        const priorTL = timelines[triggeredBy.timelineIndex];
        for (let r = triggeredBy.rowIndex + 1; r < priorTL.rows.length; r++) {
          const oldRow = priorTL.rows[r];
          if (oldRow.returnDate === currentDate.toLocaleDateString()) {
            matchedReturnAmount += oldRow.returnAmount;
          }
        }
      }

      // If i === 0 => leftover + dailyGrowth, else dailyGrowth
      const rowReturnAmount =
        i === 0
          ? leftover + dailyGrowth + matchedReturnAmount
          : dailyGrowth + matchedReturnAmount;

      const rowTotal = (i === 0 ? 0 : runningTotal) + rowReturnAmount;
      runningTotal = rowTotal;

      rows.push({
        period: i + 1,
        returnDate: currentDate.toLocaleDateString(),
        total: rowTotal,
        returnAmount: rowReturnAmount,
      });
    }
  } else {
    ///////////////////////////////////////
    // NON-DAILY FREQUENCY: old monthly logic
    ///////////////////////////////////////
    const frequencyMonths = getFrequencyMonths(plan.frequency);
    const totalPeriods = Math.ceil(plan.durationInMonths / frequencyMonths);

    let runningTotal = 0;
    for (let i = 0; i < totalPeriods; i++) {
      // clone baseDate
      const date = new Date(baseDate);
      // add frequencyMonths
      date.setMonth(date.getMonth() + (i + 1) * frequencyMonths);

      // plan’s total growth distributed equally among totalPeriods
      const growthThisPeriod = (plan.capacity * plan.growth) / 100 / totalPeriods;

      // For any date match from old timeline
      let matchedReturnAmount = 0;
      if (triggeredBy) {
        const priorTL = timelines[triggeredBy.timelineIndex];
        for (let r = triggeredBy.rowIndex + 1; r < priorTL.rows.length; r++) {
          const oldRow = priorTL.rows[r];
          if (oldRow.returnDate === date.toLocaleDateString()) {
            matchedReturnAmount += oldRow.returnAmount;
          }
        }
      }

      const rowReturnAmount =
        i === 0
          ? leftover + growthThisPeriod + matchedReturnAmount
          : growthThisPeriod + matchedReturnAmount;

      const rowTotal = (i === 0 ? 0 : runningTotal) + rowReturnAmount;
      runningTotal = rowTotal;

      rows.push({
        period: i + 1,
        returnDate: date.toLocaleDateString(),
        total: rowTotal,
        returnAmount: rowReturnAmount,
      });
    }
  }

  return {
    plan,
    rows,
    selectedRow: null,
    triggeredFrom: triggeredBy,
    leftoverUsed: carryAmount ?? 0,
  };
}