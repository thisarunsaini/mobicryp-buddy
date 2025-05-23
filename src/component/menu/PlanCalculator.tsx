import React from "react";
import { Container, Row, Col, Image, Carousel } from "react-bootstrap";
import UsdtPrice from "../utils/component/UsdtPrice";
import "./styles/PlanCalculator.css";
import FrequencySelect from "./components/plan-calculator/FrequencySelect";
import { Calculator } from "./components/plan-calculator/Calculator";
import { Frequency } from "../types/PlanType";
import { urlPath } from "../utils/imageUtils";
import { Heading } from "../common/Heading";

const PlanCalculator: React.FC = () => {
  const [frequency, setFrequency] = React.useState<Frequency>(Frequency.Daily);

  return (
    <Container className="plan-calculator-section">
      <Row>
        <Col>
          <Heading
            className="mb-4 pb-4"
            heading="Plan Calculator"
            subHeading={<UsdtPrice />}
          />
        </Col>
      </Row>

      <Row>
        <Col md={12} lg={6} xl={6}>
          <FrequencySelect setFrequency={setFrequency} />
        </Col>
      </Row>

      <Row>
        <Col md={12} lg={6} xl={6}>
          <Calculator frequency={frequency} />
        </Col>
        <Col
          xl={6}
          lg={6}
          className="d-none d-xl-flex d-lg-flex justify-content-center align-items-center"
        >
          <div className="plan-calculator-img-div">
            <Carousel data-bs-theme="dark">
              <Carousel.Item>
                <Image
                  className="image-plan-crypt w-100"
                  src={urlPath("assets/undrawMoney.svg")}
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  className="image-plan-crypt w-100"
                  src={urlPath("assets/undrawCryptocurrencey.svg")}
                />
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  className="image-plan-crypt w-100"
                  src={urlPath("assets/undrawMoneyChart.svg")}
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
