import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CommunityLandingPage: React.FC = () => {
  return (
    <Container className="community-info-section">
      <Row>
        <Col>
        <h2>Community Information</h2>
                <p>
                    Join our vibrant community to share insights, strategies, and experiences with other Mobycryp users.
                    Together, we can maximize our trading potential!
                </p>
            <Link to="/community">Join Community</Link>
        </Col>
       <Col className="d-flex justify-content-center align-items-center">
       <Image className="image-landing"
            src="assets/undrawCommunity.svg"
          />
       </Col>
       </Row>
    </Container>
  );
};

export default CommunityLandingPage;
