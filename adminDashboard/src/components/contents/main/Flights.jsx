import react from "react";
import Header from "../../panels/Header";
import { Button, Col, Row } from "react-bootstrap";

const Flights = () => {
  return (
    <div>
      <Header />
      <main className="main">
        <Row>
          <div className=" m-4 col-1">
            <h2>Flights</h2>
          </div>
          <div className=" m-4 col-3">
            <Button variant="success">
                Add Flights
            </Button>
          </div>
        </Row>
      </main>
    </div>
  );
};

export default Flights;
