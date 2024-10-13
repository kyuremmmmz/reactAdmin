<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react';
import './styles.css'; 
import Header from '../../panels/Header';
import calendar from '../../../assets/calendar.png';

const bookings = [
  { id: 'A09863', title: 'Deluxe Suite', date: 'Monday, 16 Sept 2024, 09:42 am' },
  { id: 'A09864', title: 'Presidential Suite', date: 'Monday, 16 Sept 2024, 08:02 am' },
  { id: 'A09865', title: 'Premiere Suite', date: 'Monday, 16 Sept 2024, 06:52 am' },
  { id: 'A09866', title: 'Premiere Suite', date: 'Monday, 16 Sept 2024, 04:44 am' },
];

const getCurrentDateInfo = () => {
  const currentDate = new Date();
  return {
    day: currentDate.toLocaleString('default', { weekday: 'long' }),
    date: currentDate.getDate(),
    month: currentDate.toLocaleString('default', { month: 'long' }),
    year: currentDate.getFullYear(),
  };
};

const RoomSchedules = () => {
  const { day, date, month, year } = getCurrentDateInfo();

  return (
    <div>
      <Header />
      <main className="newbooking">
        <div className="container">
          <section className="newbooking-section">
            <div className="newbooking">
              <h2 className="newbooking-title">Room Schedules</h2>
              <p className="newbooking-date">
                {day}, <span style={{ color: '#3d3d3d' }}>{`${date} ${month} ${year}`}</span>
              </p>
              <div className="booking-list">
                {bookings.length > 0 ? (
                  bookings.map((booking, index) => (
                    <BookingItem key={index} booking={booking} />
                  ))
                ) : (
                  <p>No new bookings available.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const BookingItem = ({ booking }) => {
  return (
    <div className="booking-item">
      <div className="booking-icon">
        <img src={calendar} alt="Calendar" />
      </div>
      <div className="booking-info">
        <p className="booking-id">Booking ID #{booking.id}</p>
        <h2 className="booking-title">{booking.title}</h2>
      </div>
      <div className="booking-date-info">
        <p className="booking-date-label">Booking Date</p>
        <p className="booking-date">{booking.date}</p>
      </div>
    </div>
  );
};

export default RoomSchedules;
=======
>>>>>>> parent of 690fb9c (add Home Page)
=======
>>>>>>> parent of 690fb9c (add Home Page)
