import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./styles/GrowthPlanner.css";
import { Heading } from "../common/Heading";
import { InvestmentTimeline } from "./components/growth-planner/InvestmentTimeline";

export const GrowthPlanner: React.FC = () => {
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
      <InvestmentTimeline />
    </Container>
  );
};
