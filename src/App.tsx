import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import ArbitrageModel from "./component/menu/Arbitrage";
import UsdtUseCases from "./component/menu/UsdtUseCases";
import PlanCalculator from "./component/menu/PlanCalculator";
import LandingPage from "./component/menu/LandingPage";
import NavigationBar from "./component/common/Navbar";
import { Footer } from "./component/common/Footer";
import FaqPage from "./component/menu/FaqPage";
import { GrowthPlanner } from "./component/menu/GrowthPlanner";
import PlanList from "./component/menu/PlanList";

const RedirectOnLoad: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/landing");
  }, []);

  return null; // This component doesn't render anything
};

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter basename="/mobicryp-buddy">
        <RedirectOnLoad />
        <NavigationBar />
        <div style={{ minHeight: "90vh" }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/arbitrage" element={<ArbitrageModel />} />
            <Route path="/usdt-usecases" element={<UsdtUseCases />} />
            <Route path="/calculator" element={<PlanCalculator />} />
            <Route path="/growth" element={<GrowthPlanner />} />
            <Route path="/plans" element={<PlanList />} />
            <Route path="/faqs" element={<FaqPage />} />
            {/* Uncomment these routes when ready */}
            {/* <Route path="/community" element={<Community />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </>
  );
};

export default App;
