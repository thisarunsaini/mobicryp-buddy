import React, { useState } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import "./styles/GrowthPlanner.css";

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
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [investedAmount, setInvestedAmount] = useState<number>(0);
  const [timeline, setTimeline] = useState<Investment[]>([]);

  const handleInvest = () => {
    if (selectedPlan === null || investedAmount <= 0) return;

    const plan = plans.find((p) => p.id === selectedPlan);
    if (!plan || investedAmount < plan.minInvestment) {
      alert(`Minimum investment for ${plan?.name} is ${plan?.minInvestment}`);
      return;
    }

    const dailyReturn =
      (investedAmount * plan.dailyReturn) / plan.minInvestment;
    const returns = Array.from({ length: 30 }, (_, i) => dailyReturn * (i + 1));

    setTimeline((prev) => [
      ...prev,
      {
        planId: plan.id,
        startDate: new Date().toLocaleDateString(),
        investedAmount,
        returns,
      },
    ]);

    setInvestedAmount(0);
    setSelectedPlan(null);
  };

  const handleReinvest = (returns: number) => {
    const smallestPlan = plans.reduce(
      (min, plan) => (plan.minInvestment < min ? plan.minInvestment : min),
      Infinity
    );
    if (returns >= smallestPlan) {
      setInvestedAmount(returns);
      setSelectedPlan(plans[0].id); // Auto-select the smallest plan
    } else {
      alert(`Reinvestment requires at least ${smallestPlan}`);
    }
  };

  return (
    <Container className="investment-timeline mt-5">
      <h1 className="text-center mb-4">Investment Timeline</h1>

      <Form className="mb-4">
        <Form.Group controlId="planSelect">
          <Form.Label>Select a Plan</Form.Label>
          <Form.Control
            as="select"
            value={selectedPlan || ""}
            onChange={(e) => setSelectedPlan(Number(e.target.value))}
          >
            <option value="" disabled>
              Choose a Plan
            </option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} (Min: {plan.minInvestment})
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="investmentAmount">
          <Form.Label>Investment Amount</Form.Label>
          <Form.Control
            type="number"
            value={investedAmount}
            onChange={(e) => setInvestedAmount(Number(e.target.value))}
            placeholder="Enter amount"
          />
        </Form.Group>

        <Button variant="primary" onClick={handleInvest} className="mt-3">
          Invest
        </Button>
      </Form>

      <h2 className="mt-5">Investment History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Plan</th>
            <th>Start Date</th>
            <th>Invested Amount</th>
            <th>Returns</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {timeline.map((investment, index) => {
            const plan = plans.find((p) => p.id === investment.planId);
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{plan?.name}</td>
                <td>{investment.startDate}</td>
                <td>{investment.investedAmount}</td>
                <td>
                  {investment.returns.map((ret, i) => (
                    <span key={i} className="return-item">
                      Day {i + 1}: ₹{ret.toFixed(2)}
                      {i !== investment.returns.length - 1 && ", "}
                    </span>
                  ))}
                </td>
                <td>
                  <Button
                    variant="success"
                    onClick={() =>
                      handleReinvest(
                        investment.returns[investment.returns.length - 1]
                      )
                    }
                  >
                    Reinvest
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};
