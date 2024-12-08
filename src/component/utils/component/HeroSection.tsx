import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import UsdtPrice from "./UsdtPrice";
import "./styles/HeroSection.css";
import { Link } from "react-router-dom";

const HeroSection: React.FC<{ text: string }> = (props) => {
  return (
    <Container
      fluid
      className="hero-section d-flex flex-column align-items-center justify-content-center text-center"
      style={{ position: "relative", zIndex: 1 }}
    >
      <Row>
        <Col>
          <h1 className="hero-title animated-title">{props.text}</h1>
          <hr></hr>
          <p className="hero-subtitle animated-subtitle">
            Revolutionizing USDT Trading Across Borders
          </p>
            <Link
              to="/calculator"
            >
              Start Calculating Futures
            </Link>
        </Col>
        <Col>
          <Image
            className="hero-section-crypto"
            src="assets/undrawCrypto.svg"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSection;
