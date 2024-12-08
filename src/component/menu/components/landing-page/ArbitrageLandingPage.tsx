import { Container, Row, Col, Image } from "react-bootstrap";

const ArbitrageLandingPage: React.FC = () => {
  return (
    <Container className="arbitrage-model-section">
      <Row>
        <Col>
          <h2>Arbitrage Model</h2>
          <hr></hr>
          <p>
            Arbitrage in cryptocurrencies involves buying and selling the same
            digital asset across different exchanges to take advantage of price
            discrepancies. Traders can exploit temporary market inefficiencies
            by acquiring a cryptocurrency at a lower price on one platform and
            selling it at a higher price on another, thereby securing a
            risk-free profit. This strategy contributes to market efficiency by
            helping to synchronize prices across various cryptocurrency
            exchanges.
          </p>
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
        <Image className="image-landing"
            src="assets/undrawArbitrage.svg"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ArbitrageLandingPage;
