import React from 'react';
import { Table, Container } from 'react-bootstrap';

const PlanList: React.FC = () => {
    const plans = [
        { hub: '500 USDT', capacity: '1000 USDT', returnPercent: '10%' },
        { hub: '1000 USDT', capacity: '2000 USDT', returnPercent: '12%' },
        // Add more plans
    ];

    return (
        <Container className="my-5">
            <h2>Plan List</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Hub</th>
                        <th>Capacity</th>
                        <th>% Return</th>
                    </tr>
                </thead>
                <tbody>
                    {plans.map((plan, index) => (
                        <tr key={index}>
                            <td>{plan.hub}</td>
                            <td>{plan.capacity}</td>
                            <td>{plan.returnPercent}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default PlanList;
