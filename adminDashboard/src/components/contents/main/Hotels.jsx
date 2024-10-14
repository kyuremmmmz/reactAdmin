import React, { useEffect, useState } from "react";
import "./hotel.css";
import Header from "../../panels/Header";
import calendar from "../../../assets/calendar.png";
import lock from "../../../assets/lock.png";
import check from "../../../assets/check.png";
import out from "../../../assets/out.png";
import Schedules from "./Schedules";
import { supabase } from "../../../supabaseClient";

const bookings = [
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

const Hotels = () => {
  const [hotelBookings, setData] = useState([]);

  useEffect(() => {
    getTheHotelList();
  }, [])
  async function getTheHotelList() {
    const { data, error } = await supabase.from('hotel_booking').select('*');
    if (error) throw error;
    console.log(data);

    setData(data);
  }
  const { day, date, month, year } = getCurrentDateInfo();

  return (
    <div>
      <Header />
      <main className="hotels">
        <div className="container">
          {/* New Booking Section */}
          <section className="room-schedules-section">
            <h2 className="room-title">New Booking</h2>
            <p className="room-date">
              {day},{" "}
              <span
                style={{ color: "#3d3d3d" }}
              >{`${date} ${month} ${year}`}</span>
            </p>
            <div className="room-schedules-list">
              {bookings.length > 0 ? (
                bookings.map((schedule, index) => (
                  <BookingItem key={index} schedule={schedule} />
                ))
              ) : (
                <p>No new schedules available.</p>
              )}
            </div>
          </section>

          {/* Room Schedules Section */}
          <section className="room-schedules-section">
            <h2 className="room-title">Scheduled Rooms</h2>
            <p className="room-date">
              {day},{" "}
              <span
                style={{ color: "#3d3d3d" }}
              >{`${date} ${month} ${year}`}</span>
            </p>
            <div className="room-schedules-list">
              {hotelBookings.length > 0 ? (
                hotelBookings.map((schedule, index) => (
                  <Schedules key={index} schedule={schedule} />
                ))
              ) : (
                <p>No new schedules available.</p>
              )}
            </div>
          </section>

          {/* Check-Ins Section */}
          <section className="checkin-section">
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
          </section>

          {/* Check-Outs Section */}
          <section className="co-section">
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
          </section>
        </div>
      </main>
    </div>
  );
};

const BookingItem = ({ schedule, onClick }) => {
  const formatBookingDate = (dateString) => {
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
    <div className="booking-item" onClick={onClick}>
      <div className="booking-icon">
        <img src={lock} alt="Booking Image" />
      </div>
      <div className="booking-info">
        <p className="booking-id">Booking ID #{schedule.id}</p>
        <h2 className="booking-title">{schedule.title}</h2>
      </div>
      <div className="booking-date-info">
        <p className="booking-date-label">Booking Date</p>
        <p className="booking-date">{formatBookingDate(schedule.date)}</p>
      </div>
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
        <img src={check} alt="Check-In Image" />
      </div>
      <div className="checkin-info">
        <p className="checkin-id">Check-In ID #{checkin.id}</p>
        <h2 className="checkin-title">{checkin.title}</h2>
      </div>
      <div className="checkin-date-info">
        <p className="checkin-date-label">Check-In Date</p>
        <p className="checkin-date">{formatCheckInDate(checkin.date)}</p>
      </div>
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
        <img src={out} alt="Check-Out Image" />
      </div>
      <div className="co-info">
        <p className="co-id">Check-Out ID #{checkout.id}</p>
        <h2 className="co-title">{checkout.title}</h2>
      </div>
      <div className="co-date-info">
        <p className="co-date-label">Check-Out Date</p>
        <p className="co-date">{formatCheckOutDate(checkout.date)}</p>
      </div>
    </div>
  );
};

export default Hotels;
