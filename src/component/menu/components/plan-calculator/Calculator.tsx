import { useEffect } from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import { Frequency, PlanType } from "../../../types/PlanType";
import React from "react";
import { PlanListType } from "../../../types/PlanTypes";
import { PlantListing } from "../../../constants/jsons/PlanList";
import "./styles/Calculator.css";
import { Link } from "react-router-dom";

export const Calculator: React.FC<{ frequency: Frequency }> = (props) => {
  const { frequency } = props;
  const [planList] = React.useState<PlanListType>(PlantListing);
  const [hubCapacity, setHubCapacity] = React.useState<number | string>("");
  const [duration, setDuration] = React.useState<number | string>("");
  const [grossReturn, setGrossReturn] = React.useState<number | string>("");
  const [mintType, setMintType] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [selectedHub, setSelectedHub] = React.useState<number>();
  // const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    clearDependentFields();
  }, [frequency]);

  // Update dependent fields when a hub is selected
  const handleHubSelection = (event: any) => {
    clearDependentFields();
    const index = event.target.selectedIndex;
    const plan: PlanType | null = PlantListing[frequency]?.[index - 1] || null;
    console.log(plan, index);

    if (plan) {
      setSelectedHub(plan.hub);
      setHubCapacity(plan.capacity);
      setDuration(plan.durationInMonths);
      setGrossReturn(plan.growth);
      setMintType(plan.type);
      setName(plan.hubName);
    }
  };

  // Clear dependent fields
  const clearDependentFields = () => {
    setHubCapacity("");
    setDuration("");
    setGrossReturn("");
    setMintType("");
    setName("");
    setSelectedHub(0);
  };

  return frequency && planList ? (
    <Card.Body className="p-4">
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="hubSelection">
              <Form.Label>Hub</Form.Label>
              <Form.Control
                as="select"
                onChange={handleHubSelection}
                className="input-field styled-input"
                value={selectedHub}
              >
                <option selected value="0">
                  Select Hub
                </option>
                {planList[frequency]?.map((plan: PlanType, index: number) => (
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
        </Row>

        <Row className="mb-4">
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
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
