import  { useEffect, useState } from "react";
import Header from "../../panels/Header";
import { Button, Col, Container, ListGroup, Row, Stack } from "react-bootstrap";
import { supabase } from "../../../supabaseClient";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";

const Flights = () => {
  const [flightsData, setData] = useState([]);

  const fetchData = async () => {
    const { data, error } = await supabase.from('flightsList').select('*');
    if (error) throw error;
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, [flightsData])

  const formatToString = (number) => {
    return Number(number).toLocaleString('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0
    });
  };
  const formatTime = (timestamp) => {
    console.log("Raw timestamp:", timestamp);

    if (!timestamp) {
      console.error("Invalid timestamp");
      return "Invalid Time";
    }

    
    const [timePart, timezoneOffset] = timestamp.split('+');

    const [hours, minutes, seconds] = timePart.split(':').map(part => parseInt(part, 10));

    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds || 0);

    if (timezoneOffset) {
      date.setHours(date.getHours());
    }

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    return date.toLocaleTimeString('en-US', options);
  };



  const formatAndSetDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-PH', options).toUpperCase();
    return formattedDate;
  };


  return (
    <div>
      <Header />
      <main className="main">
        <Stack gap={5} direction="horizontal">
          <div>
            <h2>Flights</h2>  
          </div>
          <div>
            <Button variant="success">
              Add New Flight
            </Button>
          </div>
        </Stack>
        <Row>
          {flightsData && flightsData.map((item) => (
            <ListGroup.Item key={item.id}>
              <div className="booking-item2">
                <Row>
                  <Stack gap={2} direction="horizontal">
                    <p className="text-success fw-bold fs-6">AirPort: </p>
                    <p className="text-info">{item.airport}</p>
                  </Stack>
                </Row>
                <Row>
                  <Stack style={{ transform: 'translateY(-24%)' }} direction="vertical">
                    <p className="fs-6">Trip to Pangasinan</p>
                  </Stack>
                </Row>
                <Row>
                  <Stack gap={2} direction="horizontal">
                    <div className="rounded-circle">
                      <img
                        src={`https://tglolshdsrixggmpvujc.supabase.co/storage/v1/object/public/flights/${item.airplane_img}`}
                        className="rounded-circle"
                        alt="Airplane"
                      />
                    </div>
                    <Row>
                      <Col>
                        <Col><p className="fw-bold fs-5">{formatTime(item.departure)}</p></Col>
                        <Col><p>{item.airplane } . { formatAndSetDate(item.date) }</p></Col>
                      </Col>
                    </Row>
                    
                    <FaPlaneDeparture size={25} color=""/>
                    <div className="horizontal-line w-25 rounded-circle bg-black"></div>
                    <FaPlaneArrival size={25} color="" />
                    <Row>
                      <Col>
                        <Col><p className="fw-bold fs-5">{formatTime(item.arrival)}</p></Col>
                        <Col><p>{item.place} . {formatAndSetDate(item.date_departure)}</p></Col>
                      </Col>
                    </Row>
                  </Stack>
                </Row>
                <div className="d-flex justify-content-end top-0">
                  <p className=" text-dark fs-5 fw-bold">PHP {formatToString(item.price) }</p>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </Row>
      </main>
    </div>
  );
};

export default Flights;
