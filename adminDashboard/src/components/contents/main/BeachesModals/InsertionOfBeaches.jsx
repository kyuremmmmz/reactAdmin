// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { supabase } from '../../../../supabaseClient';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
function InsertionOfBeaches({ show, hide }) {
    const [hotelName, setHotelName] = useState('');
    const [hotelDescription, setHotelDescription] = useState('');
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
            const imagePath = await uploadImg(imageFile, 'beaches');
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
            const { data, error } = await supabase.from('Beaches').insert([{
                beach_name: hotelName,
                description: hotelDescription,
                beach_located: located,
                image: imagePath,
            }]);

            if (error) throw error;
            hide();
            Swal.fire({
                title: `${hotelName} has been posted!`,
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
                    <Modal.Title>Post Beaches</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Beach Name</Form.Label>
                            <Form.Control type="text" value={hotelName} placeholder="Enter beach name" onChange={(e) => setHotelName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Beach Description</Form.Label>
                            <Form.Control as="textarea" value={hotelDescription} placeholder="Enter beach description" onChange={(e) => setHotelDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control style={{ textAlign: 'center' }} type="file" onChange={(e) => setImageFile(e.target.files[0])} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Beach Location</Form.Label>
                            <Form.Control type="text" value={located} placeholder="Enter beach location" onChange={(e) => setLocated(e.target.value)} />
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

InsertionOfBeaches.propTypes = {
    show: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
}

export default InsertionOfBeaches
