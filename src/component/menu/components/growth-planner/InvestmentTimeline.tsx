import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Form,
  Tooltip,
  OverlayTrigger,
  Card,
  Button,
} from "react-bootstrap";
import { FaTimesCircle, FaChartLine, FaInfoCircle } from "react-icons/fa";
import "./styles/InvestmentTimeline.css";
import { PlantListing } from "../../../constants/jsons/PlanList";
import { PlanType } from "../../../types/PlanType";
import { createTimeline } from "../../../utils/growthPlannerUtils"; // We'll define getFrequencyMonths locally
import { Timeline } from "../../../types/Timeline";
import GrowthPlannerModal from "./component/GrowthPlannerModal";

// 1) Add local getFrequencyMonths. We'll pass a boolean if user wants to treat daily as monthly.
function getFrequencyMonths(freq: string, dailyAsMonthly: boolean = false): number {
  // If frequency is daily but user wants monthly approach, return 1 month:
  if (freq === "Daily" && dailyAsMonthly) {
    return 1;
  }
  switch (freq) {
    case "Daily":
      // By default, daily is handled in createTimeline, but if we do monthly approach, we use 1 above
      return 1 / 30;
    case "Quarterly":
      return 3;
    case "Half Yearly":
      return 6;
    case "Holding":
      return 1; // Added case for Holding plans
    default:
      return 6; // fallback
  }
}

