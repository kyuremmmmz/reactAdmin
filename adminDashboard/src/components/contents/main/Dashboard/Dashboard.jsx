// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Header from "../../../panels/Header";
import newBookingsIcon from "../../../../assets/lock.png";
import checkOutsTodayIcon from "../../../../assets/out.png";
import scheduledRoomsIcon from "../../../../assets/calendar.png";
import checkedInIcon from "../../../../assets/check.png";
import newFlightBookingIcon from "../../../../assets/lock.png";
import scheduledFlightIcon from "../../../../assets/calendar.png";
import cancelledFlightIcon from "../../../../assets/check.png";
import completedFlightIcon from "../../../../assets/out.png";
import { useNavigation } from "../../../panels/NavigationContext";
import PropTypes from "prop-types";
import { supabase } from "../../../../supabaseClient";


// eslint-disable-next-line react/prop-types
const StatCard = ({ value, icon, label, onClick }) => (
  <div className="stat-card" onClick={onClick} style={{ cursor: "pointer" }}>
    <div className="stat-content">
      <div>{value}</div>
      <img src={icon} alt="" className="stat-icon" />
    </div>
    <div className="stat-label">{label}</div>
  </div>
);



const NewStatCard = ({ value, icon, label, onClick }) => (
  <div
    className="new-stat-card"
    onClick={onClick}
    style={{ cursor: "pointer" }}
  >
    <div className="new-stat-content">
      <div>{value}</div>
      <img src={icon} alt="" className="stat-icon" />
    </div>
    <div className="new-stat-label">{label}</div>
  </div>
);


const RoomStatCard = ({ title, value, total, fillWidth, fillColor }) => (
  <div className="room-stat-card">
    <div className="room-stat-title">{title}</div>
    <div className="room-stat-bar">
      <div
        className="room-stat-fill"
        style={{ width: fillWidth, backgroundColor: fillColor }}
      />
      <div
        className="room-stat-total"
        style={{ width: `${(total / total) * 100}%` }}
      >
        Total {total} rooms
      </div>
    </div>
    <div className="room-stat-value">{value}</div>
  </div>
);

// eslint-disable-next-line react/prop-types
const TicketStatCard = ({ title, value, total, fillWidth, fillColor }) => (
  <div className="ticket-stat-card">
    <div className="ticket-stat-title">{title}</div>
    <div className="ticket-stat-bar">
      <div
        className="ticket-stat-fill"
        style={{ width: fillWidth, backgroundColor: fillColor }}
      />
      <div
        className="ticket-stat-total"
        style={{ width: `${(total / total) * 100}%` }}
      >
        Total {total} tickets
      </div>
    </div>
    <div className="ticket-stat-value">{value}</div>
  </div>
);

const fetchHotelStats = async () => {
  try {
    const today = new Date().toISOString().split('T')[0];


    const { data: todayBookings, error: todayError } = await supabase
      .from('hotel_booking')
      .select('*')
      .eq('date_of_booking', today);

    const { data: allBookings, error: allError } = await supabase
      .from('hotel_booking')
      .select('*');

    if (todayError) throw todayError;
    if (allError) throw allError;

    const newBookingsCount = todayBookings ? todayBookings.length : 0;
    const totalBookingsCount = allBookings ? allBookings.length : 0;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          stats: [
            { value: newBookingsCount, icon: newBookingsIcon, label: "New Bookings" },
            { value: totalBookingsCount, icon: scheduledRoomsIcon, label: "Scheduled Rooms" },
            { value: 20, icon: checkedInIcon, label: "Checked-In" },
            { value: 1000, icon: checkOutsTodayIcon, label: "Check-Outs Today" },
          ],
          availableRooms: 1000,
          soldOutRooms: 185,
          totalRooms: 1000,
        });
      }, 500);
    });
  } catch (err) {
    console.error("Error fetching hotel stats:", err.message);
    return { stats: [], availableRooms: 0, soldOutRooms: 0, totalRooms: 0 };
  }
};


const fetchFlightStats = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          value: 120,
          icon: newFlightBookingIcon,
          label: "New Flight Bookings",
        },
        { value: 40, icon: scheduledFlightIcon, label: "Scheduled Flights" },
        { value: 15, icon: cancelledFlightIcon, label: "Cancelled Flights" },
        { value: 980, icon: completedFlightIcon, label: "Completed Flights" },
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
        totalTicket: 1000,
      });
    }, 1000);
  });
};

