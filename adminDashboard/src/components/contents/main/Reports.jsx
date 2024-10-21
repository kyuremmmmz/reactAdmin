import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { supabase } from '../../../supabaseClient';
import { format } from 'date-fns';
import Header from "../../panels/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
const Reports = () => {
  const [chartData, setChartData] = useState({ options: {}, series: [] });
  const [totalFlights, setFlightStats] = useState({ options: {}, series: [] });
  const [loading, setLoading] = useState(true);

  const fetchFlightStats = async () => {
    try {
      const { data, error } = await supabase.from('flightBooking').select('created_at, payment');
      if (error) throw error;
      const groupedData = data.reduce((acc, item) => {
        const formattedDate = format(new Date(item.created_at), 'eeee, dd MMM yyyy, hh:mm a');
        acc[formattedDate] = (acc[formattedDate] || 0) + item.payment;
        return acc;
      }, {});

      const dates = Object.keys(groupedData);
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
            categories: dates,
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

      const formattedDates = data.map(item =>
        format(new Date(item.date_of_booking), 'eeee, dd MMM yyyy, hh:mm a')
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
          xaxis: {
            categories: formattedDates
          }
        },
        series: salesAmounts,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchFlightStats();
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <main className='data'>
        <h2>Hotel Booking Data</h2>
        <Chart
          options={chartData.options}
          series={chartData.series}
          height={350}
          type='donut'
        />
        <h2>Sales Data Flights</h2>
        <Chart
          options={totalFlights.options}
          series={totalFlights.series}
          height={350}
          type='bar'
        />
      </main>
    </div>
  );
};

export default Reports;
