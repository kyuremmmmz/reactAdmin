import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../contents/main/Dashboard";
import Flights from "../contents/main/Flights";
import Hotels from "../contents/main/Hotels";
import Logout from "../contents/main/Logout";
import Settings from "../contents/main/Settings";
import Reviews from "../contents/main/Reviews";
import Reports from "../contents/main/Reports";
import Wallets from "../contents/main/Wallets";

const MainPanel = () => {
  return (
    <div className="item-main-panel content-mid-vertical">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/wallets" element={<Wallets />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default MainPanel;
