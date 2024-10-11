import React from "react";
import { Link, useLocation } from "react-router-dom";
import NavigationData from "../../data/navigation-data";

const SidePanel = () => {
  const location = useLocation();

  return (
    <div className="bg-primary item-side-panel content-start-vertical">
      <header className="content-mid-vertical">
        <img
          src="https://plus.unsplash.com/premium_photo-1694819488591-a43907d1c5cc?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D"
          alt="profile"
          className="profile-image"
        />
  <h4 className="profile-name">Christian David B. Jasmin</h4>
  </header>
      <hr />

      <main className="content-start-vertical">
        {NavigationData.map((item) =>
          item.name && item.path ? (
            <Link
              to={item.path}
              key={item._id}
              className={`side-panel-button ${
                location.pathname === item.path ? "selected-button" : ""
              }`}
            >
              {item.name}
            </Link>
          ) : null
        )}
      </main>
    </div>
  );
};

export default SidePanel;
