import  { useEffect, useState } from "react";
import Header from "../../panels/Header";
import { Button, Col, ListGroup, Row, Stack } from "react-bootstrap";
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
        <Stack gap={3} direction="horizontal">
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
                <Row>
                  <Col>{item.id}</Col>
                  <Col>{item.price}</Col>
                </Row>
              </ListGroup.Item>
            )) }
          </Col>
        </Row>
      </main>
    </div>
  );
};

export default Flights;
