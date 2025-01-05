import React, { useState } from "react";
import { Table, Button, Form, Accordion } from "react-bootstrap";
import "./styles/TimelineTable.css";

type Plan = {
  id: number;
  name: string;
  amount: number;
  duration: number; // in months
  returns: number; // as a percentage
};

type RowData = {
  date: string;
  returnSum: number;
  planId: number | null;
};

const plans: Plan[] = [
  { id: 1, name: "Plan A", amount: 500, duration: 6, returns: 10 },
  { id: 2, name: "Plan B", amount: 1000, duration: 12, returns: 15 },
  { id: 3, name: "Plan C", amount: 2000, duration: 24, returns: 20 },
];

const TimelineTable: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>([]);

  const addRow = () => {
    const newDate = new Date();
    newDate.setMonth(newDate.getMonth() + rows.length * 6);

    setRows([
      ...rows,
      {
        date: newDate.toISOString().split("T")[0],
        returnSum:
          rows.length > 0 ? rows[rows.length - 1].returnSum + 500 : 500,
        planId: null,
      },
    ]);
  };

  const handlePlanSelect = (index: number, planId: number) => {
    const updatedRows = [...rows];
    updatedRows[index].planId = planId;
    setRows(updatedRows);
  };

  return (
    <div className="timeline-table-container">
      <h2 className="timeline-title">Investment Timeline</h2>
      <Button variant="primary" onClick={addRow} className="mb-3">
        Add Timeline Row
      </Button>
      <Table bordered hover responsive className="timeline-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Return Sum (USDT)</th>
            <th>Reinvestment Option</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{row.date}</td>
                <td>{row.returnSum}</td>
                <td>
                  <Accordion>
                    <Accordion.Button as={Button} variant="link" eventKey="0">
                      Expand
                    </Accordion.Button>
                    <Accordion.Collapse eventKey="0">
                      <div className="expandable-content">
                        <Form.Group controlId={`plan-select-${index}`}>
                          <Form.Label>Select Plan</Form.Label>
                          <Form.Control
                            as="select"
                            onChange={(e) =>
                              handlePlanSelect(index, parseInt(e.target.value))
                            }
                            value={row.planId || ""}
                          >
                            <option value="">Select a plan</option>
                            {plans
                              .filter((plan) => plan.amount <= row.returnSum)
                              .map((plan) => (
                                <option key={plan.id} value={plan.id}>
                                  {plan.name} - {plan.amount} USDT
                                </option>
                              ))}
                          </Form.Control>
                        </Form.Group>
                      </div>
                    </Accordion.Collapse>
                  </Accordion>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TimelineTable;
