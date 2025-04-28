import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import "./styles/HeroSectionLandingPage.css";
import { Link } from "react-router-dom";
import { urlPath } from "../../../utils/imageUtils";

const HeroSectionLandingPage: React.FC<{ text: string }> = (props) => {
  return (
    <Container
      fluid
      className="hero-section d-flex flex-column align-items-center justify-content-center text-center"
      style={{ position: "relative", zIndex: 1 }}
    >
      <Row className="px-2">
        <Col className="hero-section-col">
          <h3 className="hero-title animated-title">{props.text}</h3>
          <hr></hr>
          <p className="hero-subtitle animated-subtitle">
            Revolutionizing USDT Trading Across Borders
          </p>
          <Link className="text-dark link-button mt-5" to="/calculator">Now Start Calculating Your Future !!!</Link>
        </Col>
        <Col className="hero-section-col">
          <Image
            className="image-landing"
            src={urlPath("assets/undrawCrypto.svg")}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HeroSectionLandingPage;
