import React, { useEffect, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { supabase } from '../../../../supabaseClient';
function InsertionModalWidget({ show, hide }) {
    const [hotel_name, setHotelName] = useState('');
    const [hotel_description, setHotelDescription] = useState('');
    const [price, setPrice] = useState(0);

    //For the insertion data
    
    const save = async () => {
        try {
            const { data, error } = await supabase.from('hotels').insert({
                hotel_name: hotel_name,
                hotel_description: hotel_description,
                hotel_price: price,
            });
            if (error) throw error;
            hide();
            return data;
        } catch (e) {
            console.log(e);
            
        }
    }
    useEffect(() => {
        //Place holder muna
    }, [])
    
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
                        <Form.Control type="text" placeholder="Enter hotel name" onChange={(e) => setHotelName(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Hotel Description</Form.Label>
                        <Form.Control type="text"  placeholder="Enter hotel description" onChange={(e) => setHotelDescription(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Hotel Price</Form.Label>
                        <Form.Control type="text"  placeholder="Enter hotel Price" onChange={(e) => setPrice(parseInt(e.target.value, 10) || 0)} />
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

export default InsertionModalWidget
