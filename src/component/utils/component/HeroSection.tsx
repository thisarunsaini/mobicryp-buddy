import React from 'react';
import { Button, Container } from 'react-bootstrap';
import UsdtPrice from './UsdtPrice';
import './styles/HeroSection.css';

const HeroSection: React.FC<{ text: string }> = (props) => {
    return (
        <div style={{ position: 'relative', overflow: 'hidden' }}>

            {/* Hero Section Content */}
            <Container
                fluid
                className="hero-section d-flex flex-column align-items-center justify-content-center text-center"
                style={{ position: 'relative', zIndex: 1 }}
            >
                <h1 className="hero-title animated-title">{props.text}</h1>
                <p className="hero-subtitle animated-subtitle">Revolutionizing USDT Trading Across Borders</p>
                <UsdtPrice />
                <Button variant="primary" className="mt-4 btn-hero" href="/calculator">
                    Start Calculating Returns
                </Button>
            </Container>
        </div>
    );
};

export default HeroSection;

