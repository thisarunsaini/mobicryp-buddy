import React, { useState } from "react";
import { Container, Table, Button, Form, Col, Row } from "react-bootstrap";
import "./styles/GrowthPlanner.css";
import FrequencySelect from "./components/plan-calculator/FrequencySelect";
import { Calculator } from "./components/plan-calculator/Calculator";
import { Frequency } from "../types/PlanType";
import TimelineTable from "./components/growth-planner/TimelineTable";
import { Heading } from "../common/Heading";

// Sample Plans Data
const plans = [
  { id: 1, name: "Plan A", minInvestment: 1000, dailyReturn: 10 },
  { id: 2, name: "Plan B", minInvestment: 5000, dailyReturn: 50 },
  { id: 3, name: "Plan C", minInvestment: 10000, dailyReturn: 120 },
];

interface Investment {
  planId: number;
  startDate: string;
  investedAmount: number;
  returns: number[];
}

export const GrowthPlanner: React.FC = () => {
  const [timeline, setTimeline] = useState<Investment[]>([]);

  const [frequency, setFrequency] = React.useState<Frequency>(Frequency.Daily);

  return (
    <Container className="growth-planner-section">
      <Row>
        <Col>
          <Heading
            className="mb-4 pb-4"
            heading="Growth Planner"
            subHeading="Plan your investment and see the growth over time"
          />
        </Col>
      </Row>
      <TimelineTable />
    </Container>
  );
};
