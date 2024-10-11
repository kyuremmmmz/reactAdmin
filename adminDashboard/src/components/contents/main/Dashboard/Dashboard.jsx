import React, { useState, useEffect } from "react"; 
import './style.css';

import newBookingsIcon from '../../../../assets/image.png';
import checkOutsTodayIcon from '../../../../assets/image.png';
import scheduledRoomsIcon from '../../../../assets/image.png';
import checkedInIcon from '../../../../assets/image.png';
import newFlightBookingIcon from '../../../../assets/image.png';
import scheduledFlightIcon from '../../../../assets/image.png';
import cancelledFlightIcon from '../../../../assets/image.png';
import completedFlightIcon from '../../../../assets/image.png';

const StatCard = ({ value, icon, label }) => (
  <div className="stat-card">
    <div className="stat-content">
      <div>{value}</div>
      <img src={icon} alt="" className="stat-icon" />
    </div>
    <div className="stat-label">{label}</div>
  </div>
);

const RoomStatCard = ({ title, value, total, fillWidth, fillColor }) => (
  <div className="room-stat-card">
    <div className="room-stat-title">{title}</div>
    <div className="room-stat-bar">
      <div className="room-stat-fill" style={{ width: fillWidth, backgroundColor: fillColor }} />
      <div className="room-stat-total" style={{ width: `${(total / total) * 100}%` }}> 
        Total {total} rooms
      </div>
    </div>
    <div className="room-stat-value">{value}</div>
  </div>
);

const TicketStatCard = ({ title, value, total, fillWidth, fillColor }) => (
  <div className="ticket-stat-card">
    <div className="ticket-stat-title">{title}</div>
    <div className="ticket-stat-bar">
      <div className="ticket-stat-fill" style={{ width: fillWidth, backgroundColor: fillColor }} />
      <div className="ticket-stat-total" style={{ width: `${(total / total) * 100}%` }}> 
        Total {total} tickets
      </div>
    </div>
    <div className="ticket-stat-value">{value}</div>
  </div>
);
const fetchHotelStats = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stats: [
          { value: 95, icon: newBookingsIcon, label: 'New Bookings' },
          { value: 50, icon: scheduledRoomsIcon, label: 'Scheduled Rooms' },
          { value: 20, icon: checkedInIcon, label: 'Checked-In' },
          { value: 1000, icon: checkOutsTodayIcon, label: 'Check-Outs Today' },
        ],
        availableRooms: 1000,
        soldOutRooms: 185,
        totalRooms: 1000
      });
    }, 500);
  });
};

const fetchFlightStats = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { value: 120, icon: newFlightBookingIcon, label: 'New Flight Bookings' },
        { value: 40, icon: scheduledFlightIcon, label: 'Scheduled Flights' },
        { value: 15, icon: cancelledFlightIcon, label: 'Cancelled Flights' },
        { value: 980, icon: completedFlightIcon, label: 'Completed Flights' },
      ]);
    }, 500); 
  });
};
const fetchTicketStats = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        availableTicket: 900,
        soldOutTicket: 50,
        totalTicket: 1000
      });
    }, 1000);
  });
};

const Dashboard = () => {
  const [hotelStats, setHotelStats] = useState([]);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [soldOutRooms, setSoldOutRooms] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [flightStats, setFlightStats] = useState([]);
  const [availableTicket, setAvailableTicket] = useState(0);
  const [soldOutTicket, setSoldOutTicket] = useState(0);
  const [totalTicket, setTotalTicket] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const { stats, availableRooms, soldOutRooms, totalRooms } = await fetchHotelStats();
      setHotelStats(stats);
      setAvailableRooms(availableRooms);
      setSoldOutRooms(soldOutRooms);
      setTotalRooms(totalRooms);
    };
    
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      const flightData = await fetchFlightStats();
      setFlightStats(flightData);
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      const ticketData = await fetchTicketStats();
      setAvailableTicket(ticketData.availableTicket);
      setSoldOutTicket(ticketData.soldOutTicket);
      setTotalTicket(ticketData.totalTicket);
    };

    fetchStats();
  }, []);

  const currentDate = new Date();
  const day = currentDate.toLocaleString('default', { weekday: 'long' });
  const date = currentDate.getDate();
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <main className="dashboard">
      <div className="layout">
        <section className="main-content">
          <header className="header">
            <h1 className="header-title">TRAVEL GO</h1>
            <p className="header-subtitle">Northwestern part of Luzon Island, Philippines</p>
          </header>
          <section className="dashboard-section">
            <h2 className="dashboard-title">Hotel Dashboard</h2>
            <p className="dashboard-date">{day}, <span style={{ color: '#3d3d3d' }}>{`${date} ${month} ${year}`}</span></p>
            <div className="stats-grid">
              {hotelStats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
            <div className="room-stats">
              <RoomStatCard 
                title="Available Rooms" 
                value={availableRooms} 
                total={totalRooms} 
                fillWidth={`${(availableRooms / totalRooms) * 100}%`} 
                fillColor="#a6eca6"
              />
              <RoomStatCard 
                title="Sold Out Rooms" 
                value={soldOutRooms} 
                total={totalRooms} 
                fillWidth={`${(soldOutRooms / totalRooms) * 100}%`} 
                fillColor="#eca6a6"
              />
            </div>
          </section>
          <div className="section-divider" />
          <section className="dashboard-section">
            <h2 className="dashboard-title">Flight Dashboard</h2>
            <p className="dashboard-date">{day}, <span style={{ color: '#3d3d3d' }}>{`${date} ${month} ${year}`}</span></p>
            <div className="stats-grid">
              {flightStats.map((stat, index) => (
                <StatCard key={index} {...stat} className={stat.label === 'New Bookings' ? 'new-bookings-card' : ''} />
              ))}
            </div>
            <div className="ticket-stats">
              <TicketStatCard 
                title="Available Tickets Today" 
                value={availableTicket} 
                total={totalTicket} 
                fillWidth={`${(availableTicket / totalTicket) * 100}%`} 
                fillColor="#a6eca6"
              />
              <TicketStatCard 
                title="Sold Out Tickets" 
                value={soldOutTicket} 
                total={totalTicket} 
                fillWidth={`${(soldOutTicket / totalTicket) * 100}%`} 
                fillColor="#eca6a6"
              />
            </div>
          </section>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;
