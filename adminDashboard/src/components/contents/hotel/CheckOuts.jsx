import React, { useEffect, useState } from "react";
import "./styles.css";
import Header from "../../panels/Header";

import image from "../../../assets/out.png";
import { supabase } from "../../../supabaseClient";



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
  const [schedule, setSchedule] = useState([]);
  const { day, date, month, year } = getCurrentDateInfo();

  const fetchData = async () => {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase.from('hotel_booking').select('*').eq('checkout', today);
    if (error) throw error;
    setSchedule(data);
  }

  useEffect(() => {
    fetchData();
  }, [])
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
                {schedule.length > 0 ? (
                  schedule.map((checkout, index) => (
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

const CheckOutItem = (props) => {
  const schedule = props.checkout;;
  const formatBookingDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const formattedDate = date.toLocaleString('default', options)
      .replace(',', '')
      .replace('AM', 'am')
      .replace('PM', 'pm');

    const parts = formattedDate.split(", ");
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
        <p className="checkin-status-id">Checkout ID #{schedule.booking_id}</p>
        <h2 className="checkin-status-title">
          {schedule.room_type} {schedule.booking_id}
        </h2>
      </div>
      <div className="checkin-status-info">
        <p className="checkin-status-label">Check-out Date</p>
        <p className="checkin-status-date">{formatBookingDate(schedule.checkout)}</p>
      </div>
    </div>
  );
};

export default CheckOuts;
