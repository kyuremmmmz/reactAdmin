import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { supabase } from '../../../../supabaseClient';
import Swal from 'sweetalert2';

function InsertionModal({ show, hide }) {
    const [hotelName, setHotelName] = useState('');
    const [hotelDescription, setHotelDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [located, setLocated] = useState('');

    const uploadImg = async (image, folder) => {
        const { data, error } = await supabase.storage.from(folder).upload(image.name, image);
        if (error) throw error;
        return data.path;
    };

    const handleImageUpload = async () => {
        if (!imageFile) {
            Swal.fire({
                title: 'Please select a place image file',
                icon: 'error',
                showConfirmButton: true,
            });
            return null;
        }

        try {
            const imagePath = await uploadImg(imageFile, 'place_url');
            return imagePath;
        } catch (e) {
            Swal.fire({
                title: e.message,
                icon: 'error',
                showConfirmButton: true,
            });
            return null;
        }
    };


    const handlePost = async () => {
        const imagePath = await handleImageUpload();
        if (!imagePath) return;

        try {
            const { data, error } = await supabase.from('places').insert([{
                place_name: hotelName,
                description: hotelDescription,
                price: price,
                locatedIn: located,
                image: imagePath,
            }]);

            if (error) throw error;
            hide();
            Swal.fire({
                title: 'Place has been posted!',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
            });
            return data;
        } catch (e) {
            Swal.fire({
                title: e.message,
                icon: 'error',
                showConfirmButton: true,
            });
        }
    };


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
                            <Form.Control type="text" value={hotelName} placeholder="Enter hotel name" onChange={(e) => setHotelName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Hotel Description</Form.Label>
                            <Form.Control type="text" value={hotelDescription} placeholder="Enter hotel description" onChange={(e) => setHotelDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control style={{ textAlign: 'center' }} type="file" onChange={(e) => setImageFile(e.target.files[0])} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Discount</Form.Label>
                            <Form.Control type="text" value={discount} placeholder="Enter hotel discount" onChange={(e) => setDiscount(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Hotel Price</Form.Label>
                            <Form.Control type="text" value={price} placeholder="Enter hotel Price" onChange={(e) => setPrice(parseInt(e.target.value, 10) || 0)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Hotel Located</Form.Label>
                            <Form.Control type="text" value={located} placeholder="Enter hotel located" onChange={(e) => setLocated(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handlePost} variant='primary'>
                        Save
                    </Button>
                    <Button onClick={hide} variant='danger'>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default InsertionModal;
