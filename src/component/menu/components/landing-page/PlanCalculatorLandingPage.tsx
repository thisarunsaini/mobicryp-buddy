import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { urlPath } from "../../../utils/imageUtils";
import { Heading } from "../../../common/Heading";

const PlanCalculatorLandingPage: React.FC = () => {
  return (
    <Container className="plan-calculator-section">
      <Row className="px-2">
        <Col>
          <Heading
            heading="Plan Calculator"
            headerPosition="start"
            subHeading="Use our Plan Calculator to estimate your potential returns based on your USDT investment."
            subHeaderPosition="justify"
          />
          <Link to="/calculator">Calculate Now</Link>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <Image
            className="image-landing"
            src={urlPath("assets/undrawCalculator.svg")}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default PlanCalculatorLandingPage;
