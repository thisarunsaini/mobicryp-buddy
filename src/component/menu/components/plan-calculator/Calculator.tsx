import { useEffect } from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import { Frequency, PlanType } from "../../../types/PlanType";
import React from "react";
import { PlantListing } from "../../../constants/jsons/PlanList";
import "./styles/Calculator.css";
import { Link } from "react-router-dom";
import { CLIENT_PLANS } from "../../../constants/commonConstants";

export const Calculator: React.FC<{ frequency: Frequency }> = (props) => {
  const { frequency } = props;
  const [clubbedPlan, setClubbedPlan] = React.useState<any>(null);
  //  plan properties
  const [hubCapacity, setHubCapacity] = React.useState<number | string>("");
  const [duration, setDuration] = React.useState<number | string>("");
  const [grossReturn, setGrossReturn] = React.useState<number | string>("");
  const [mintType, setMintType] = React.useState<string>("");
  const [selectedHub, setSelectedHub] = React.useState<number | string>("");
  const [result, setResult] = React.useState<string>("");
  // ends here

  useEffect(() => {
    const clientPlans:PlanType[] = localStorage.getItem(CLIENT_PLANS)? JSON.parse(localStorage.getItem(CLIENT_PLANS)?? '[]'): PlantListing.toString();
    const plans = clubPlansPerFrequency(clientPlans);
    setClubbedPlan(plans);
  }, []);

  useEffect(() => {
    clearDependentFields();
  }, [frequency]);

  const clubPlansPerFrequency = (planList:PlanType[]) => {
    const holdingPlans = planList.filter((plan) => plan.frequency === Frequency.Holding);
    const dailyPlans = planList.filter((plan) => plan.frequency === Frequency.Daily);
    const quarterlyPlans = planList.filter((plan) => plan.frequency === Frequency.Quarterly);
    const halfYearlyPlans = planList.filter((plan) => plan.frequency === Frequency.HalfYearly);
    
    return {
      [Frequency.Holding]: holdingPlans,
      [Frequency.Daily]: dailyPlans,
      [Frequency.Quarterly]: quarterlyPlans,
      [Frequency.HalfYearly]: halfYearlyPlans,
    }
  }

  // Update dependent fields when a hub is selected
  const handleHubSelection = (event: any) => {
    clearDependentFields();
    const index = event.target.selectedIndex;
    const plan: PlanType | null = clubbedPlan[frequency]?.[index - 1] || null;

    if (plan) {
      setSelectedHub(plan.hub);
      setHubCapacity(plan.capacity);
      setDuration(plan.durationInMonths);
      setGrossReturn(plan.growth);
      setMintType(plan.type);
      setResult(
        `$${plan.capacity*plan.growth/100} | ${(plan.durationInMonths/12).toFixed(0)+"."+plan.durationInMonths%12} Year(s)`
      );
    }
  };

  // Clear dependent fields
  const clearDependentFields = () => {
    setHubCapacity("");
    setDuration("");
    setGrossReturn("");
    setMintType("");
    setSelectedHub("");
    setResult("");
  };

  return frequency && clubbedPlan ? (
    <Card.Body className="p-4">
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="hubSelection">
              <Form.Label>Plan Name</Form.Label>
              <Form.Control
                as="select"
                onChange={handleHubSelection}
                className="input-field styled-input"
                value={selectedHub}
              >
                <option selected value="0">
                  Select Plan
                </option>
                {clubbedPlan[frequency]?.map((plan: PlanType, index: number) => (
                  <option key={index + 1} value={plan.hub}>
                    {plan.hubName}
                  </option>
                )) || <></>}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
          <Form.Group controlId="name">
              <Form.Label>Hub</Form.Label>
              <Form.Control
                type="text"
                value={selectedHub}
                readOnly
                className="input-field styled-input"
              />
            </Form.Group>
            
          </Col>
          <Col md={6}>
          <Form.Group controlId="hubCapacity">
              <Form.Label>Capacity (USDT)</Form.Label>
              <Form.Control
                type="text"
                value={hubCapacity}
                readOnly
                className="input-field styled-input"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Form.Group controlId="grossReturn">
              <Form.Label>Gross Return (%)</Form.Label>
              <Form.Control
                type="text"
                value={grossReturn}
                readOnly
                className="input-field styled-input"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
          <Form.Group controlId="duration">
              <Form.Label>Duration (Months)</Form.Label>
              <Form.Control
                type="text"
                value={duration}
                readOnly
                className="input-field styled-input"
              />
            </Form.Group>
            
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
          <Form.Group controlId="mintType">
              <Form.Label>Mint Type</Form.Label>
              <Form.Control
                type="text"
                value={mintType}
                readOnly
                className="input-field styled-input"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="name">
              <Form.Label>Total Return | Span</Form.Label>
              <Form.Control
                type="text"
                value={result}
                readOnly
                className="input-field styled-input"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* {error && <Alert variant="danger">{error}</Alert>} */}

        <div className="mt-3 w-100 d-flex align-items-center justify-content-between">
          <Button
            variant="outline-secondary"
            onClick={clearDependentFields}
            className="btn-clear btn-hover"
          >
            Clear
          </Button>
          <Link className="power-plan-style" to={"/growth"}>
            <span>Plan Your Returns with power plans, click here</span>
          </Link>
        </div>
      </Form>
    </Card.Body>
  ) : (
    <></>
  );
};
