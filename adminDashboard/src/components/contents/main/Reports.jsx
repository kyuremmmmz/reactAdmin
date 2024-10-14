import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { supabase } from '../../../supabaseClient';
import { format } from 'date-fns'; 
import Header from "../../panels/Header";

const Reports = () => {
  const [chartData, setChartData] = useState({ options: {}, series: [] });
  const [totalFlights, setFlightStats] = useState({options: {}, series: [] });
  const [loading, setLoading] = useState(true);


  const fetchFlightStats = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('flightBooking').select('created_at, payment');
      if (error) throw error;
    const totalAmount = data.map(item => item.payment)
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
            categories: data.map(item => format(new Date(item.created_at), 'eeee, dd MMM yyyy, hh:mm a')),
          },
        },
        series: [{
          name: 'Total bookings',
          data: totalAmount,
        }]
      })
    } catch (e) {
      console.error(e);
     };
  }

  const fetchData = async () => {
    setLoading(true);
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
            type: 'line',
            zoom: {
              enabled: false,
            },
          },
          xaxis: {
            categories: formattedDates,
          },
        },
        series: [
          {
            name: 'Total Payments',
            data: salesAmounts,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
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
        <h2>Sales Data</h2>
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
        <h2>Sales Data Flights</h2>
        <Chart
          options={totalFlights.options}
          series={totalFlights.series}
          type="bar"
          height={350}
        />
      </main>
    </div>
  );
};

export default Reports;
