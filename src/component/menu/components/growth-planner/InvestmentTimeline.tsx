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
import { FaChartLine, FaInfoCircle, FaTimesCircle } from "react-icons/fa";
import "./styles/InvestmentTimeline.css";
import { PlantListing } from "../../../constants/jsons/PlanList";
import { PlanType } from "../../../types/PlanType";
import { createTimeline, defragmentReturnAmountList } from "../../../utils/growthPlannerUtils";
import { DateTimelineRow } from "../../../types/Timeline";
import GrowthPlannerModal from "./component/GrowthPlannerModal";
import { RowType } from "../../../types/RowType";

export const InvestmentTimeline: React.FC = () => {
  const [timelines, setTimelines] = useState<DateTimelineRow>({});
  const [backupTimelines, setBackupTimelines] = useState<DateTimelineRow>({});
  const [summary, setSummary] = useState({ yearsSpent: 0, totalEarnings: 0, totalInvestment: 0 });
  const [selectedRow, setSelectedRow] = useState<RowType | null>();
  const [filteredPlans, setFilteredPlans] = useState<PlanType[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handlePlanSelect = (planId: any) => {
    const selectedPlan = PlantListing.find(p => p.planId === planId);
    if (!selectedPlan ) return;

    const newTimeline = createTimeline(
      selectedPlan,
      null,
      {}
    );

    setTimelines(newTimeline);
    setBackupTimelines(newTimeline);
    setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }), 100);
  };

  const handleRowSelection = (row: RowType) => {
    setSelectedRow(row);
    const feasiblePlans = PlantListing.filter((plan) => plan.capacity + plan.hub <= row.total);
    setFilteredPlans(feasiblePlans);
  };

  const handleClearSelection = (row: RowType, index: number) => {
    setTimelines(backupTimelines);
    setSelectedRow(null);
    setFilteredPlans([]);
  }

  const handleReinvestmentPlanSelect = (plan: PlanType) => {
    if (!selectedRow) return;

    setBackupTimelines(timelines);
    setTimelines(createTimeline(
      plan,
      selectedRow,
      timelines,
    ));
    setSelectedRow(null);
    setFilteredPlans([]);
  };

  useEffect(() => {
    const keys = Object.keys(timelines);

    if (keys.length === 0) return;

    const firstDate = new Date(new Date().toLocaleDateString("en-IN"));
    const lastDate = new Date(timelines[keys[keys.length - 1]].returnDate);
    const yearDiff = (lastDate.getTime() - firstDate.getTime()) / (1000 * 3600 * 24 * 365);

    const uniquePlans = new Set(Object.values(timelines).map(t => t.plan.planId));
    const totalInvestment = Array.from(uniquePlans).reduce((sum, planId) => {
      const plan = PlantListing.find(p => p.planId === planId);
      return plan ? sum + plan.hub + plan.capacity : sum;
    }, 0);
    
    const finalTotal = timelines[keys.length - 1]?.total || 0;

    setSummary({
      yearsSpent: yearDiff,
      totalEarnings: finalTotal,
      totalInvestment
    });
  }, [timelines]);

  return (
    <Container className="my-4">
      <GrowthPlannerModal show={showModal} handleClose={() => setShowModal(false)} />
      <Button variant="info" className="mb-3" onClick={() => setShowModal(true)}>
        <FaInfoCircle className="me-2" /> Growth Planner Info
      </Button>

      {/* Plan Selector */}
      <Form.Group controlId="planSelect">
        <Form.Label>Select a Plan to Begin</Form.Label>
        <Form.Select
          onChange={(e) => {

            handlePlanSelect(e.target.value);
          }}
        >
          <option value="">-- Select a Plan --</option>
          {PlantListing.map((plan) => (
            <option key={plan.planId} value={plan.planId}>
              {plan.hubName}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* Unified Table */}
      {timelines && Object.keys(timelines).length > 0 &&
        <Card className="mt-4">
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Plan No</th>
                  <th>Plan Name</th>
                  <th>Return Date</th>
                  <th>Return Amount</th>
                  <th>Total</th>
                  <th>Select Term</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(timelines).map((date, idx) => (
                  <tr key={idx} className={`${timelines[date].matched ? "matched" : ""}`}>
                    <td>{timelines[date].planNo}</td>
                    <td>{timelines[date].plan.hubName}</td>
                    <td>{timelines[date].returnDate}</td>
                    <td>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip>
                            {`Return: ${defragmentReturnAmountList(timelines[date].returnAmountList)}`}
                          </Tooltip>
                        }
                      >
                        <span>${timelines[date].returnAmount.toFixed(2)}</span>
                      </OverlayTrigger>
                    </td>
                    <td>${timelines[date].total.toFixed(2)} 
                      <span className="text-danger"> {(timelines[date].reInvestmentAmount && timelines[date].reInvestmentAmount > 0)?
                       " -$"+timelines[date].reInvestmentAmount.toFixed(2)
                       :""
                       }</span>
                    </td>
                    <td>
                      { !timelines[date].reInvest && <div className="d-flex align-items-center w-100">
                        <Form.Check
                          type="radio"
                          name="termSelect"
                          onChange={() => handleRowSelection(timelines[date])}
                          checked={selectedRow?.uniqueId === timelines[date].uniqueId}
                        />
                        {selectedRow?.uniqueId === timelines[date].uniqueId &&
                          <FaTimesCircle
                            className="text-danger ms-2"
                            style={{ cursor: "pointer", fontSize: "1.2rem" }}
                            onClick={() => handleClearSelection(timelines[date], idx)}
                          />
                        }
                      </div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      }

      {/* Plan Selector after row selection */}
      {selectedRow && (
        <div className="my-3 p-3 rounded">
          <h5>
            Reinvest ${selectedRow.total.toFixed(2)} – Choose a Plan:
          </h5>
          <Form.Select
            onChange={(e) => {
              const selected = filteredPlans.find(p => p.planId === Number(e.target.value));
              if (selected) handleReinvestmentPlanSelect(selected);
            }}
          >
            <option value="">-- Select --</option>
            {filteredPlans.map((plan) => (
              <option key={plan.planId} value={plan.planId}>
                {plan.hubName}
              </option>
            ))}
          </Form.Select>
        </div>
      )}

      {/* Summary */}
      <Card className="mt-4 bg-dark text-white">
        <Card.Body>
          <h4 className="mb-3"><FaChartLine className="me-2" />Investment Summary</h4>
          <p><strong>Total Years Spent:</strong> {summary.yearsSpent.toFixed(1)} years</p>
          <p><strong>Total Investment:</strong> ${summary.totalInvestment.toFixed(2)}</p>
          <p><strong>Total Earnings:</strong> ${summary.totalEarnings.toFixed(2)}</p>
        </Card.Body>
      </Card>
    </Container>
  );
};