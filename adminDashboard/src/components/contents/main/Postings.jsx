import React, { useEffect, useState } from 'react';
import Header from '../../panels/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { supabase } from '../../../supabaseClient';
import ModalWidget from './modal/ModalWidget';
import InsertionModalWidget from './modal/InsertionModalWidget';
import Swal from 'sweetalert2';

function Postings() {
  const [dataFetched, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [hotelToEdit, setHotelToEdit] = useState(null);

  async function fetchData() {
    const { data, error } = await supabase.from('hotels').select('*');
    if (error) throw error;
    setData(data);
  }
  async function deleteData(id) {
    await supabase.from('hotels').delete().eq('id', id);
    Swal.fire({
      title: 'Hotel deleted successfully!',
      icon:'success',
      timer: 15000
    })
  }
  function handleEditClick() {
    setShow(true);
  }

  function handleCloseClick() {
    setShow(false);
    setHotelToEdit(null);
  }

  function handleEditClickModal(hotel) {
    setHotelToEdit(hotel);
    setShowEditModal(true);
  }

  function handleCloseClickModal() {
    setShowEditModal(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <main className='main'>
        <div className="container mt-5">
          <h2 className="text-center">Postings</h2>
          <Button variant='success' className='mt-4' onClick={handleEditClick}>Add Hotel</Button>
          <Row className="mt-4 justify-content-center">
            {dataFetched.map((hotel) => (
              <Col key={hotel.id} sm={12} md={6} lg={4} className="mb-4">
                <Card style={{ width: '100%', height: 'auto', border: '1px solid #007bff', borderRadius: '0.5rem' }} className="shadow-sm">
                  <Card.Body>
                    <Card.Title className="text-center">{hotel.hotel_name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted text-center">
                      Price: PHP {hotel.hotel_price}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Amenities:</strong>
                      <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                        {[...Array(20).keys()].map((index) => {
                          const amenityKey = `amenity${index + 1}`;
                          return hotel[amenityKey] && <li key={index}>{hotel[amenityKey]}</li>;
                        })}
                      </ul>
                    </Card.Text>
                    <Card.Text>
                      <strong>Amenities URL images:</strong>
                      <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
                        {[...Array(20).keys()].map((index) => {
                          const amenityKey = `amenity${index + 1}Url`;
                          return hotel[amenityKey] && <li key={index}>{hotel[amenityKey]}</li>;
                        })}
                      </ul>
                    </Card.Text>
                    <Card.Text>
                      <strong>Description:</strong> {hotel.hotel_description}
                    </Card.Text>
                    <Card.Text>
                      <strong>Description:</strong> {hotel.hotel_located}
                    </Card.Text>
                    <div className="text-center">
                      <Container>
                        <Row>
                          <Col>
                            <Button variant="primary" onClick={() => handleEditClickModal(hotel)} className="mx-2">
                              Edit
                            </Button>
                          </Col>
                          <Col>
                            <Button variant="danger" className="mt-2" onClick={()=> deleteData(hotel.id)}>
                              Delete
                            </Button>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {hotelToEdit && (
            <ModalWidget
              show={showEditModal}
              HotelData={hotelToEdit}
              hide={handleCloseClickModal}
            />
          )}

          <InsertionModalWidget show={show} hide={handleCloseClick} />

        </div>
      </main>
    </div>
  );
}

export default Postings;
