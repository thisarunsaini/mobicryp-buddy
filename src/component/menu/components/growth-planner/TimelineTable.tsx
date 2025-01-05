import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";

interface DataRow {
  id: number;
  name: string;
  returnAmount: number;
  date: string;
  details: string;
}

export const TimelineTable: React.FC = () => {
  // Sample data for the table
  const data: DataRow[] = [
    {
      id: 1,
      name: "Plan A",
      returnAmount: 100,
      date: "2025-01-01",
      details: "Details about Plan A.",
    },
    {
      id: 2,
      name: "Plan B",
      returnAmount: 200,
      date: "2025-02-01",
      details: "Details about Plan B.",
    },
    {
      id: 3,
      name: "Plan C",
      returnAmount: 300,
      date: "2025-03-01",
      details: "Details about Plan C.",
    },
  ];

  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [generatedTables, setGeneratedTables] = useState<number[]>([]);

  const handleRowExpand = (id: number) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  const handleApply = () => {
    if (expandedRow !== null) {
      setGeneratedTables((prev) => [...prev, expandedRow]);
      setExpandedRow(null);
    }
  };

  const handleClear = () => {
    setExpandedRow(null);
  };

  return (
    <div className="p-4 table-container">
      <h6>T1</h6>
      {/* Main Table */}
      <Table striped bordered hover responsive className="mt-0 table-dark">
        <thead>
          <tr>
            <th>Select</th>
            <th>#</th>
            <th>Plan Name</th>
            <th>Return Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <React.Fragment key={row.id}>
              {/* Main Row */}
              <tr>
                <td className="d-flex align-items-center justify-content-between">
                  <Form.Check
                    type="radio"
                    name="rowOption"
                    checked={expandedRow === row.id}
                    disabled={expandedRow !== null && expandedRow !== row.id}
                    onChange={() => handleRowExpand(row.id)}
                  />
                  {expandedRow === row.id ? (
                    <>
                      <Button variant="link" onClick={handleClear}>
                        <FaTimes color="red" />
                      </Button>
                      <Button
                        variant="link"
                        onClick={handleApply}
                        disabled={
                          expandedRow === null && expandedRow !== row.id
                        }
                      >
                        <FaCheck
                          color={
                            expandedRow !== null && expandedRow === row.id
                              ? "green"
                              : "grey"
                          }
                        />
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </td>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.returnAmount}</td>
                <td>{row.date}</td>
              </tr>

              {/* Expanded Row */}
              {expandedRow === row.id && (
                <tr>
                  <td colSpan={5}>
                    <div className="p-3 bg-light rounded">
                      <strong>Details:</strong> {row.details}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>

      {/* Generated Tables */}
      {generatedTables.map((tableId, index) => (
        <Table striped bordered hover responsive key={index}>
          <caption>{`T${index + 2}`}</caption>
          <thead>
            <tr>
              <th>#</th>
              <th>Plan Name</th>
              <th>Return Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data[tableId - 1].id}</td>
              <td>{data[tableId - 1].name}</td>
              <td>{data[tableId - 1].returnAmount}</td>
              <td>{data[tableId - 1].date}</td>
            </tr>
          </tbody>
        </Table>
      ))}
    </div>
  );
};
