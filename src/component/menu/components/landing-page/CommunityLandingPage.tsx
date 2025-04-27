import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { urlPath } from "../../../utils/imageUtils";
import { Heading } from "../../../common/Heading";

const CommunityLandingPage: React.FC = () => {
  return (
    <Container className="community-info-section">
      <Row className="px-2">
        <Col>
          <Heading
            heading="Community Information"
            headerPosition="start"
            subHeading=" Join our vibrant community to share insights, strategies, and
            experiences with other Mobicryp users. Together, we can maximize our
            trading potential!"
            subHeaderPosition="justify"
          />
          <Link to="/community">Join Community</Link>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <Image
            className="image-landing"
            src={urlPath("assets/undrawCommunity.svg")}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default CommunityLandingPage;
