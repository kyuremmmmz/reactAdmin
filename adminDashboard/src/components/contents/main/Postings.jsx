import React, { useEffect, useState } from 'react';
import Header from '../../panels/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, ListGroup, Row, Col } from 'react-bootstrap';
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



  async function deleteData(id, image) {
    const { error: deleteHotelError } = await supabase.from('hotels').delete().eq('id', id);

    if (deleteHotelError) {
      Swal.fire({
        title: 'Error deleting hotel!',
        text: deleteHotelError.message,
        icon: 'error',
        timer: 15000
      });
      return;
    }

    console.log('Attempting to delete image at path:', image);

    const { error: deleteImageError } = await supabase.storage
      .from('hotel_amenities_url')
      .remove([image]);

    if (deleteImageError) {
      console.error('Delete Image Error:', deleteImageError);
      Swal.fire({
        title: 'Error deleting image!',
        text: deleteImageError.message,
        icon: 'error',
        timer: 15000
      });
      return;
    }

    Swal.fire({
      title: 'Hotel and image deleted successfully!',
      icon: 'success',
      timer: 15000
    });
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
          <Row>
            <h2 className="text-center w-25 col-1">Hotel Postings</h2>
            <Button variant='success' className=' col-2' onClick={handleEditClick}>Add Hotel</Button>
          </Row>
          <ListGroup className="mt-4">
            {dataFetched.map((hotel) => (
              <Container key={hotel.id} className='color'>
                <Row className='object-fit-cover'>
                  <div className='col-3'>
                    <div className='width'>
                      <img className='pic' src={`https://tglolshdsrixggmpvujc.supabase.co/storage/v1/object/public/hotel_amenities_url/${hotel.image}`} />
                    </div>
                    <div className=' mt-4'>
                      <div className=' width3'>
                        <h2 className=' text-sm'>Room Prices</h2>
                        <p>Deluxe Suite: ₱3,000 to ₱5,000 per night</p>
                        <p>Deluxe Suite: ₱3,000 to ₱5,000 per night</p>
                        <p>Deluxe Suite: ₱3,000 to ₱5,000 per night</p>
                        <p>Deluxe Suite: ₱3,000 to ₱5,000 per night</p>
                      </div>
                    </div>
                  </div>
                  <div className=' mt-3 col-9 col-md-9 col-lg-9'>
                    <h3>
                      {hotel.hotel_name}
                    </h3>
                    <p className=' text-info fw-bolder'>
                      {hotel.hotel_located}
                    </p>
                    <p className=''>
                      {hotel.hotel_description}
                    </p>
                    <h3 className=''>
                      Accomodations
                    </h3>
                    <Row>
                      {[...Array(20).keys()].map((index) => {
                        const amenityKey = `amenity${index + 1}Url`;
                        const amenityKey2 = `amenity${index + 1}`;
                        return hotel[amenityKey] ? (
                          <Col key={index} xs={7} md={3} className="d-flex justify-content-center">
                            <div className="width2">
                              <img
                                className="pic2"
                                src={`https://tglolshdsrixggmpvujc.supabase.co/storage/v1/object/public/hotel_amenities_url/${hotel[amenityKey]}`}
                              />
                              <p className='text-light position-absolute bottom-50' style={{
                                right: '100px',
                                transform: ' translateY(330%)',
                              }}>
                                {hotel[amenityKey2]}
                              </p>
                            </div>
                          </Col>
                        ) : null;
                      })}
                    </Row>
                    <div className="text-center mb-2">
                      <Button variant="primary" onClick={() => handleEditClickModal(hotel)} className=" mt-3 mx-2">
                        Edit
                      </Button>
                      <Button variant="danger" onClick={() => deleteData(hotel.id, hotel.image)} className=" mt-3  mx-2">
                        Delete
                      </Button>
                    </div>
                  </div>
                </Row>
              </Container>
            ))}
          </ListGroup>

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