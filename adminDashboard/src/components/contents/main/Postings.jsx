import React, { useEffect, useState } from 'react';
import Header from '../../panels/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table } from 'react-bootstrap';
import { supabase } from '../../../supabaseClient';
import ModalWidget from './modal/ModalWidget';

function Postings() {
  const [datafetched, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [hotelToEdit, setHotelToEdit] = useState(null);

  async function fetchDate() {
    const { data, error } = await supabase.from('hotels').select('*');
    if (error) throw error;
    setData(data);
  }
  
  function handleEditClick(hotel) {
    setHotelToEdit(hotel);
    setShow(true);
  }

  function handleCloseClick() {
    setShow(false);
    setHotelToEdit(null);
  }

  useEffect(() => {
    fetchDate();
  }, []);

  return (
    <div>
      <Header />
      <div className="container mt-5">
        <h2>Postings</h2>
        <div className="row">
          <Table striped bordered hover variant="white">
            <thead>
              <tr>
                <th>ID</th>
                <th>Hotel Name</th>
                <th>Price</th>
                <th>Amenity1</th>
                <th>Amenity2</th>
                <th>Amenity3</th>
                <th>Amenity4</th>
                <th>Amenity5</th>
                <th>Amenity6</th>
                <th>Amenity7</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {datafetched.map((value) => (
                <tr key={value.id}>
                  <td>{value.id}</td>
                  <td>{value.hotel_name}</td>
                  <td>{value.hotel_price}</td>
                  <td>{value.amenity1}</td>
                  <td>{value.amenity2}</td>
                  <td>{value.amenity3}</td>
                  <td>{value.amenity4}</td>
                  <td>{value.amenity5}</td>
                  <td>{value.amenity6}</td>
                  <td>{value.amenity7}</td>
                  <td>{value.hotel_description}</td>
                  <td>
                    <Button variant="danger">Delete</Button>
                    <Button variant="primary" onClick={() => handleEditClick(value)}>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {hotelToEdit && (
            <ModalWidget
              show={show}
              HotelData={hotelToEdit}
              hide={handleCloseClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Postings;
