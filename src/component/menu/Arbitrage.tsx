import React from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import "./styles/Arbitrage.css"; // Custom CSS for styling
import { ArbitrageModal } from "./components/arbitrage/ArbitrageModal";

const slideVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: 100, transition: { duration: 0.5 } },
};

const Arbitrage: React.FC = () => {
  const slides = [
    "Discover the strategy Mobicryp uses to maximize profits!",
    "This strategy is known as Arbitrage.",
    "Let's explore arbitrage with a clear definition and a perfectly fitting example!",
    "First: Buy USDT in Dubai, Purchase USDT at ₹100.",
    "Second: Sell USDT in India, Sell USDT at ₹102.",
    "Third: Step 3: Calculate Profit, Profit = (Selling Price - Purchase Price) × Quantity",
    "Example Calculation: Amount Lent: 1000 USDT, Cost in Dubai: ₹100, Selling Price in India: ₹102, Profit per Trade: ₹2000.",
    "Long-Term Profit Calculation: Day Trade Profit: ₹2000, Total Profit Over 730 Days: ₹14,60,000.",
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [showVideo, setShowVideo] = React.useState(false);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleClose = () => setShowVideo(false);
  const handleShow = () => setShowVideo(true);

  return (
    <div className="arbitrage-container">
      <Container>
        {currentSlide < slides.length - 1 ? (
          <motion.div
            className="arbitrage-card"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key={currentSlide}
          >
            <h2 className="slide-title">{slides[currentSlide]}</h2>
          </motion.div>
        ) : (
          <>
            <Row>
              <Col>
                <h2 className="text-center">Arbitrage Model Overview</h2>
                <h6 className="text-center">
                  Let's see how Mobicryp Maximizes Profit through Currency Arbitrage!
                </h6>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Card className="arbitrage-card-main mt-4 shadow border-0">
                  <Card.Body>
                    <h5 className="card-title">Step 1: Buy USDT in Dubai</h5>
                    <p className="card-text">
                      Purchase USDT at <strong>₹100</strong>.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="arbitrage-card-main mt-4 shadow border-0">
                  <Card.Body>
                    <h5 className="card-title">Step 2: Sell USDT in India</h5>
                    <p className="card-text">
                      Sell USDT at <strong>₹102</strong>.
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="arbitrage-card-main mt-4 shadow border-0">
                  <Card.Body>
                    <h5 className="card-title">Step 3: Calculate Profit</h5>
                    <p className="card-text">
                      Profit = (Selling Price - Purchase Price) × Quantity
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card className="arbitrage-card-main mt-4 shadow border-0">
                  <Card.Body>
                    <h4 className="card-title">Example Calculation</h4>
                    <p>
                      <strong>Amount Lent:</strong> 1000 USDT
                    </p>
                    <p>
                      <strong>Cost in Dubai:</strong> ₹100
                    </p>
                    <p>
                      <strong>Selling Price in India:</strong> ₹102
                    </p>
                    <p>
                      <strong>Profit per Trade:</strong> ₹2000
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card className="arbitrage-card-main mt-4 shadow border-0">
                  <Card.Body>
                    <h4 className="card-title">Long-Term Profit Calculation</h4>
                    <p>
                      <strong>Day Trade Profit:</strong> ₹2000
                    </p>
                    <p>
                      <strong>Total Profit Over 730 Days:</strong> ₹14,60,000
                    </p>
                    <Button
                      variant="secondary"
                      onClick={handleShow}
                      className="mt-3"
                    >
                      Watch Video
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}

        <Row>
          <Col>
            <div className="arbitrage-controls my-5">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="control-btn"
              >
                Previous
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="control-btn"
              >
                Next
              </button>
            </div>

            <div className="arbitrage-progress">
              <p className="progress-text">
                {currentSlide + 1}/{slides.length}
              </p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${((currentSlide + 1) / slides.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

          </Col>
        </Row>
            {/* Video Modal */}
            <ArbitrageModal showVideo={showVideo} handleClose={handleClose} />
      </Container>
    </div>
  );
};

export default Arbitrage;
