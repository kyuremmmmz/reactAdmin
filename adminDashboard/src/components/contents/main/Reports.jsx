import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { supabase } from '../../../supabaseClient';
import { format } from 'date-fns';
import Header from "../../panels/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row } from 'react-bootstrap';

const Reports = () => {
  const [chartData, setChartData] = useState({ options: {}, series: [] });
  const [totalFlights, setFlightStats] = useState({ options: {}, series: [] });
  const [hotelBookingCount, setHotelBookingCount] = useState(0);
  const [countPayment, setCountPay] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState({options: {}, series: []});


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

  useEffect(() => {
    setLoading(true);
    fetchFlightStats();
    fetchData();
    fetchPayments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <main className='data'>
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
            <h2>Users</h2>
            <Chart
              options={totalFlights.options}
              series={totalFlights.series}
              height={350}
              type='donut'
            />
          </div>
          <div className='m-5 col-4 rounded-5 bg-body-secondary w-23'>
            <h2 className=' mt-5 m-lg-3'>Total Transactions</h2>
            <p className=' mt-5 m-lg-3'>Total Payments: {countPayment}</p>
            <Chart
              options={transactions.options}
              series={transactions.series}
              height={350}
              type='donut'
            />
          </div>
        </Row>
      </main>
    </div>
  );
};

export default Reports;
