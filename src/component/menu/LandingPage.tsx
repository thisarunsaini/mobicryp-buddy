import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './styles/LandingPage.css'; // Your custom styles
import HeroSection from '../utils/component/HeroSection';

const LandingPage: React.FC = () => {
    return (
        <>
            <HeroSection text={"Welcome to Mobicryp Buddy"} />
            <Container className="arbitrage-model-section my-5">
                <Row>
                    <Col md={6}>
                        <h2>Arbitrage Model</h2>
                        <p>Arbitrage in cryptocurrencies involves buying and selling the same digital asset across different exchanges to take advantage of price discrepancies. Traders can exploit temporary market inefficiencies by acquiring a cryptocurrency at a lower price on one platform and selling it at a higher price on another, thereby securing a risk-free profit. This strategy contributes to market efficiency by helping to synchronize prices across various cryptocurrency exchanges.</p>
                    </Col>
                    <Col md={6}>
                        <img className='image-center' src="https://www.nicepng.com/png/detail/15-154980_best-bitcoin-wallet-arbitrage-icon.png" alt="Best Bitcoin Wallet - Arbitrage Icon@nicepng.com" />
                    </Col>
                </Row>
            </Container>

            <Container className="usdt-use-cases-section my-5">
                <h2>USDT Use Cases</h2>
                <p>
                    USDT can be used for various purposes, including trading, remittances, and as a stable currency for transactions.
                    Explore how Mobycryp utilizes USDT for maximizing profits and ensuring a smooth trading experience.
                </p>
                <Button variant="secondary" href="/usdt-usecases">Learn More</Button>
            </Container>

            <Container className="plan-calculator-section my-5">
                <h2>Plan Calculator</h2>
                <p>
                    Use our Plan Calculator to estimate your returns based on your investment in USDT.
                </p>
                <Button variant="success" href="/calculator" className="ml-2">Calculate Now</Button>
            </Container>

            <Container className="community-info-section my-5">
                <h2>Community Information</h2>
                <p>
                    Join our vibrant community to share insights, strategies, and experiences with other Mobycryp users.
                    Together, we can maximize our trading potential!
                </p>
                <Button variant="info" href="/community">Join Community</Button>
            </Container>

            <Container className="faqs-section my-5">
                <h2>Frequently Asked Questions</h2>
                <p>
                    Have questions? Visit our FAQs section to find answers and get more information about our services.
                </p>
                <Button variant="warning" href="/faqs">View FAQs</Button>
            </Container>
        </>
    );
};

export default LandingPage;
