import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { supabase } from '../../../../supabaseClient';
import Swal from 'sweetalert2';

function InsertionModal({ show, hide }) {
    const [placeName, setPlaceName] = useState('');
    const [placeDescription, setPlaceDescription] = useState('');
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
            const imagePath = await uploadImg(imageFile, 'places_url');
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
                place_name: placeName,
                description: placeDescription,
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
                    <Modal.Title>Post Place</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Place Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={placeName}
                                placeholder="Enter place name"
                                onChange={(e) => setPlaceName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Place Description</Form.Label>
                            <Form.Control
                                type="text"
                                value={placeDescription}
                                placeholder="Enter place description"
                                onChange={(e) => setPlaceDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                style={{ textAlign: 'center' }}
                                type="file"
                                onChange={(e) => setImageFile(e.target.files[0])}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Discount</Form.Label>
                            <Form.Control
                                type="text"
                                value={discount}
                                placeholder="Enter discount"
                                onChange={(e) => setDiscount(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                value={price}
                                placeholder="Enter place price"
                                onChange={(e) => setPrice(parseInt(e.target.value, 10) || 0)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                value={located}
                                placeholder="Enter place location"
                                onChange={(e) => setLocated(e.target.value)}
                            />
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
