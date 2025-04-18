import { PlanType } from "../types/PlanType";
import { DateTimelineRow } from "../types/Timeline";
import { RowType } from "../types/RowType";

/** Get frequency in months */
function getFrequencyMonths(frequency: string, months: number): number {
  switch (frequency) {
    case "Daily":
      return 1; // handled separately
    case "Quarterly":
      return 3;
    case "Half Yearly":
      return 6;
    case "Holding":
      return months; // special case
    default:
      return 1; // treat unknowns as monthly
  }
}

function getRowCount(plan: PlanType): number {
  const frequencyMonths = getFrequencyMonths(plan.frequency, plan.durationInMonths);
  return Math.ceil(plan.durationInMonths / frequencyMonths);
}

function getReturnAmount(plan: PlanType, rowCount: number): number {
  return plan.capacity * (plan.growth / (100 * rowCount));
}

/** Create a timeline based on plan and previous timelines */
export function createTimeline(
  plan: PlanType,
  selectedFrom: RowType | null,
  timelines: DateTimelineRow
): DateTimelineRow {
  // new timeline

  if (timelines === null || Object.keys(timelines).length === 0 || selectedFrom === null) {
    return newTimeline(plan);
  }
  // existing timeline
  else {
    return existingTimeline(plan, selectedFrom, timelines);
  }
}

function newTimeline(plan: PlanType): DateTimelineRow {
  const rowCount = getRowCount(plan);
  const returnAmount: number = getReturnAmount(plan, rowCount);

  const dateAndRows: DateTimelineRow = {};
  const currentDate: Date = new Date();

  let sum = 0;
  for (let i = 1; i <= rowCount; i++) {

    currentDate.setMonth(currentDate.getMonth() + getFrequencyMonths(plan.frequency, plan.durationInMonths));
    const returnDate = currentDate.toISOString().split("T")[0];
    const row: RowType = {
      planNo: 1,
      returnDate,
      returnAmount,
      total: sum + returnAmount,
      reInvestmentAmount: 0,
      returnAmountList: [returnAmount],
      growth: 0,
      matched: false,
      plan,
      reInvest: false,
      uniqueId: Math.random().toString(36).substring(2, 6),
    }

    dateAndRows[returnDate] = row;
    sum += returnAmount;
  }
  return dateAndRows;
}

function existingTimeline(
  plan: PlanType,
  selectedFrom: RowType,
  timelines: DateTimelineRow
): DateTimelineRow {

  const rowCount = getRowCount(plan);
  const returnAmount: number = getReturnAmount(plan, rowCount);

  const selectedFromDate: Date = new Date(selectedFrom.returnDate);

  markReinvest(timelines, selectedFrom);

  // update the investment amount
  timelines[selectedFrom.returnDate].reInvestmentAmount = (plan.capacity + plan.hub);

  let sum = timelines[selectedFrom.returnDate].total;
  for (let i = 1; i <= rowCount; i++) {

    selectedFromDate.setMonth(selectedFromDate.getMonth() + getFrequencyMonths(plan.frequency, plan.durationInMonths));
    const returnDate = selectedFromDate.toISOString().split("T")[0];
    let row: any = {};
    if (timelines[returnDate] == null) {
      row = {
        planNo: 1 + selectedFrom.planNo,
        returnDate,
        returnAmount,
        total: sum + returnAmount,
        leftoverUsed: 0,
        growth: 0,
        matched: false,
        plan,
        returnAmountList: [returnAmount],
        uniqueId: Math.random().toString(36).substring(2, 6),
      }
    }
    else {
      const returnAmountList = timelines[returnDate].returnAmountList;
      returnAmountList.push(returnAmount);
      row = {
        planNo: 1 + selectedFrom.planNo,
        returnDate,
        returnAmount: timelines[returnDate].returnAmount + returnAmount,
        total: sum + returnAmount+ timelines[returnDate].returnAmount,
        leftoverUsed: 0,
        growth: 0,
        matched: true,
        plan,
        returnAmountList,
        uniqueId: Math.random().toString(36).substring(2, 6),
      }
      sum += timelines[returnDate].returnAmount;
    }

    timelines[returnDate] = row;
    sum += returnAmount;
  }
  
  // sorting the dates
  let newTimelines: DateTimelineRow = {};
  const keys = Object.keys(timelines);
  keys.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  for (let i = 0; i < keys.length; i++) {
    const date = keys[i];
    newTimelines[date] = timelines[date];
  }

  return newTimelines;
}

export function defragmentReturnAmountList (list: number[]):string {
  const listString = list.map((item, idx) => "$"+item.toFixed(2)+ (idx === list.length - 1 ? "" : " + ")).join("");
  return listString
}

function markReinvest(timelines: DateTimelineRow, selectedFrom: RowType) {
  const keys = Object.keys(timelines);
  for (let i = 0; i < keys.length; i++) {
    const date = keys[i];
    timelines[date].reInvest = true;
    if (date === selectedFrom.returnDate)
      return;
    }
}