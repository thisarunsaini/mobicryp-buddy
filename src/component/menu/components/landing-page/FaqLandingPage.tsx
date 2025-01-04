import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { urlPath } from "../../../utils/imageUtils";

const FaqLandingPage: React.FC = () => {
  return (
    <Container className="faqs-section">
      <Row>
        <Col>
          <h2>Frequently Asked Questions</h2>
          <hr></hr>
          <p>
            Have questions? Visit our FAQs section to find answers and get more
            information about our services.
          </p>
          <Link to="/faqs">View FAQs</Link>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <Image
            className="image-landing"
            src={urlPath("assets/undrawFaq.svg")}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default FaqLandingPage;
