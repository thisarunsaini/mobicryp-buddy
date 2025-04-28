import React, { useState } from 'react';
import { Table, Container, Button, Form, Row, Col, Modal } from 'react-bootstrap';
import { PlantListing } from '../constants/jsons/PlanList';
import { PlanType, Frequency, MintType } from '../types/PlanType';
import { Heading } from '../common/Heading';
import { CLIENT_PLANS } from '../constants/commonConstants';
import './styles/PlanList.css';

interface AddPlanModalProps {
  show: boolean;
  handleClose: () => void;
  handleAddPlan: () => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  resetPlan: () => void;
  newPlan: Omit<PlanType, 'planId'>;
}

const AddPlanModal: React.FC<AddPlanModalProps> = ({
  show,
  handleClose,
  handleAddPlan,
  handleChange,
  resetPlan,
  newPlan,
}) => {

  const checkFields = () => {
    if (!newPlan.hubName || !newPlan.hub || !newPlan.capacity || !newPlan.durationInMonths) {
      alert('Please fill all the fields');
      return false;
    }
    return true;
  };

  const handleSave = () => {
    if(checkFields() === true) {
      handleAddPlan();
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Container fluid>
            <div className="modal-form-grid">
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Control
                    name="hubName"
                    placeholder="Plan Name"
                    value={newPlan.hubName}
                    onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Control
                    name="hub"
                    type="number"
                    min={1}
                    placeholder="Hub($)"
                    value={newPlan.hub || ''}
                    onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Control
                    name="capacity"
                    type="number"
                    min={1}
                    placeholder="Capacity($)"
                    value={newPlan.capacity || ''}
                    onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Control
                    name="durationInMonths"
                    type="number"
                    min={1}
                    placeholder="Duration(months)"
                    value={newPlan.durationInMonths || ''}
                    onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Control
                    name="growth"
                    type="number"
                    min={1}
                    placeholder="ROI(%)"
                    value={newPlan.growth || ''}
                    onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Control
                    as="select"
                    name="frequency"
                    placeholder="select frequency"
                    value={newPlan.frequency}
                    onChange={(e) => handleChange(e as unknown as React.ChangeEvent<HTMLSelectElement>)}
                  >
                    {Object.values(Frequency).map((freq) => (
                      <option key={freq} value={freq}>
                        {freq}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Control
                    as="select"
                    name="type"
                    value={newPlan.type}
                    onChange={(e) => handleChange(e as unknown as React.ChangeEvent<HTMLSelectElement>)}
                  >
                    {Object.values(MintType).map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Control
                    name="remarks"
                    placeholder="anything to add"
                    value={newPlan.remarks}
                    onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
                  />
                </Col>
              </Row>
            </div>
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { resetPlan(); }}>
          Reset
        </Button>
        <Button onClick={() => { handleSave(); }}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
};

const PlanList: React.FC = () => {
  const [plans, setPlans] = useState<PlanType[]>(() => {
    const storedPlans = localStorage.getItem(CLIENT_PLANS);
    if (storedPlans) {
      return JSON.parse(storedPlans);
    }
    return PlantListing;
  });
  const [newPlan, setNewPlan] = useState<Omit<PlanType, 'planId'>>({
    hub: 0,
    hubName: '',
    capacity: 0,
    durationInMonths: 0,
    frequency: Frequency.Daily,
    growth: 0,
    type: MintType.Manual,
    remarks: '',
    removable: true,
  });
  const [showAddModal, setShowAddModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPlan((prev) => ({
      ...prev,
      [name]:
        name === 'hub' ||
        name === 'capacity' ||
        name === 'durationInMonths' ||
        name === 'growth'
          ? Number(value)
          : value,
    }));
  };

  // const checkFields = () => {
  //   if (!newPlan.hubName || !newPlan.hub || !newPlan.capacity || !newPlan.durationInMonths) {
  //     alert('Please fill all the fields');
  //     return false;
  //   }
  //   return true;
  // };

  const handleAddPlan = () => {
    // if (checkFields() === false) {
    //   return;
    // }

    const newPlanWithId: PlanType = {
      ...newPlan,
      removable: true,
      planId: plans.length ? plans[plans.length - 1].planId + 1 : 1,
    };
    const updatedPlans = [...plans, newPlanWithId];
    setPlans(updatedPlans);
    localStorage.setItem(CLIENT_PLANS, JSON.stringify(updatedPlans));
    resetPlan();
    alert('Plan added successfully!');
  };

  const resetPlan = () => {
    setNewPlan({
      hub: 0,
      hubName: '',
      capacity: 0,
      durationInMonths: 0,
      frequency: Frequency.Daily,
      growth: 0,
      type: MintType.Manual,
      remarks: '',
      removable: true,
    });
  };

  const handleRemovePlan = (planId: number) => {
    const updatedPlans = plans.filter((p) => p.planId !== planId);
    setPlans(updatedPlans);
    localStorage.setItem(CLIENT_PLANS, JSON.stringify(updatedPlans));
  };

  return (
    <Container className="plan-list-section">
      <Row>
        <Col>
          <Heading
            className="mb-4 pb-4"
            heading="List of Plans"
            subHeading="List of plans available for minting"
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button variant='link'  className="m-0 p-0 text-info" onClick={() => setShowAddModal(true)}>Add New Plan</Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive className="my-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Hub Name</th>
            <th>Hub</th>
            <th>Capacity</th>
            <th>Duration (Months)</th>
            <th>Return %</th>
            <th>Frequency</th>
            <th>Mint Type</th>
            <th>Remarks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.planId}>
              <td>{plan.planId}</td>
              <td>{plan.hubName}</td>
              <td>{plan.hub}</td>
              <td>{plan.capacity}</td>
              <td>{plan.durationInMonths}</td>
              <td>{plan.growth}</td>
              <td>{plan.frequency}</td>
              <td>{plan.type}</td>
              <td>{plan.remarks}</td>
              <td>
               {plan?.removable && <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemovePlan(plan.planId)}
                >
                  Remove
                </Button>}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddPlanModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        handleAddPlan={handleAddPlan}
        handleChange={handleChange}
        resetPlan={resetPlan}
        newPlan={newPlan}
      />
    </Container>
  );
};

export default PlanList;
