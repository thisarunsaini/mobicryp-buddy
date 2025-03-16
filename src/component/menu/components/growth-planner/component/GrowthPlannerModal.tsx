import React from "react";
import { Modal, Button } from "react-bootstrap";

interface GrowthPlannerModalProps {
  show: boolean;
  handleClose: () => void;
}

const GrowthPlannerModal: React.FC<GrowthPlannerModalProps> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Understanding the Growth Planner</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Overview</h5>
        <p>The Growth Planner helps users track investments and reinvestments dynamically based on different plan frequencies.</p>

        <h5>Plan Types & Frequency Handling</h5>
        <ul>
          <li><strong>Holding:</strong> One row only, full return at end.</li>
          <li><strong>Daily:</strong> Returns calculated daily, can be treated as monthly.</li>
          <li><strong>Monthly & Other:</strong> Returns split over fixed intervals.</li>
        </ul>

        <h5>Key Features</h5>
        <ul>
          <li>Auto-filtered reinvestment options.</li>
          <li>Auto-scrolls to reinvestment section.</li>
          <li>Live recalculations when toggling 'Treat Daily Plans as Monthly'.</li>
          <li>Detailed tooltips showing exact return breakdowns.</li>
        </ul>

        <h5>Plan Selection & Timeline Generation</h5>
        <p>Upon selecting an investment plan, a timeline is created with expected returns.</p>

        <h5>Interactive Elements</h5>
        <ul>
          <li><strong>Row Selection:</strong> Enables reinvestment selection.</li>
          <li><strong>Deselecting:</strong> Clears reinvestment options.</li>
          <li><strong>Tooltip:</strong> Displays a breakdown of returns.</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GrowthPlannerModal;