/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Header from '../../panels/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,  Container, ListGroup, Row, Col } from 'react-bootstrap';
import { supabase } from '../../../supabaseClient';
import ModalWidget from './modal/ModalWidget';
import Swal from 'sweetalert2';
import InsertionOfRestaurants from './RestaurantsModals/InsertionOfRestaurants';
function FoodPlacesPosting() {
  const [dataFetched, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [hotelToEdit, setHotelToEdit] = useState(null);

  async function fetchData() {
    const { data, error } = await supabase.from('food_area').select('*');
    if (error) throw error;
    setData(data);
  }

  async function deleteData(id) {
    await supabase.from('food_area').delete().eq('id', id);
    Swal.fire({
      title: 'Hotel deleted successfully!',
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
            <h2 className="text-center w-25 col-1">Restaurants Postings</h2>
            <Button variant='success' className=' col-2' onClick={handleEditClick}>Add Restaurants</Button>
          </Row>
          <ListGroup className="mt-4">
            {dataFetched.map((hotel) => (
              <Container key={hotel.id} className='color'>
                <Row className='object-fit-cover'>
                  <div className='col-3'>
                    <div className='width'>
                      <img
                        className='pic'
                        src={`https://tglolshdsrixggmpvujc.supabase.co/storage/v1/object/public/food_area/${hotel.imgUrl}`}
                        alt={hotel.img}
                      />
                    </div>
                    <div className='mt-4'>
                      <div className=' width4'>
                        <h2 className=' text-sm '>Menu</h2>
                        <p className=' text-break'>{hotel.menu}</p>
                      </div>
                    </div>
                  </div>
                  <div className='col-9 col-md-9 col-lg-9'>
                    <h3>
                      {hotel.img}
                    </h3>
                    <p className=' text-info fw-bolder'>
                      {hotel.located}
                    </p>
                    <p className=''>
                      {hotel.description}
                    </p>
                    <h3 className=''>
                      Accomodations
                    </h3>
                    <Row>
                      {[...Array(20).keys()].map((index) => {
                        const amenityKey = `dineUrl${index + 1}`; 
                        const amenityKey2 = `dine${index + 1}`;
                        return hotel[amenityKey] ? (
                          <Col key={index} xs={7} md={3} className="d-flex justify-content-center">
                            <div className="width2">
                              <img
                                className="pic2"
                                src={`https://tglolshdsrixggmpvujc.supabase.co/storage/v1/object/public/food_area/${hotel[amenityKey]}`}
                              />
                              <p className='text-light position-absolute bottom-50' style={{
                                textAlign: 'center',
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
                      <Button variant="danger" onClick={() => deleteData(hotel.id)} className=" mt-3  mx-2">
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

          <InsertionOfRestaurants show={show} hide={handleCloseClick} />
        </div>
      </main>
    </div>
  );
}

export default FoodPlacesPosting