import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const PlanCalculatorLandingPage: React.FC = () => {
  return (
    <Container className="plan-calculator-section">
      <Row>
        <Col>
          <h2>Plan Calculator</h2>
          <hr></hr>
          <p>
            Use our Plan Calculator to estimate your returns based on your
            investment in USDT.
          </p>
          <Link to="/calculator">Calculate Now</Link>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <Image className="image-landing" src="assets/undrawCalculator.svg" />
        </Col>
      </Row>
    </Container>
  );
};

export default PlanCalculatorLandingPage;
