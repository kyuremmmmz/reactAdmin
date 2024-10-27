// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { supabase } from '../../../../supabaseClient';
import PropTypes from 'prop-types';

function UpdateModals({ PlaceData, show, hide }) {
    const [place_name, setHotelName] = useState(null);
    const [description, setHotelDescription] = useState(null);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(null);
    const [locatedIn, setLocated] = useState(null);



    useEffect(() => {
        if (PlaceData) {
            setHotelName(PlaceData.place_name || null);
            setHotelDescription(PlaceData.description || null);
            setPrice(PlaceData.price || 0);
            setImage(PlaceData.image || null);
            setLocated(PlaceData.locatedIn || null);
        }
    }, [PlaceData]);

    const save = async () => {
        const { data, error } = await supabase.from('places').update({
            place_name: place_name,
            description: description,
            price: price,
            image: image,
            locatedIn: locatedIn,
        }).match({ id: PlaceData.id });

        if (error) {
            Swal.fire('Error', error.message, 'error');
            return null;
        } else {
            Swal.fire('Success', 'Places details updated successfully!', 'success');
            hide();
        }

        if (data == null) {
            return null;
        }
    };

    return (
        <Modal show={show} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Hotel Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup controlId="formHotelName">
                        <Form.Label>Hotel Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={place_name}
                            onChange={(e) => setHotelName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="formHotelDescription">
                        <Form.Label> Description</Form.Label>
                        <Form.Control
                            as={'textarea'}
                            value={description}
                            onChange={(e) => setHotelDescription(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="formLocated">
                        <Form.Label>Located In</Form.Label>
                        <Form.Control
                            type="text"
                            value={locatedIn}
                            onChange={(e) => setLocated(e.target.value)}
                        />
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={hide}>
                    Close
                </Button>
                <Button variant="primary" onClick={save}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

UpdateModals.propTypes = {
    PlaceData: PropTypes.shape({
        id: PropTypes.string.isRequired,
        place_name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string,
        locatedIn: PropTypes.string,
    }),
    show: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
}

export default UpdateModals;
