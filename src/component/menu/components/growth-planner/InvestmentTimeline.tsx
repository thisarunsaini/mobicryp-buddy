import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Form,
  Tooltip,
  OverlayTrigger,
  Card,
} from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa";
import "./styles/InvestmentTimeline.css";
import { PlantListing } from "../../../constants/jsons/PlanList";
import { PlanType, Frequency } from "../../../types/PlanType";

interface RowType {
  period: number;
  returnDate: string;
  total: number;
  carriedFromDateMatches?: number; // For display or debugging if needed
  returnAmount: number; // newly added
}

interface Timeline {
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

export const InvestmentTimeline: React.FC = () => {
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [summary, setSummary] = useState({ yearsSpent: 0, totalEarnings: 0, totalInvestment: 0 });
  const [pendingReinvest, setPendingReinvest] = useState<{
    leftover: number;
    timelineIndex: number;
    rowIndex: number;
  } | null>(null);
  const [filteredPlans, setFilteredPlans] = useState<PlanType[]>([]);

  /**
   * Create the new timeline from a plan, given:
   * - leftover (carry) from a previously selected row
   * - which table/row triggered this new table (to handle date matching, etc.)
   */
  const createTimeline = (
    plan: PlanType,
    carryAmount: number | null,
    triggeredBy?: { timelineIndex: number; rowIndex: number }
  ): Timeline => {
    // If no carry, we just use plan capacity as the base
    // but usually, we’re called with a leftover from the prior selection
    let leftover = carryAmount ?? 0;

    // Subtract capacity + hub from leftover
    // (Because “hub” is also a cost, as clarified)
    leftover -= plan.capacity;
    leftover -= plan.hub;

    // If it’s negative, it means we can’t afford it,
    // but for simplicity we’ll allow it to go negative
    // or skip creation. You could handle it differently if needed.
    if (leftover < 0) {
      console.warn(
        `Insufficient leftover (${
          carryAmount ?? 0
        }) for plan with capacity + hub = ${plan.capacity + plan.hub}`
      );
      leftover = 0;
    }

    // The frequency in months. For instance, if plan has frequency = HalfYearly => 6
    const frequencyMonths = getFrequencyMonths(plan.frequency);
    const totalPeriods = Math.ceil(plan.durationInMonths / frequencyMonths);
    
    // Determine base date: if triggered, use the triggering row's returnDate; else current date
    let baseDate = new Date();
    if (triggeredBy) {
      const priorTL = timelines[triggeredBy.timelineIndex];
      const triggeredRow = priorTL.rows[triggeredBy.rowIndex];
      baseDate = new Date(triggeredRow.returnDate);
    }

    let runningTotal = 0;
    const rows: RowType[] = [];

    for (let i = 0; i < totalPeriods; i++) {
      // Clone the base date and add frequency months
      const date = new Date(baseDate);
      date.setMonth(date.getMonth() + (i + 1) * frequencyMonths);

      const growthThisPeriod = (plan.capacity * plan.growth) / 100 / totalPeriods;

      // Check for date-match carry from prior timeline using returnAmount
      let matchedReturnAmount = 0;
      if (triggeredBy) {
        const priorTL = timelines[triggeredBy.timelineIndex];
        if (priorTL) {
          for (let r = triggeredBy.rowIndex + 1; r < priorTL.rows.length; r++) {
            const oldRow = priorTL.rows[r];
            if (oldRow.returnDate === date.toLocaleDateString()) {
              matchedReturnAmount += oldRow.returnAmount;
            }
          }
        }
      }

      let rowReturnAmount = 0;
      if (i === 0) {
        rowReturnAmount = leftover + growthThisPeriod + matchedReturnAmount;
      } else {
        rowReturnAmount = growthThisPeriod + matchedReturnAmount;
      }

      const rowTotal = (i === 0 ? 0 : runningTotal) + rowReturnAmount;
      runningTotal = rowTotal;

      rows.push({
        period: i + 1,
        returnDate: date.toLocaleDateString(),
        total: rowTotal,
        returnAmount: rowReturnAmount,
      });
    }

    return {
      plan,
      rows,
      selectedRow: null,
      triggeredFrom: triggeredBy,
      leftoverUsed: carryAmount ?? 0,
    };
  };

  /** Convert plan frequency to numeric months. */
  const getFrequencyMonths = (freq: Frequency): number => {
    switch (freq) {
      case Frequency.Daily:
        return 1 / 30; // Example: ~ daily
      case Frequency.Quarterly:
        return 3;
      case Frequency.HalfYearly:
        return 6;
      case Frequency.Holding:
        // Not specified, example of 1 month or something custom:
        return 1;
      default:
        return 6;
    }
  };

  /** Handle plan selection from the <select>. */
  const handlePlanSelect = (plan: PlanType) => {
    // If the user just picks a plan with no leftover from a prior row,
    // we start the timeline from “0 leftover.” So we effectively start with plan.capacity.
    // But the code above subtracts plan.capacity from leftover. So if leftover=0, row #1 = 0 - capacity = negative.
    // That might not be desired. Typically, if the user is buying from scratch, we can treat leftover as plan.capacity + plan.hub.
    // However, the instructions aren’t totally clear on how to handle a brand-new plan from scratch.
    // For demonstration, let’s treat leftover = plan.capacity + plan.hub, so the first row is effectively 0.
    // If you want to show something else, adjust accordingly.
    const leftoverIfNew = plan.capacity + plan.hub;

    const newTimeline = createTimeline(plan, leftoverIfNew, undefined);
    setTimelines((prev) => [...prev, newTimeline]);
  };

  /**
   * Called whenever a user selects a radio button in a row.
   * We:
   * 1. Mark that row as selected
   * 2. Disables other rows in that table
   * 3. Append a new table whose first row is leftover + new growth
   */
  const handleRowSelection = (timelineIndex: number, rowIndex: number) => {
    const updated = timelines.map((tl, idx) => {
      if (idx === timelineIndex) {
        return { ...tl, selectedRow: rowIndex };
      }
      return tl;
    });

    setTimelines(updated);

    // Now get the carry from that row:
    const carryOverAmount = updated[timelineIndex].rows[rowIndex].total;

    // Filter plans
    const allPlans: PlanType[] = Object.values(PlantListing).flat();
    const feasiblePlans = allPlans.filter(
      (p) => p.capacity + p.hub <= carryOverAmount
    );

    // Set our component state for pending reinvest
    setPendingReinvest({ leftover: carryOverAmount, timelineIndex, rowIndex });
    setFilteredPlans(feasiblePlans);
  };

  /**
   * For demonstration, we pick the FIRST plan that can be purchased with `carryAmount`.
   * A real UI might let the user pick from a list of matching plans, etc.
   */
  const findPlanEligible = (carryAmount: number) => {
    const allPlans: PlanType[] = Object.values(PlantListing).flat();
    // “total cost” = plan.capacity + plan.hub
    return allPlans.find((p) => p.capacity + p.hub <= carryAmount);
  };

  /**
   * Clicking the red cross resets the selection in that table,
   * and removes the newly appended table (the last timeline) if
   * it was triggered by this table’s selection.
   */
  const resetSelection = (timelineIndex: number) => {
    // 1) Clear selectedRow in that timeline
    const updated = timelines.map((tl, idx) => {
      if (idx === timelineIndex) {
        return { ...tl, selectedRow: null };
      }
      return tl;
    });

    // 2) Remove the last timeline if it was triggered by the same table’s row
    const lastIndex = updated.length - 1;
    if (lastIndex >= 0) {
      const lastTL = updated[lastIndex];
      if (
        lastTL.triggeredFrom &&
        lastTL.triggeredFrom.timelineIndex === timelineIndex
      ) {
        updated.pop();
      }
    }

    setTimelines([...updated]);
  };

  const handleReinvestmentPlanSelect = (plan: PlanType) => {
    if (!pendingReinvest) return;

    // We have leftover from pendingReinvest
    const { leftover, timelineIndex, rowIndex } = pendingReinvest;

    // Create new timeline
    const appendedTimeline = createTimeline(plan, leftover, {
      timelineIndex,
      rowIndex,
    });

    setTimelines((prev) => [...prev, appendedTimeline]);

    // Clear pending reinvest
    setPendingReinvest(null);
    setFilteredPlans([]);
  };

  // Recompute summary whenever timelines change
  useEffect(() => {
    let years = 0;
    let totalInvestment = 0;
    let lastTableEarnings = 0;

    timelines.forEach((tl) => {
      years += tl.plan.durationInMonths / 12;
      totalInvestment += (tl.plan.capacity + tl.plan.hub);
    });

    if (timelines.length > 0) {
      const lastTl = timelines[timelines.length - 1];
      if (lastTl.rows.length > 0) {
        const finalRow = lastTl.rows[lastTl.rows.length - 1];
        lastTableEarnings = finalRow.total;
      }
    }

    setSummary({
      yearsSpent: years,
      totalEarnings: lastTableEarnings,
      totalInvestment: totalInvestment
    });
  }, [timelines]);

  return (
    <Container>
      {/* Plan Selection */}
      <div className="mb-4">
        <Form.Group controlId="planSelection">
          <Form.Label>Choose a plan:</Form.Label>
          <Form.Select
            onChange={(e) => {
              const hubNum = Number(e.target.value);
              if (!hubNum) return;
              const selectedPlan = Object.values(PlantListing)
                .flat()
                .find((plan) => plan.hub === hubNum);
              if (selectedPlan) {
                handlePlanSelect(selectedPlan);
              }
            }}
          >
            <option value="">-- Select a Plan --</option>
            {Object.entries(PlantListing).map(([frequency, plans]) => (
              <optgroup key={frequency} label={frequency}>
                {plans.map((plan: PlanType) => (
                  <option key={plan.hub} value={plan.hub}>
                    {plan.hubName}
                  </option>
                ))}
              </optgroup>
            ))}
          </Form.Select>
        </Form.Group>
      </div>

      {/* Render each timeline as a card */}
      {timelines.map((timeline, tIndex) => {
        // If this timeline triggered another table, we consider it “faded”
        // or if it’s not the very last table in the list
        // (some people only fade the timeline that “spawned” a new table)
        // For simplicity, let’s fade any timeline that is not the last:
        const isFaded = tIndex < timelines.length - 1;

        return (
          <Card
            key={tIndex}
            className={`mt-4 ${isFaded ? "faded" : ""}`}
            style={{ opacity: isFaded ? 0.5 : 1 }}
          >
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
              {timeline.plan.hubName}
            </Card.Header>
            <Card.Body>
              <div className="table-responsive">
                <Table striped bordered hover className="table-fixed">
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Return Date</th>
                      <th>Return Amount</th>
                      <th>Total Return</th>
                      <th>Select Term</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeline.rows.map((row, rowIndex) => {
                      const isSelected = timeline.selectedRow === rowIndex;
                      const isDisabled =
                        timeline.selectedRow !== null && !isSelected;
                      return (
                        <tr key={rowIndex}>
                          <td>{row.period}</td>
                          <td>{row.returnDate}</td>
                          <td>
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip>
                                  Return = leftover (if first row) + plan growth this period + any matched return from prior timeline.
                                </Tooltip>
                              }
                            >
                              <span>{row.returnAmount.toFixed(2)}</span>
                            </OverlayTrigger>
                          </td>
                          <td>
                            <OverlayTrigger
                              overlay={
                                <Tooltip>
                                  Carry from prior table included?{" "}
                                  {row?.carriedFromDateMatches
                                    ? row.carriedFromDateMatches
                                    : 0}
                                </Tooltip>
                              }
                            >
                              <span>{row.total.toFixed(2)}</span>
                            </OverlayTrigger>
                          </td>
                          <td className="d-flex justify-content-around align-items-center">
                            <Form.Check
                              type="radio"
                              name={`timeline-${tIndex}`}
                              onChange={() =>
                                handleRowSelection(tIndex, rowIndex)
                              }
                              disabled={isDisabled}
                              checked={isSelected}
                            />
                            {isSelected && (
                              <FaTimesCircle
                                className="text-danger ms-2"
                                style={{ cursor: "pointer", fontSize: "1.2rem" }}
                                onClick={() => resetSelection(tIndex)}
                              />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        );
      })}

      {/* Step 2: Choose a plan from the filtered list */}
      {pendingReinvest && (
        <div className="mt-3 p-3">
          <h5>Choose a plan to re-invest ${pendingReinvest.leftover.toFixed(2)}</h5>
          <Form.Select
            onChange={(e) => {
              const hubNum = Number(e.target.value);
              if (!hubNum) return;
              const selectedPlan = filteredPlans.find((plan) => plan.hub === hubNum);
              if (selectedPlan) {
                handleReinvestmentPlanSelect(selectedPlan);
              }
            }}
          >
            <option value="">-- Select a Plan --</option>
            {filteredPlans.map((plan) => (
              <option key={plan.hub} value={plan.hub}>
                {plan.hubName}
              </option>
            ))}
          </Form.Select>
        </div>
      )}

      {/* Summary Section */}
      <div className="summary mt-4 p-3 bg-dark rounded text-white">
        <h4>Investment Summary</h4>
        <p>
          <strong>Total Years Spent:</strong> {summary.yearsSpent.toFixed(1)} Years
        </p>
      <p>
          <strong>Total Investment:</strong> ${summary.totalInvestment.toFixed(2)}
        </p>
      <p>
          <strong>Total Earnings:</strong> ${summary.totalEarnings.toFixed(2)}
        </p>
      </div>
    </Container>
  );
};