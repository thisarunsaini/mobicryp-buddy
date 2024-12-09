import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArbitrageModel from './component/menu/Arbitrage';
import UsdtUseCases from './component/menu/UsdtUseCases';
import PlanCalculator from './component/menu/PlanCalculator';
import LandingPage from './component/menu/LandingPage';
import NavigationBar from './component/common/Navbar';
import { Footer } from './component/common/Footer';
import FaqPage from './component/menu/FaqPage';

const App: React.FC = () => {
  return (
    <>
      <Router>
      <NavigationBar />
        <div style={{ minHeight: "90vh" }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/arbitrage" element={<ArbitrageModel />} />
            <Route path="/usdt-usecases" element={<UsdtUseCases />} />
            <Route path="/calculator" element={<PlanCalculator />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/faqs" element={<FaqPage />} />
            {/* Uncomment these routes when ready */}
            {/* <Route path="/community" element={<Community />} />
        <Route path="/faqs" element={<FAQs />} /> */}
          </Routes>
        </div>
      </Router>
      <Footer />
    </>
  );
};

export default App;
