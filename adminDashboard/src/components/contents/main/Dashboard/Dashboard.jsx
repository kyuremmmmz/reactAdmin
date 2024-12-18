// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Chart from 'react-apexcharts';
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
import Reports from "../Reports";
import { Row } from "react-bootstrap";
import { format } from "date-fns";


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
    
    const { data: checkout, error: checkoutErr } = await supabase
      .from('hotel_booking')
      .select('*').eq('checkout', today);
    if (checkoutErr) throw checkoutErr;
    if (todayError) throw todayError;
    if (allError) throw allError;


    const newBookingsCount = todayBookings ? todayBookings.length : 0;
    const totalBookingsCount = allBookings ? allBookings.length : 0;
    const checkOutsTodayCount = checkout? checkout.length : 0;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          stats: [
            { value: newBookingsCount, icon: newBookingsIcon, label: "New Bookings" },
            { value: totalBookingsCount, icon: scheduledRoomsIcon, label: "Scheduled Rooms" },
            { value: 20, icon: checkedInIcon, label: "Checked-In" },
            { value: checkOutsTodayCount, icon: checkOutsTodayIcon, label: "Check-Outs Today" },
          ],
          availableRooms: 1000 - totalBookingsCount,
          soldOutRooms: totalBookingsCount,
          totalRooms: 1000,
        });
      }, 500);
    });
  } catch (err) {
    console.error("Error fetching hotel stats:", err.message);
    return { stats: [], availableRooms: 0, soldOutRooms: 0, totalRooms: 0 };
  }
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

  const [chartData, setChartData] = useState({ options: {}, series: [] });
  const [totalFlights, setFlightStats] = useState({ options: {}, series: [] });
  const [hotelBookingCount, setHotelBookingCount] = useState(0);
  const [countPayment, setCountPay] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState({ options: {}, series: [] });
  const [sales, setSecondarySales] = useState({ options: {}, series: [] });
  const [rpcConnector, setRpcConnector] = useState(0);
  const fetchTotal = async () => {
    try {
      const { data, error } = await supabase.rpc('gettotalpayments');
      if (error) throw error;

      const { data: paymentData, error: paymentError } = await supabase.from('payment_table').select('*');
      if (paymentError) throw paymentError;

      setRpcConnector(data);
      const price = paymentData.map(item => item.payment);
      const date = paymentData.map(item => format(new Date(item.date_of_payment), 'eeee, dd MMM yyyy'));

      setSecondarySales({
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: { enabled: false },
          },
          xaxis: {
            categories: date,
          },
        },
        series: [{
          name: 'Total Payments',
          data: price,
        }],
      });
    } catch (error) {
      console.error('Error fetching total payments:', error);
    }
  };

  const fetchPayments = async () => {
    const { data, error } = await supabase.from('payment_table').select('*');
    if (error) throw error;
    const Payment = data.length;
    setCountPay(Payment);
    const price = data.map(item => item.payment);
    const date = data.map(item => format(new Date(item.date_of_payment), 'eeee, dd MMM yyyy'));
    setTransactions(
      {
        options: {
          chart: {
            height: 350,
            type: 'donut',
            zoom: {
              enabled: false,
            },
          },
          labels: date,
        },
        series: price
      }
    )

  }

  const fetchFlightStats = async () => {
    try {
      const { data, error } = await supabase.from('flightBooking').select('created_at, payment');
      if (error) throw error;

      const groupedData = data.reduce((acc, item) => {
        const formattedDate = format(new Date(item.created_at), 'eeee, dd MMM yyyy');
        acc[formattedDate] = (acc[formattedDate] || 0) + item.payment;
        return acc;
      }, {});

      const totalAmounts = Object.values(groupedData);

      setFlightStats({
        options: {
          chart: {
            height: 350,
            type: 'bar',
            zoom: {
              enabled: false,
            },
          },
          xaxis: {
            categories: Object.keys(groupedData),
          },
        },
        series: [{
          name: 'Total Bookings',
          data: totalAmounts,
        }],
      });
    } catch (error) {
      console.error('Error fetching flight stats:', error);
    }
  };

  const fetchData = async () => {
    try {
      const { data, error } = await supabase
        .from('hotel_booking')
        .select('date_of_booking, price');

      if (error) throw error;

      const count = data.length;
      setHotelBookingCount(count);

      const formattedDates = data.map(item =>
        format(new Date(item.date_of_booking), 'eeee, dd MMM yyyy')
      );

      const salesAmounts = data.map(item => item.price);

      setChartData({
        options: {
          chart: {
            height: 350,
            type: 'donut',
            zoom: {
              enabled: false,
            },
          },
          labels: formattedDates,
        },
        series: salesAmounts,
      });
    } catch (error) {
      console.error('Error fetching hotel booking data:', error);
    } finally {
      setLoading(false);
    }
  };
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'PHP' }).format(value);
  };

  useEffect(() => {
    setLoading(true);
    fetchFlightStats();
    fetchData();
    fetchPayments();
    fetchTotal();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }



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
              <h2 className="dashboard-title">Reports</h2>
              <p className="dashboard-date">
                {day},{" "}
                <span
                  style={{ color: "#3d3d3d" }}
                >{`${date} ${month} ${year}`}</span>
              </p>
              <Row>
                <div className='m-5 col-4 rounded-2 bg-body-secondary w-23'>
                  <h2>Hotel Booking Data</h2>
                  <p>Total Bookings: {hotelBookingCount}</p>
                  <Chart
                    options={chartData.options}
                    series={chartData.series}
                    height={350}
                    type='donut'
                  />
                </div>
                <div className='col-4 m-5 h-25 rounded-2 bg-body-secondary bg-gradient w-50'>
                  <h2>Sales Data Flights</h2>
                  <Chart
                    options={totalFlights.options}
                    series={totalFlights.series}
                    height={350}
                    type='bar'
                  />
                </div>
                <div className='col-4 bg-body-secondary m-5 h-25 rounded-2 bg-gradient w-50'>
                  <h2>Sales</h2>
                  <h2 className='m-lg-3'>Total Transactions: {formatCurrency(rpcConnector)}</h2>
                  <Chart
                    options={sales.options}
                    series={sales.series}
                    height={350}
                    type='line'
                  />
                </div>
                <div className='m-5 col-4 rounded-5 bg-body-secondary w-23'>
                  <h2 className='mt-5 m-lg-3'>Transactions</h2>
                  <p className='mt-5 m-lg-3'>Total Payments: {countPayment}</p>
                  <Chart
                    options={transactions.options}
                    series={transactions.series}
                    height={350}
                    type='donut'
                  />
                </div>
              </Row>
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
