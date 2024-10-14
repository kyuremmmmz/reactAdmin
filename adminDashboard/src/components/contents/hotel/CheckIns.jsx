import React from "react";
import "./styles.css";
import Header from "../../panels/Header";
import image from "../../../assets/check.png";

const checkins = [
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

const CheckIns = () => {
  const { day, date, month, year } = getCurrentDateInfo();

  return (
    <div>
      <Header />
      <main className="checkin">
        <div className="container">
          <section className="checkin-section">
            <div className="checkin-status">
              <h2 className="checkin-title">Currently Checked-In</h2>
              <p className="checkin-date">
                {day},{" "}
                <span
                  style={{ color: "#3d3d3d" }}
                >{`${date} ${month} ${year}`}</span>
              </p>
              <div className="checkin-list">
                {checkins.length > 0 ? (
                  checkins.map((checkin, index) => (
                    <CheckInItem key={index} checkin={checkin} />
                  ))
                ) : (
                  <p>No new check-ins available.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const CheckInItem = ({ checkin }) => {
  const formatCheckInDate = (dateString) => {
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
    <div className="checkin-item">
      <div className="checkin-icon">
        <img src={image} alt="Image" />
      </div>
      <div className="checkin-info">
        <p className="checkin-status-id">Checkin ID #{checkin.id}</p>
        <h2 className="checkin-status-title">
          {checkin.title} {checkin.id}
        </h2>
      </div>
      <div className="checkin-status-info">
        <p className="checkin-status-label">Check-in Date</p>
        <p className="checkin-status-date">{formatCheckInDate(checkin.date)}</p>
      </div>
    </div>
  );
};

export default CheckIns;
