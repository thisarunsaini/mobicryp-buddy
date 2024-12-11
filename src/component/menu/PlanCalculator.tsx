import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import UsdtPrice from "../utils/component/UsdtPrice";
import "./styles/PlanCalculator.css";
import FrequencySelect from "../utils/component/FrequencySelect";

const PlanCalculator: React.FC = () => {
  const [mintingType, setMintingType] = useState<string>("Manual");
  const [hubAmount, setHubAmount] = useState<number | string>("");
  const [hubCapacity, setHubCapacity] = useState<number | string>("");
  const [duration, setDuration] = useState<number | string>("");
  const [returnPercentage, setReturnPercentage] = useState<number | string>("");
  const [installmentSpan, setInstallmentSpan] = useState<number | string>("");
  const [result, setResult] = useState<{
    totalReturn: number;
    perReturn: number;
    totalInvestment: number;
  }>({
    totalReturn: 0,
    perReturn: 0,
    totalInvestment: 0,
  });
  const [showInstallment, setShowInstallment] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const calculateReturns = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const hubAmountNum = parseFloat(hubAmount as string);
    const hubCapacityNum = parseFloat(hubCapacity as string);
    const durationNum = parseFloat(duration as string);
    const returnPercentageNum = parseFloat(returnPercentage as string);

    if (
      hubAmountNum <= 0 ||
      hubCapacityNum <= 0 ||
      durationNum <= 0 ||
      returnPercentageNum <= 0
    ) {
      setError("All fields must have positive values.");
      return;
    }

    let totalReturn = 0;
    let perReturn = 0;
    const totalInvestment = hubAmountNum + hubCapacityNum;

    if (mintingType === "Manual") {
      totalReturn = hubCapacityNum * (returnPercentageNum / 100);
      perReturn = totalReturn / durationNum;
    } else if (mintingType === "Auto") {
      const installmentSpanNum = parseFloat(installmentSpan as string);
      if (installmentSpanNum <= 0) {
        setError("Installment span must be positive.");
        return;
      }
      totalReturn = hubCapacityNum * (returnPercentageNum / 100);
      perReturn = totalReturn / installmentSpanNum;
    }

    setResult({ totalReturn, perReturn, totalInvestment });
    setError(null);
  };

  const handleMintingTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedType = event.target.value;
    setMintingType(selectedType);
    setShowInstallment(selectedType === "Auto");
  };

  const clearFields = () => {
    setHubAmount("");
    setHubCapacity("");
    setDuration("");
    setReturnPercentage("");
    setInstallmentSpan("");
    setResult({ totalReturn: 0, perReturn: 0, totalInvestment: 0 });
    setError(null);
    setMintingType("Manual");
    setShowInstallment(false);
  };

  return (
    <Container className="plan-calculator-container">
      <Row>
        <Col>
        <div className="title-col-div">
          <h2 className="text-center">Plan Calculator</h2>
          <hr></hr>
          <h6 className="text-center">
            <UsdtPrice />
          </h6>
        </div>
          <br></br>
        </Col>
      </Row>
      <Row>
        <Col>
        <FrequencySelect/>
          <Card.Body className="p-4">
            <Form onSubmit={calculateReturns}>
              <Row className="mb-4">
                <Col>
                  <Form.Group controlId="hubAmount">
                    <Form.Label>Hub Amount (USDT)</Form.Label>
                    <Form.Control
                      name="hubAmount"
                      type="number"
                      placeholder="Enter Hub Amount"
                      className="input-field styled-input"
                      value={hubAmount}
                      onChange={(e) => setHubAmount(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <Form.Group controlId="hubCapacity">
                    <Form.Label>Hub Capacity (USDT)</Form.Label>
                    <Form.Control
                      name="hubCapacity"
                      type="number"
                      placeholder="Enter Hub Capacity"
                      className="input-field styled-input"
                      value={hubCapacity}
                      onChange={(e) => setHubCapacity(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group controlId="duration">
                    <Form.Label>Duration (Months)</Form.Label>
                    <Form.Control
                      name="duration"
                      type="number"
                      placeholder="Enter Duration"
                      className="input-field styled-input"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="returnPercentage">
                    <Form.Label>Return Percentage (%)</Form.Label>
                    <Form.Control
                      name="returnPercentage"
                      type="number"
                      placeholder="Enter Return Percentage"
                      className="input-field styled-input"
                      value={returnPercentage}
                      onChange={(e) => setReturnPercentage(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="mintingType" className="mb-4">
                <Form.Label>Minting Type</Form.Label>
                <Form.Control
                  as="select"
                  name="mintingType"
                  className="input-field styled-input"
                  value={mintingType}
                  onChange={handleMintingTypeChange}
                >
                  <option value="Manual">Manual</option>
                  <option value="Auto">Auto</option>
                </Form.Control>
              </Form.Group>

              {showInstallment && (
                <Form.Group controlId="installmentSpan" className="mb-4">
                  <Form.Label>Installment Span (Months)</Form.Label>
                  <Form.Control
                    name="installmentSpan"
                    type="number"
                    placeholder="Enter Installment Span"
                    className="input-field styled-input"
                    value={installmentSpan}
                    onChange={(e) => setInstallmentSpan(e.target.value)}
                    required
                  />
                </Form.Group>
              )}

              {error && <Alert variant="danger">{error}</Alert>}

              <div className="text-center mt-3">
                <Button
                  variant="success"
                  size="lg"
                  type="submit"
                  className="btn-calculate me-2 btn-hover"
                >
                  Calculate
                </Button>
                <Button
                  variant="outline-secondary"
                  size="lg"
                  onClick={clearFields}
                  className="btn-clear btn-hover"
                >
                  Clear
                </Button>
              </div>
            </Form>

            <Card className="mt-4 result-card">
              <Card.Body className="text-center result-card-body animated-result">
                <h4 className="fw-bold">
                  Total Return:{" "}
                  <span className="text-success result-highlight">
                    {result.totalReturn.toFixed(2)} USDT
                  </span>
                </h4>
                <h5 className="fw-bold">
                  {mintingType === "Manual"
                    ? "Per Month Return"
                    : "Per Span Return"}
                  :{" "}
                  <span className="text-info result-highlight">
                    {result.perReturn.toFixed(2)} USDT
                  </span>
                </h5>
                <h5>
                  Total Investment:{" "}
                  <span className="text-warning result-highlight">
                    {result.totalInvestment.toFixed(2)} USDT
                  </span>
                </h5>
              </Card.Body>
            </Card>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

export default PlanCalculator;
