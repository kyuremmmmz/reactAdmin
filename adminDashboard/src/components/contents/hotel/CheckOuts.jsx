import React from "react";
import "./styles.css";
import Header from "../../panels/Header";

import image from "../../../assets/out.png";

const checkouts = [
  {
    id: "A09863",
    title: "Deluxe Suite",
    date: "Monday, 16 Sept 2024, 09:42 am",
  },
  {
    id: "A09864",
    title: "Presidential Suite",
    date: "Monday, 16 Sept 2024, 08:02 am",
  },
  {
    id: "A09865",
    title: "Premiere Suite",
    date: "Monday, 16 Sept 2024, 06:52 am",
  },
  {
    id: "A09866",
    title: "Premiere Suite",
    date: "Monday, 16 Sept 2024, 04:44 am",
  },
];

const getCurrentDateInfo = () => {
  const currentDate = new Date();
  return {
    day: currentDate.toLocaleString("default", { weekday: "long" }),
    date: currentDate.getDate(),
    month: currentDate.toLocaleString("default", { month: "long" }),
    year: currentDate.getFullYear(),
  };
};

const CheckOuts = () => {
  const { day, date, month, year } = getCurrentDateInfo();

  return (
    <div>
      <Header />
      <main className="co-container">
        <div className="container">
          <section className="co-section">
            <div className="co-status">
              <h2 className="co-title">Check-Outs Today</h2>
              <p className="co-date">
                {day},{" "}
                <span
                  style={{ color: "#3d3d3d" }}
                >{`${date} ${month} ${year}`}</span>
              </p>
              <div className="co-list">
                {checkouts.length > 0 ? (
                  checkouts.map((checkout, index) => (
                    <CheckOutItem key={index} checkout={checkout} />
                  ))
                ) : (
                  <p>No new check-outs available.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const CheckOutItem = ({ checkout }) => {
  const formatCheckOutDate = (dateString) => {
    const parts = dateString.split(", ");
    const dayOfWeek = parts[0];
    const restOfDate = parts.slice(1).join(", ");

    return (
      <>
        <span style={{ color: "#0047fa" }}>{dayOfWeek}</span>, {restOfDate}
      </>
    );
  };

  return (
    <div className="co-status-item">
      <div className="co-icon">
        <img src={image} alt="Check-out Image" />
      </div>
      <div className="co-info">
        <p className="co-status-id">ID #{checkout.id}</p>
        <h2 className="co-status-title">
          {checkout.title} {checkout.id}
        </h2>
      </div>
      <div className="co-info-date">
        <p className="co-status-label">Check-out Date</p>
        <p className="co-status-date">{formatCheckOutDate(checkout.date)}</p>
      </div>
    </div>
  );
};

export default CheckOuts;