export const InvestmentTimeline: React.FC = () => {
  const [timelines, setTimelines] = useState<Timeline[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [summary, setSummary] = useState({ yearsSpent: 0, totalEarnings: 0, totalInvestment: 0 });
  const [pendingReinvest, setPendingReinvest] = useState<{
    leftover: number;
    timelineIndex: number;
    rowIndex: number;
  } | null>(null);
  const [filteredPlans, setFilteredPlans] = useState<PlanType[]>([]);
  // 2) A boolean toggle that user can switch to treat daily as monthly
  const [treatDailyAsMonthly, setTreatDailyAsMonthly] = useState(false);

  /** Handle plan selection from the <select>. */
  const handlePlanSelect = (selectedPlan: PlanType | null) => {
    // 1. Reset everything
    setTimelines([]);
    setPendingReinvest(null);
    setFilteredPlans([]);

    // 2. If user selected "Select a plan" (or null), just reset, do nothing more
    if (!selectedPlan) {
      return;
    }

    // 3. Otherwise, user selected an actual plan => create a brand new timeline
    const leftoverIfNew = selectedPlan.capacity + selectedPlan.hub;
    const freqMonths = getFrequencyMonths(selectedPlan.frequency, treatDailyAsMonthly);

    const newTimeline = createTimeline(
      selectedPlan,
      leftoverIfNew,
      [],
      undefined,
      freqMonths,
      treatDailyAsMonthly
    );

    // Overwrite the entire timelines with the new timeline array
    setTimelines([newTimeline]);

    // Scroll to bottom
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
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

    // => If we have feasible plans, let's auto-scroll to the center
    if (feasiblePlans.length > 0) {
      setTimeout(() => {
        const planSelectorDiv = document.getElementById("plan-reinvest-selector");
        if (planSelectorDiv) {
          planSelectorDiv.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  };

  /**
   * For demonstration, we pick the FIRST plan that can be purchased with `carryAmount`.
   * A real UI might let the user pick from a list of matching plans, etc.
   */
  const findPlanEligible = (carryAmount: number) => {
    const allPlans: PlanType[] = Object.values(PlantListing).flat();
    return allPlans.find((p) => p.capacity + p.hub <= carryAmount);
  };

  /**
   * Clicking the red cross resets the selection in that table,
   * and removes the newly appended table (the last timeline) if
   * it was triggered by this table’s selection.
   */
  const resetSelection = (timelineIndex: number) => {
    const updated = timelines.map((tl, idx) => {
      if (idx === timelineIndex) {
        return { ...tl, selectedRow: null };
      }
      return tl;
    });

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

    // After removing the appended timeline, clear the plan selector
    setPendingReinvest(null);
    setFilteredPlans([]);

    setTimelines([...updated]);
  };

  const handleReinvestmentPlanSelect = (plan: PlanType) => {
    if (!pendingReinvest) return;

    const { leftover, timelineIndex, rowIndex } = pendingReinvest;

    const freqMonths = getFrequencyMonths(plan.frequency, treatDailyAsMonthly);
    const appendedTimeline = createTimeline(
      plan,
      leftover,
      timelines,
      { timelineIndex, rowIndex },
      freqMonths,
      treatDailyAsMonthly
    );

    setTimelines((prev) => {
      const updated = [...prev, appendedTimeline];
      // auto-scroll
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 100);
      return updated;
    });

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
      <GrowthPlannerModal show={showModal} handleClose={() => setShowModal(false)} />
      {/* Plan Selection */}
      
        <Button
          variant="outline-primary"
          className="mb-3 d-flex align-items-center"
          style={{
            borderRadius: "50px",
            padding: "10px 15px",
            fontSize: "16px",
            fontWeight: "bold",
            display: "flex",
            gap: "10px",
          }}
          onClick={() => setShowModal(true)}
        >
          <FaInfoCircle size={20} style={{ color: "#007bff" }} />
          <span>Growth Planner Info</span>
        </Button>
      
      <div className="mb-4">
        <Form.Group controlId="planSelection">
          <Form.Label>Choose a plan:</Form.Label>
          <Form.Select
            onChange={(e) => {
              const selectedId = Number(e.target.value);
              if (!selectedId) {
                // user selected the "Select a plan" placeholder
                handlePlanSelect(null);
                return;
              }
              const selectedPlan = Object.values(PlantListing)
                .flat()
                .find((plan:PlanType) => plan.planId === selectedId);
              if (selectedPlan) {
                handlePlanSelect(selectedPlan);
              } else {
                // If no plan found, also reset/do nothing
                handlePlanSelect(null);
              }
            }}
          >
            <option value="">-- Select a Plan --</option>
            {
              Object.values(PlantListing)
                .flat()
                .map((plan:PlanType) => (
                  <option key={plan.planId} value={plan.planId}>
                    {plan.hubName}
                  </option>
                ))
              }
          </Form.Select>
        </Form.Group>
      </div>

      {/* Render each timeline as a card */}
      {timelines.map((timeline, tIndex) => {
        const isFaded = tIndex < timelines.length - 1;
        const isLast = tIndex === timelines.length - 1;

        return (
          <Card
            key={tIndex}
            className={`mt-4 ${isFaded ? "faded" : ""} ${isLast ? "fadeIn" : ""}`}
            style={{ opacity: isFaded ? 0.5 : 1 }}
          >
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
              {timeline.plan.hubName}
              {timeline.plan.frequency === "Daily" && (
                <Form.Check
                  type="checkbox"
                  className="ms-3"
                  label="Treat as Monthly"
                  checked={timeline.treatDailyAsMonthly ?? false}
                  onChange={(e) => {
                    const newVal = e.target.checked;
                    const freqMonths = getFrequencyMonths(
                      timeline.plan.frequency,
                      newVal
                    );
                    const reBuilt = createTimeline(
                      timeline.plan,
                      timeline.leftoverUsed ?? (timeline.plan.capacity + timeline.plan.hub),
                      timelines,
                      timeline.triggeredFrom,
                      freqMonths,
                      newVal
                    );
                    reBuilt.treatDailyAsMonthly = newVal;

                    const updated = timelines.map((tl, i) => {
                      if (i === tIndex) {
                        return reBuilt;
                      }
                      return tl;
                    });
                    setTimelines(updated);
                  }}
                />
              )}
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
                                  {`Leftover: $${row.leftoverUsed?.toFixed(2) ?? 0}`}
                                  <br />
                                  {`Growth: $${row.growth?.toFixed(2) ?? 0}`}
                                  <br />
                                  {`Matched: $${row.matched?.toFixed(2) ?? 0}`}
                                  {row.notes && (
                                  <small className="text-warning d-block mt-1">
                                    <FaInfoCircle className="me-1" />
                                    {row.notes}
                                  </small>
                                )}
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
        <div id="plan-reinvest-selector" className="mt-3 p-3">
          <h5>Choose a plan to re-invest ${pendingReinvest.leftover.toFixed(2)}</h5>
          <Form.Select
            onChange={(e) => {
              const selectedId = Number(e.target.value);
              if (!selectedId) return;
              const selectedPlan = filteredPlans.find((plan) => plan.planId === selectedId);
              if (selectedPlan) {
                handleReinvestmentPlanSelect(selectedPlan);
              }
            }}
          >
            <option value="">-- Select a Plan --</option>
            {filteredPlans.map((plan) => (
              <option key={plan.planId} value={plan.planId}>
                {plan.hubName}
              </option>
            ))}
          </Form.Select>
        </div>
      )}

      {/* Summary Section */}
      <div
        className="summary mt-4 p-4 shadow"
        style={{
          background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
          borderRadius: "10px",
          color: "#fff",
        }}
      >
        <h4 className="mb-3 d-flex align-items-center">
          <FaChartLine className="me-2" size={24} />
          Investment Summary
        </h4>
        <p className="fs-5">
          <strong>Total Years Spent:</strong> {summary.yearsSpent.toFixed(1)} Years
        </p>
        <p className="fs-5">
          <strong>Total Investment:</strong> ${summary.totalInvestment.toFixed(2)}
        </p>
        <p className="fs-5">
          <strong>Total Earnings:</strong> ${summary.totalEarnings.toFixed(2)}
        </p>
        <hr style={{ opacity: 0.5 }} />
        <p className="text-white-50">
          Your financial growth at a glance. Keep selecting and reinvesting for 
          greater returns and an even brighter future!
        </p>
      </div>
    </Container>
  );
};