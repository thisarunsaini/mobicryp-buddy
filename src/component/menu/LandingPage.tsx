import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './styles/LandingPage.css'; // Your custom styles
import HeroSection from '../utils/component/HeroSection';
import ArbitrageLandingPage from './components/landing-page/ArbitrageLandingPage';
import UsdtCaseLandingPage from './components/landing-page/UsdtCaseLandingPage';
import PlanCalculatorLandingPage from './components/landing-page/PlanCalculatorLandingPage';
import FaqLandingPage from './components/landing-page/FaqLandingPage';
import CommunityLandingPage from './components/landing-page/CommunityLandingPage';

const LandingPage: React.FC = () => {
    return (
        <>
            <HeroSection text={"Welcome to Mobicryp Buddy"} />
            <ArbitrageLandingPage />
            <UsdtCaseLandingPage />
            <PlanCalculatorLandingPage/>
            <FaqLandingPage/>
            <CommunityLandingPage/>
        </>
    );
};

export default LandingPage;
