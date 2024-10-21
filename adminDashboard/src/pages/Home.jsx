// eslint-disable-next-line no-unused-vars
import React from "react";
import SidePanel from "../components/panels/SidePanel";
import MainPanel from "../components/panels/MainPanel";

const Home = () => {
  return (
    <div className="take-screen content-mid-horizontal">
      <SidePanel />
      <MainPanel />
    </div>
  );
};

export default Home;