import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter, useNavigate, useLocation } from "react-router-dom";
import ArbitrageModel from "./component/menu/Arbitrage";
import UsdtUseCases from "./component/menu/UsdtUseCases";
import PlanCalculator from "./component/menu/PlanCalculator";
import LandingPage from "./component/menu/LandingPage";
import NavigationBar from "./component/common/Navbar";
import { Footer } from "./component/common/Footer";
import FaqPage from "./component/menu/FaqPage";
import { GrowthPlanner } from "./component/menu/GrowthPlanner";
import PlanList from "./component/menu/PlanList";
import { CLIENT_PLANS } from "./component/constants/commonConstants";
import { PlantListing } from "./component/constants/jsons/PlanList";
import "./App.css";

const RedirectOnLoad: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/landing");
    }
  }, [location.pathname]);
  return null;
};

const App: React.FC = () => {

  useEffect(() => {
    if (localStorage.getItem(CLIENT_PLANS) === null) {
      localStorage.setItem(CLIENT_PLANS, JSON.stringify(PlantListing));
    }
  }, [PlanList]);

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
