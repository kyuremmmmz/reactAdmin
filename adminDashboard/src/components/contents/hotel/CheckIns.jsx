import { useEffect, useState } from "react";
import "./styles.css";
import Header from "../../panels/Header";
import image from "../../../assets/check.png";
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

const CheckIns = (props) => {
  const [schedule, setSchedule] = useState([]);
  const { day, date, month, year } = getCurrentDateInfo();

  const fetchData = async () => {
    const today = new Date().toISOString().split('T')[0]; 
    const { data, error } = await supabase.from('hotel_booking').select('*').eq('checkin', today);
    if (error) throw error;
    setSchedule(data);
  }

  useEffect(() => {
    fetchData();
  }, [])

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
                {schedule.length > 0 ? (
                  schedule.map((checkin, index) => (
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

const CheckInItem = (props) => {
  const schedule = props.checkin;;
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
        <p className="checkin-status-id">Checkin ID #{schedule.booking_id}</p>
        <h2 className="checkin-status-title">
          {schedule.room_type} {schedule.booking_id}
        </h2>
      </div>
      <div className="checkin-status-info">
        <p className="checkin-status-label">Check-in Date</p>
        <p className="checkin-status-date">{formatCheckInDate(schedule.checkin)}</p>
      </div>
    </div>
  );
};

export default CheckIns;
