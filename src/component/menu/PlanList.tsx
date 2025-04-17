import React, { useState } from 'react';
import { Table, Container, Button, Form, Row, Col } from 'react-bootstrap';
import { PlantListing } from '../constants/jsons/PlanList';
import { PlanType, Frequency, MintType } from '../types/PlanType';

const PlanList: React.FC = () => {
  const [plans, setPlans] = useState<PlanType[]>(PlantListing);
  const [newPlan, setNewPlan] = useState<Omit<PlanType, 'planId'>>({
    hub: 0,
    hubName: '',
    capacity: 0,
    durationInMonths: 0,
    frequency: Frequency.Daily,
    growth: 0,
    type: MintType.Manual,
    remarks: '',
  });

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

  const handleAddPlan = () => {
    const newPlanWithId: PlanType = {
      ...newPlan,
      planId: plans.length ? plans[plans.length - 1].planId + 1 : 1,
    };
    setPlans([...plans, newPlanWithId]);
    PlantListing.push(newPlanWithId);
    setNewPlan({
      hub: 0,
      hubName: '',
      capacity: 0,
      durationInMonths: 0,
      frequency: Frequency.Daily,
      growth: 0,
      type: MintType.Manual,
      remarks: '',
    });
    alert('Plan added successfully!');
  };

  const handleRemovePlan = (planId: number) => {
    setPlans(plans.filter((p) => p.planId !== planId));
  };

  return (
    <Container className="my-5">
      <h3 className='text-light'>Plan List</h3>
      <Table striped bordered hover className="my-3">
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
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleRemovePlan(plan.planId)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <hr className='text-light'/>
      <h5 className="mt-5 text-light">Add New Plan</h5>
      <Form className="mb-3">
        <Row>
          <Col>
            <Form.Control
              name="hubName"
              placeholder="Hub Name"
              value={newPlan.hubName}
              onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
            />
          </Col>
          <Col>
            <Form.Control
              name="hub"
              type="number"
              placeholder="Hub"
              onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
            />
          </Col>
          <Col>
            <Form.Control
              name="capacity"
              type="number"
              placeholder="Capacity"
              onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
            />
          </Col>
          <Col>
            <Form.Control
              name="durationInMonths"
              type="number"
              placeholder="Duration"
              onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
            />
          </Col>
          <Col>
            <Form.Control
              name="growth"
              type="number"
              placeholder="Return %"
              onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
            />
          </Col>
          <Col>
            <Form.Control
              as="select"
              name="frequency"
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
          <Col>
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
          <Col>
            <Form.Control
              name="remarks"
              placeholder="Remarks"
              onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
            />
          </Col>
        </Row>
        <Row className="mt-3">
        <Col>
            <Button onClick={handleAddPlan}>Add</Button>
            <Button variant="secondary" className="ms-2" onClick={() =>
              setNewPlan({
                hub: 0,
                hubName: '',
                capacity: 0,
                durationInMonths: 0,
                frequency: Frequency.Daily,
                growth: 0,
                type: MintType.Manual,
                remarks: '',
              })
            }>
              Reset
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default PlanList;
