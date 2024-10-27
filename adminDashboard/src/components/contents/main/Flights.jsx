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
          {/* Flight cards */}
          <Col>
            {flightsData && flightsData.map((item) => (
              <ListGroup.Item key={item.id}>
                <div className="booking-item2">
                  <Row>
                    <Stack  gap={2} direction="horizontal">
                      <p className=" text-success fw-bold fs-6">AirPort: </p>
                      <p className=" text-info">{item.airport}</p>
                    </Stack>
                  </Row>
                  <Row>
                    <Stack style={{transform: 'translateY(-24%)'}} direction="vertical">
                      <p className=" fs-6">Trip to Pangasinan</p>
                    </Stack>
                  </Row>
                  <Row>
                    <Stack style={{ transform: 'translateY(-24%)' }} direction="vertical">
                      <p className=" fs-6">Trip to Pangasinan</p>
                    </Stack>
                  </Row>
                  </div>
              </ListGroup.Item>
            )) }
          </Col>
        </Row>
      </main>
    </div>
  );
};

export default Flights;
