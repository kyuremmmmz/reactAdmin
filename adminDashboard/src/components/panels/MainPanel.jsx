// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../contents/main/Dashboard/Dashboard";
import Flights from "../contents/main/Flights";
import Hotels from "../contents/main/Hotels";
import Logout from "../contents/main/Logout";
import Settings from "../contents/main/Settings";
import Reviews from "../contents/main/Reviews";
import Reports from "../contents/main/Reports";
import Wallets from "../contents/main/Wallets";
import NewBookings from "../contents/hotel/NewBookings";
import RoomSchedules from "../contents/hotel/RoomSchedules";
import CheckIns from "../contents/hotel/CheckIns";
import CheckOuts from "../contents/hotel/CheckOuts";

const MainPanel = () => {
  return (
    <div className="item-main-panel main-layout">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/wallets" element={<Wallets />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/newbookings" element={<NewBookings />} />
        <Route path="/roomsched" element={<RoomSchedules />} />
        <Route path="/checkedout" element={<CheckOuts />} />
        <Route path="/checkedin" element={<CheckIns />} />


        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
};

export default MainPanel;