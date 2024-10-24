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

  async function deleteData(id) {
    await supabase.from('hotels').delete().eq('id', id);
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
            <h2 className="text-center w-25 col-1">Hotel Postings</h2>
            <Button variant='success' className=' col-2' onClick={handleEditClick}>Add Hotel</Button>
          </Row>
          <ListGroup className="mt-4">
            {dataFetched.map((hotel) => (
              <Container key={hotel.id} className='color'>
                <Row className='object-fit-cover'>
                  <div className='width'>
                    <img  className='pic' src={`https://tglolshdsrixggmpvujc.supabase.co/storage/v1/object/public/hotel_amenities_url/${hotel.image}`} />
                  </div>
                </Row>
                <div className="text-center">
                  <Button variant="primary" onClick={() => handleEditClickModal(hotel)} className="mx-2">
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => deleteData(hotel.id)}>
                    Delete
                  </Button>
                </div>
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
