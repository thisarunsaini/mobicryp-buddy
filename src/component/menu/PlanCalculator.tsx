import React from "react";
import { Container, Row, Col, Image, Carousel } from "react-bootstrap";
import UsdtPrice from "../utils/component/UsdtPrice";
import "./styles/PlanCalculator.css";
import FrequencySelect from "./components/plan-calculator/FrequencySelect";
import { Calculator } from "./components/plan-calculator/Calculator";
import { Frequency } from "../types/PlanType";

const PlanCalculator: React.FC = () => {
  const [frequency, setFrequency] = React.useState<Frequency>(Frequency.Daily);

  return (
    <Container className="plan-calculator-container">
      <Row>
        <Col>
          <div className="title-col-div">
            <h2 className="text-center">Plan Calculator</h2>
            <hr></hr>
            <h6 className="text-center">
              <UsdtPrice />
            </h6>
          </div>
          <br></br>
        </Col>
      </Row>

      <Row>
        <Col md={12} lg={6} xl={6}>
          <FrequencySelect setFrequency={setFrequency} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Calculator frequency={frequency} />
        </Col>
        <Col className="d-flex justify-content-center align-items-center">
          <div className="plan-calculator-img-div">
            <Carousel data-bs-theme="dark">
              <Carousel.Item>
                <Image
                  className="image-plan-crypt w-100"
                  src="assets/undrawMoney.svg"
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  className="image-plan-crypt w-100"
                  src="assets/undrawCryptocurrencey.svg"
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  className="image-plan-crypt w-100"
                  src="assets/undrawMoneyChart.svg"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PlanCalculator;