const Dashboard = () => {
  const { setActivePath } = useNavigation();
  const navigate = useNavigate();

  const [hotelStats, setHotelStats] = useState([
    { value: 0, icon: newBookingsIcon, label: "New Bookings" },
    { value: 0, icon: scheduledRoomsIcon, label: "Scheduled Rooms" },
    { value: 0, icon: checkedInIcon, label: "Checked-In" },
    { value: 0, icon: checkOutsTodayIcon, label: "Check-Outs Today" },
  ]);
  const [availableRooms, setAvailableRooms] = useState(0);
  const [soldOutRooms, setSoldOutRooms] = useState(0);
  const [totalRooms, setTotalRooms] = useState(0);
  const [flightStats, setFlightStats] = useState([
    { value: 0, icon: newFlightBookingIcon, label: "New Flight Bookings" },
    { value: 0, icon: scheduledFlightIcon, label: "Scheduled Flights" },
    { value: 0, icon: cancelledFlightIcon, label: "Cancelled Flights" },
    { value: 0, icon: completedFlightIcon, label: "Completed Flights" },
  ]);
  const [availableTicket, setAvailableTicket] = useState(0);
  const [soldOutTicket, setSoldOutTicket] = useState(0);
  const [totalTicket, setTotalTicket] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const { stats, availableRooms, soldOutRooms, totalRooms } =
        await fetchHotelStats();
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

  const handleNewBookingsClick = () => {
    setActivePath("/home/hotels/");

    navigate("/home/newbookings");
  };

  const handleRoomSchedulesClick = () => {
    setActivePath("/home/hotels/");

    navigate("/home/roomsched");
  };
  const handleCheckedInClick = () => {
    setActivePath("/home/hotels/");

    navigate("/home/checkedin");
  };
  const handleCheckOutClick = () => {
    navigate("/home/checkedout");
    setActivePath("/home/hotels/");
  };
  const handleFlightBookingsClick = () => {
    setActivePath("/home/hotels/");

    navigate("/home/flightbookings");
  };

  const currentDate = new Date();
  const day = currentDate.toLocaleString("default", { weekday: "long" });
  const date = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <div>
      <Header />

      <main className="dashboard">
        <div className="layout">
          <section className="main-content">
            <section className="dashboard-section">
              <h2 className="dashboard-title">Hotel Dashboard</h2>
              <p className="dashboard-date">
                {day},{" "}
                <span
                  style={{ color: "#3d3d3d" }}
                >{`${date} ${month} ${year}`}</span>
              </p>

              <div className="stats-grid-dash">
                {hotelStats.map((stat, index) => {
                  let handleClick;
                  if (stat.label === "New Bookings") {
                    handleClick = handleNewBookingsClick;
                  } else if (stat.label === "Scheduled Rooms") {
                    handleClick = handleRoomSchedulesClick;
                  } else if (stat.label === "Checked-In") {
                    handleClick = handleCheckedInClick;
                  } else if (stat.label === "Check-Outs Today") {
                    handleClick = handleCheckOutClick;
                  }

                  return (
                    <NewStatCard key={index} {...stat} onClick={handleClick} />
                  );
                })}
              </div>

              <div className="room-stats">
                <RoomStatCard
                  title="Available Rooms"
                  value={availableRooms}
                  total={totalRooms}
                  fillWidth={`${
                    totalRooms > 0 ? (availableRooms / totalRooms) * 100 : 0
                  }%`}
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
              <p className="dashboard-date">
                {day},{" "}
                <span
                  style={{ color: "#3d3d3d" }}
                >{`${date} ${month} ${year}`}</span>
              </p>

              <div className="stats-grid">
                {flightStats.map((stat, index) => {
                  let handleClick;
                  if (stat.label === "New Flight Bookings") {
                    handleClick = handleFlightBookingsClick;
                  }
                  return (
                    <StatCard key={index} {...stat} onClick={handleClick} />
                  );
                })}
              </div>

              <div className="ticket-stats">
                <TicketStatCard
                  title="Available Tickets"
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
            <div className="section-divider" />

            <section className="dashboard-section">
              <h2 className="dashboard-title">Users</h2>
              <p className="dashboard-date">
                {day},{" "}
                <span
                  style={{ color: "#3d3d3d" }}
                >{`${date} ${month} ${year}`}</span>
              </p>

              <div className="stats-grid">
                {flightStats.map((stat, index) => {
                  let handleClick;
                  if (stat.label === "New Flight Bookings") {
                    handleClick = handleFlightBookingsClick;
                  }
                  return (
                    <StatCard key={index} {...stat} onClick={handleClick} />
                  );
                })}
              </div>

              <div className="ticket-stats">
                <TicketStatCard
                  title="Available Tickets"
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
    </div>
  );
};
StatCard.propTypes = {
  value: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

NewStatCard.propTypes = {
  value: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

RoomStatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  fillWidth: PropTypes.string.isRequired,
  fillColor: PropTypes.string.isRequired,
};

TicketStatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  fillWidth: PropTypes.string.isRequired,
  fillColor: PropTypes.string.isRequired,
};


export default Dashboard;
