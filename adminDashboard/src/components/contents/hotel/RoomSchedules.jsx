import React, { useEffect, useState } from 'react';
import './styles.css';
import Header from '../../panels/Header';
import image from '../../../assets/calendar.png';
import '../main/hotel.css';
import lock from "../../../assets/lock.png";
import { supabase } from '../../../supabaseClient'; // Ensure this import is correct

const RoomSchedules = () => {
  const [hotelBookings, setData] = useState([]);
  const [checkinList, setCheckinList] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    getTheHotelList();
    getTheCheckinList();
  }, []);

  async function getTheHotelList() {
    const { data, error } = await supabase.from('hotel_booking').select('*');
    if (error) throw error;
    console.log(data);
    setData(data);
  }

  async function getTheCheckinList() {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; 
    const { data, error } = await supabase.from('hotel_booking').select('*').eq('checkin', formattedDate);
    if (error) throw error;
    console.log(data);
    setCheckinList(data);
  }

  const getCurrentDateInfo = () => {
    const currentDate = new Date();
    return {
      day: currentDate.toLocaleString('default', { weekday: 'long' }),
      date: currentDate.getDate(),
      month: currentDate.toLocaleString('default', { month: 'long' }),
      year: currentDate.getFullYear(),
    };
  };

  const { day, date, month, year } = getCurrentDateInfo();

  return (
    <div>
      <Header />
      <main className="room-schedules">
        <div className="container">
          <section className="room-schedules-section">
            <h2 className="room-title">Scheduled Rooms</h2>
            <p className="room-date">
              {day}, <span style={{ color: '#3d3d3d' }}>{`${date} ${month} ${year}`}</span>
            </p>
            <div className="room-schedules-list">
              {hotelBookings.length > 0 ? (
                hotelBookings.map((schedule, index) => (
                  <RoomSchedules2 key={index} schedule={schedule} />
                ))
              ) : (
                <p>No new schedules available.</p>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const RoomSchedules2 = (props) => {
  const schedule = props.schedule;
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
    <div className="booking-item">
      <div className="booking-icon">
        <img src={lock} alt="Booking Image" />
      </div>
      <div className="booking-info">
        <p className="booking-id">Booking ID #{schedule.booking_id}</p>
        <h2 className="booking-title">{schedule.room_type}</h2>
      </div>
      <div className="booking-date-info">
        <p className="booking-date-label">Booking Date</p>
        <p className="booking-date">{formatBookingDate(schedule.date_of_booking)}</p>
      </div>
    </div>
  );
};

export default RoomSchedules;
