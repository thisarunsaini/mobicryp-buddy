import { PlanType } from "../types/PlanType"; 
import { Timeline } from "../types/Timeline";
import { RowType } from "../types/RowType";

/** day difference helper */
function differenceInDays(start: Date, end: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = end.getTime() - start.getTime();
  return Math.ceil(diff / msPerDay) < 0 ? 0 : Math.ceil(diff / msPerDay);
}

export function createTimeline(
  plan: PlanType,
  carryAmount: number | null,
  timelines: Timeline[],
  triggeredBy?: { timelineIndex: number; rowIndex: number },
  freqMonths: number = 6,
  treatDailyAsMonthly: boolean = false
): Timeline {
  let leftover = carryAmount ?? 0;
  leftover -= plan.capacity;
  leftover -= plan.hub;
  if (leftover < 0) leftover = 0;

  // Base date: if triggered, use triggered row’s return date
  let baseDate = new Date();
  if (triggeredBy) {
    const priorTL = timelines[triggeredBy.timelineIndex];
    const triggeredRow = priorTL.rows[triggeredBy.rowIndex];
    baseDate = new Date(triggeredRow.returnDate);
  }

  const rows: RowType[] = [];
  const isTrueDaily = plan.frequency === "Daily" && !treatDailyAsMonthly;

  // =========== 1) HOLDING FREQUENCY => exactly one row ===========
  if (plan.frequency === "Holding") {
    const endDate = new Date(baseDate);
    endDate.setMonth(endDate.getMonth() + plan.durationInMonths);
    const endDateStr = endDate.toISOString().split("T")[0];

    let matchedReturnAmount = 0;
    let unmatchedLeftoverCarry = 0;

    if (triggeredBy) {
      const priorTL = timelines[triggeredBy.timelineIndex];
      for (let r = triggeredBy.rowIndex + 1; r < priorTL.rows.length; r++) {
        const oldRow = priorTL.rows[r];
        if (oldRow.returnDate == endDateStr) {
          matchedReturnAmount += oldRow.returnAmount;
        } else {
          unmatchedLeftoverCarry += oldRow.returnAmount;
        }
      }
    }

    const totalGrowth = (plan.capacity * plan.growth) / 100;
    const rowReturnAmount = leftover + totalGrowth + matchedReturnAmount;
    const rowTotal = rowReturnAmount;

    rows.push({
      period: 1,
      returnDate: endDateStr,
      total: rowTotal,
      returnAmount: rowReturnAmount,
      leftoverUsed: leftover,
      growth: totalGrowth,
      matched: matchedReturnAmount,
      unmatchedCarry: unmatchedLeftoverCarry,
      notes: unmatchedLeftoverCarry > 0 ? "⚠️ Unmatched returns carried forward" : undefined
    });

    return {
      plan,
      rows,
      selectedRow: null,
      triggeredFrom: triggeredBy,
      leftoverUsed: carryAmount ?? 0,
      treatDailyAsMonthly,
    };
  }

  // =========== 2) DAILY FREQUENCY => day-by-day ===========
  if (isTrueDaily) {
    // day-by-day iteration from baseDate to (baseDate + plan.durationInMonths)
    const endDate = new Date(baseDate);
    endDate.setMonth(endDate.getMonth() + plan.durationInMonths);

    const totalDays = differenceInDays(baseDate, endDate);
    let runningTotal = 0;
    let currentDate = new Date(baseDate);

    for (let i = 0; i < totalDays; i++) {
      if (i > 0) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
      // plan's total growth spread over totalDays
      const dailyGrowth = (plan.capacity * plan.growth) / 100 / totalDays;

      // matched returns from old timeline
      let matchedReturnAmount = 0;
      const currentDateStr = currentDate.toISOString().split('T')[0];

      if (triggeredBy) {
        const priorTL = timelines[triggeredBy.timelineIndex];
        for (let r = triggeredBy.rowIndex + 1; r < priorTL.rows.length; r++) {
          const oldRow = priorTL.rows[r];
          if (oldRow.returnDate === currentDateStr) {
            matchedReturnAmount += oldRow.returnAmount;
          }
        }
      }

      // First row: leftover + dailyGrowth + matched
      // subsequent: dailyGrowth + matched
      const rowReturnAmount =
        i === 0
          ? leftover + dailyGrowth + matchedReturnAmount
          : dailyGrowth + matchedReturnAmount;

      const rowTotal = (i === 0 ? 0 : runningTotal) + rowReturnAmount;
      runningTotal = rowTotal;

      rows.push({
        period: i + 1,
        returnDate: currentDateStr,
        total: rowTotal,
        returnAmount: rowReturnAmount,
        leftoverUsed: i === 0 ? leftover : 0,
        growth: dailyGrowth,
        matched: matchedReturnAmount,
      });
    }

    return {
      plan,
      rows,
      selectedRow: null,
      triggeredFrom: triggeredBy,
      leftoverUsed: carryAmount ?? 0,
      treatDailyAsMonthly,
    };
  }

  // =========== 3) MONTHLY (or freqMonths) approach ===========
  const totalPeriods = Math.ceil(plan.durationInMonths / freqMonths);
  let runningTotal = 0;

  for (let i = 0; i < totalPeriods; i++) {
    // date = baseDate + (i+1)*freqMonths
    const date = new Date(baseDate);
    date.setMonth(date.getMonth() + (i + 1) * freqMonths);

    // plan's total growth among totalPeriods
    const growthThisPeriod =
      (plan.capacity * plan.growth) / 100 / totalPeriods;

    let matchedReturnAmount = 0;
    const dateStr = date.toISOString().split('T')[0];
    if (triggeredBy) {
      const priorTL = timelines[triggeredBy.timelineIndex];
      for (let r = triggeredBy.rowIndex + 1; r < priorTL.rows.length; r++) {
        const oldRow = priorTL.rows[r];
        if (oldRow.returnDate === dateStr) {
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
      returnDate: dateStr,
      total: rowTotal,
      returnAmount: rowReturnAmount,
      leftoverUsed: i === 0 ? leftover : 0,
      growth: growthThisPeriod,
      matched: matchedReturnAmount,
    });
  }

  return {
    plan,
    rows,
    selectedRow: null,
    triggeredFrom: triggeredBy,
    leftoverUsed: carryAmount ?? 0,
    treatDailyAsMonthly,
  };
}