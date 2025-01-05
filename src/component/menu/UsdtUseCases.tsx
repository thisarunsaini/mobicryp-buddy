import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaExchangeAlt,
  FaShoppingCart,
  FaGlobe,
  FaPiggyBank,
  FaBolt,
  FaMoneyBillWave,
} from "react-icons/fa";
import "./styles/UsdtUseCases.css";
import { Heading } from "../common/Heading";

const UsdtUseCases: React.FC = () => {
  return (
    <Container className="my-5 usdt-use-cases">
      <Heading
        className="mb-4 pb-4"
        heading="Global USDT Use Cases"
        subHeading="Tether (USDT) has revolutionized the financial world, offering a stable and flexible option for various transactions globally. Below are some of the most intensive and extensive use cases of USDT."
      />

      <Row className="g-4">
        {/* Remittances Use Case */}
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center">
              <FaExchangeAlt size={50} className="text-primary mb-3" />
              <Card.Title>Cross-border Remittances</Card.Title>
              <Card.Text>
                USDT allows fast and low-cost remittances across borders,
                bypassing traditional banking fees and delays.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* E-commerce Use Case */}
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center">
              <FaShoppingCart size={50} className="text-success mb-3" />
              <Card.Title>E-commerce Payments</Card.Title>
              <Card.Text>
                Many global e-commerce platforms accept USDT for its stability,
                providing an alternative to traditional currencies.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Global Transactions Use Case */}
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center">
              <FaGlobe size={50} className="text-danger mb-3" />
              <Card.Title>Global Transactions</Card.Title>
              <Card.Text>
                Businesses use USDT for global transactions, ensuring stability
                and avoiding volatility in foreign currencies.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Savings & Lending Use Case */}
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center">
              <FaPiggyBank size={50} className="text-warning mb-3" />
              <Card.Title>Savings & Lending</Card.Title>
              <Card.Text>
                USDT is widely used in DeFi platforms for lending, borrowing,
                and saving due to its stable value and ease of access.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Instant Payments Use Case */}
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center">
              <FaBolt size={50} className="text-info mb-3" />
              <Card.Title>Instant Payments</Card.Title>
              <Card.Text>
                USDT is perfect for fast, instant payments between individuals
                or businesses, offering both speed and security.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Crypto Trading Use Case */}
        <Col md={4}>
          <Card className="h-100 shadow-sm border-0">
            <Card.Body className="text-center">
              <FaMoneyBillWave size={50} className="text-dark mb-3" />
              <Card.Title>Crypto Trading</Card.Title>
              <Card.Text>
                Traders use USDT to hedge against volatility in the crypto
                markets, making it an ideal stablecoin for trade execution.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UsdtUseCases;
