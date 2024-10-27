import  { useEffect, useState } from "react";
import Header from "../../panels/Header";
import { Button, Col, Container, ListGroup, Row, Stack } from "react-bootstrap";
import { supabase } from "../../../supabaseClient";

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
  const formatTime = (timestamp) => {
    console.log("Raw timestamp:", timestamp);

    if (!timestamp) {
      console.error("Invalid timestamp");
      return "Invalid Time";
    }

    const [timePart, timezoneOffset] = timestamp.split('+');

    const [hours, minutes, seconds] = timePart.split(':');

    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(0);


    if (timezoneOffset) {
      const offsetHours = parseInt(timezoneOffset, 10); 
      date.setHours(date.getHours() + offsetHours);
    }
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    return date.toLocaleTimeString([], options);
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
                    <div>
                      <p className="fw-bold fs-3">{formatTime(item.departure)}</p>
                    </div>
                  </Stack>
                </Row>
              </div>
            </ListGroup.Item>
          ))}
        </Row>
      </main>
    </div>
  );
};

export default Flights;
