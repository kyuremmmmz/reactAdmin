import React, { useEffect, useState } from 'react';
import Header from '../../panels/Header';
import Swal from 'sweetalert2';
import { FaPlaneDeparture, FaPlaneArrival, FaCalendarAlt } from 'react-icons/fa';

function Flights() {
  const [flights, setFlights] = useState([]);

  // Dummy data for flights
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dummyFlights = [
    {
      id: 1,
      airline: 'Airline A',
      departure: 'City A',
      arrival: 'City B',
      date: 'October 30, 2024',
      price: 120,
      duration: 2,
    },
    {
      id: 2,
      airline: 'Airline B',
      departure: 'City C',
      arrival: 'City D',
      date: 'October 31, 2024',
      price: 200,
      duration: 3,
    },
    {
      id: 3,
      airline: 'Airline C',
      departure: 'City E',
      arrival: 'City F',
      date: 'November 1, 2024',
      price: 150,
      duration: 1.5,
    },
    {
      id: 4,
      airline: 'Airline D',
      departure: 'City G',
      arrival: 'City H',
      date: 'November 2, 2024',
      price: 250,
      duration: 2.5,
    },
  ];

  useEffect(() => {
    setFlights(dummyFlights);
  }, []);

  return (
    <div>
      <Header />
      <main className="main">
        <h2>Flight Listings</h2>
        <div className="flights-container">
          {flights.map((flight) => (
            <div key={flight.id} className="flight-item">
              <h5>{flight.airline}</h5>
              <p>
                <FaPlaneDeparture /> {flight.departure} &rarr; {flight.arrival}
              </p>
              <p>
                <FaCalendarAlt /> {flight.date}
              </p>
              <p>
                <strong>Price:</strong> ${flight.price}
              </p>
              <p>
                <strong>Duration:</strong> {flight.duration} hours
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Flights;
