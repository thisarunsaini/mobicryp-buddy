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
import { PlanType } from "../../../types/PlanType";
import { createTimeline, defragmentReturnAmountList } from "../../../utils/growthPlannerUtils";
import { DateTimelineRow } from "../../../types/Timeline";
import GrowthPlannerModal from "./component/GrowthPlannerModal";
import { RowType } from "../../../types/RowType";
import { CLIENT_PLANS } from "../../../constants/commonConstants";

export const InvestmentTimeline: React.FC = () => {
  const [timelines, setTimelines] = useState<DateTimelineRow>({});
  const [backupTimelines, setBackupTimelines] = useState<DateTimelineRow>({});
  const [selectedRow, setSelectedRow] = useState<RowType | null>();
  const [filteredPlans, setFilteredPlans] = useState<PlanType[]>([]);
  const [PlantListing, setPlantListing] = useState<PlanType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState<string | number>(0);
  const [yearsSpent, setYearsSpent] = useState("No Plans Selected");

  const scrollToBottom = () => { setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }), 100); }


  const handlePlanSelect = (planId: any) => {
    const selectedPlan = PlantListing.find(p => p.planId == planId);
    if (!selectedPlan) return;

    const newTimeline = createTimeline(
      selectedPlan,
      null,
      {}
    );

    setTimelines(newTimeline);
    setBackupTimelines(newTimeline);
    setTotalInvestment(selectedPlan.capacity+selectedPlan.hub);
    scrollToBottom();
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
    setTotalInvestment(plan.capacity+plan.hub+totalInvestment);
    scrollToBottom();
  };

  useEffect(() => {
    const keys = Object.keys(timelines);

    if (keys.length === 0 || timelines == null){
      setTotalInvestment(0);
      setTotalEarnings(0);
      setYearsSpent("No Plans Selected");
      return;
    }

    const firstDate = new Date(new Date());
    const lastDate = new Date(timelines[keys[keys.length - 1]].returnDate);

    let years = lastDate.getFullYear() - firstDate.getFullYear();
    let months = lastDate.getMonth() - firstDate.getMonth();

    // Adjust if months go negative
    if (months < 0) {
      years--;
      months += 12;
    }

    const yearMonthDisplay = `${years} year(s) and ${months} month(s)`;
    const finalTotal = timelines[keys[keys.length - 1]]?.total || 0;

    setTotalEarnings(finalTotal.toFixed(2));
    setYearsSpent(yearMonthDisplay)
  }, [timelines]);


  useEffect(() => {
    const clientPlans: PlanType[] = JSON.parse(sessionStorage.getItem(CLIENT_PLANS) ?? "[]");
    setPlantListing(clientPlans)
    console.log("clientPlans", clientPlans);
  }, []);

  return (<>
    {PlantListing?.length > 0 && <Container className="my-4">
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
                      <span className="text-danger"> {(timelines[date].reInvestmentAmount && timelines[date].reInvestmentAmount > 0) ?
                        " -$" + timelines[date].reInvestmentAmount.toFixed(2)
                        : ""
                      }</span>
                    </td>
                    <td>
                      {!timelines[date].reInvest && <div className="d-flex align-items-center w-100">
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
          <p><strong>Total Span:</strong> {yearsSpent}</p>
          <p><strong>Total Investment:</strong> ${totalInvestment}</p>
          {/* <p><strong>Total Earnings:</strong> ${parseInt(totalEarnings) - (
            (timelines[Object.keys(timelines)[0]].plan.capacity
            + timelines[Object.keys(timelines)[0]].plan.hub).toFixed(2)
            )}</p> */}
        </Card.Body>
      </Card>
    </Container>}
  </>
  );
};