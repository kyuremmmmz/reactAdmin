import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Modal } from 'react-bootstrap';
import { supabase } from '../../../../supabaseClient';
function ModalWidget({ HotelData, show, hide }) {
  const [name, setName] = useState('');
  const [hotelDescription, setHotelDescription] = useState('');
  const [price, setPrice] = useState(0);
  useEffect(() => {
    if (HotelData) {
      setName(HotelData.hotel_name || '');
      setHotelDescription(HotelData.hotel_description || '');
      setPrice(HotelData.hotel_price || 0);
    }
  }, [HotelData])

  const save = async () => {
    const { data, error } = await supabase.from('hotels').update({
      hotel_name: name,
      hotel_description: hotelDescription,
      hotel_price: price,
    }).eq('id', HotelData.id);
    if (error) throw error;
    hide();
    return data;
  }

  return (
    <div>
      <Modal show={show} onHide={hide}>
        <Modal.Header closeButton>
          <Modal.Title>Post Hotels</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Hotel Name</Form.Label>
              <Form.Control type="text" value={name} placeholder="Enter hotel name" onChange={(e) => setName(e.target.value) } />
            </Form.Group>
            <Form.Group>
              <Form.Label>Hotel Description</Form.Label>
              <Form.Control type="text" value={hotelDescription} placeholder="Enter hotel description" onChange={(e) => setHotelDescription(e.target.value) } />
            </Form.Group>
            <Form.Group>
              <Form.Label>Hotel Price</Form.Label>
              <Form.Control type="text" value={price} placeholder="Enter hotel Price" onChange={(e) => setPrice(parseInt(e.target.value, 10) || 0)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={save} variant='primary'>
            Save
          </Button>
          <Button onClick={save} variant='danger'>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalWidget
