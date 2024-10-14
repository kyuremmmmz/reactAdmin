import React, { useState } from 'react';
import './styles.css'; 
import SidePanel from '../../panels/SidePanel';
import lock from '../../../assets/lock.png';
import Header from '../../panels/Header'

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

const NewBookings = () => {
  const { day, date, month, year } = getCurrentDateInfo();
  const [isSidePanelActive, setSidePanelActive] = useState(false);

  const handleBookingClick = () => {
    setSidePanelActive(true);
  };

  return (
    <div>
      <Header />
      <main className="newbooking">
        <div className="container">
          <section className="newbooking-section">
            <div className="newbooking-l">
              <h2 className="newbooking-title">New Bookings</h2>
              <p className="newbooking-date">
                {day}, <span style={{ color: '#3d3d3d' }}>{`${date} ${month} ${year}`}</span>
              </p>
              <div className="booking-list">
                {bookings.length > 0 ? (
                  bookings.map((booking, index) => (
                    <BookingItem key={index} booking={booking} onClick={handleBookingClick} />
                  ))
                ) : (
                  <p>No new bookings available.</p>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      {isSidePanelActive && <SidePanel />}
    </div>
  );
};

const BookingItem = ({ booking, onClick }) => {
  const formatBookingDate = (dateString) => {
    const parts = dateString.split(', ');
    const dayOfWeek = parts[0];
    const restOfDate = parts.slice(1).join(', ');

    return (
      <>
        <span style={{ color: '#0047fa' }}>{dayOfWeek}</span>, {restOfDate}
      </>
    );
  };

  return (
    <div className="booking-item" onClick={onClick}>
      <div className="booking-icon">
        <img src={lock} alt="Booking Image" />
      </div>
      <div className="booking-info">
        <p className="booking-id">Booking ID #{booking.id}</p>
        <h2 className="booking-title">{booking.title} {booking.id}</h2>
      </div>
      <div className="booking-date-info">
        <p className="booking-date-label">Booking Date</p>
        <p className="booking-date">{formatBookingDate(booking.date)}</p>
      </div>
    </div>
  );
};

export default NewBookings;
