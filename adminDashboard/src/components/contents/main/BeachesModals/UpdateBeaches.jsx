// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { supabase } from '../../../../supabaseClient';
import PropTypes from 'prop-types';
function UpdateBeaches({ BeachData, show, hide }) {
    const [place_name, setHotelName] = useState(null);
    const [description, setHotelDescription] = useState(null);
    const [image, setImage] = useState(null);
    const [locatedIn, setLocated] = useState(null);



    useEffect(() => {
        if (BeachData) {
            setHotelName(BeachData.beach_name || null);
            setHotelDescription(BeachData.description || null);
            setImage(BeachData.image || null);
            setLocated(BeachData.beach_located || null);
        }
    }, [BeachData]);

    const save = async () => {
        const { data, error } = await supabase.from('Beaches').update({
            beach_name: place_name,
            description: description,
            image: image,
            beach_located: locatedIn,
        }).match({ id: BeachData.id });

        if (error) {
            Swal.fire('Error', error.message, 'error');
            return null;
        } else {
            Swal.fire('Success', `${place_name} details updated successfully!`, 'success');
            hide();
        }

        if (data == null) {
            return null;
        }
    };

    return (
        <Modal show={show} onHide={hide}>
            <Modal.Header closeButton>
                <Modal.Title>{ `${place_name} details` }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup controlId="formHotelName">
                        <Form.Label>Beach Name</Form.Label>
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
                    <FormGroup controlId="formLocated">
                        <Form.Label>Beach Location</Form.Label>
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

UpdateBeaches.propTypes = {
    BeachData: PropTypes.shape({
        id: PropTypes.string.isRequired,
        beach_name: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        image: PropTypes.string,
        beach_located: PropTypes.string,
    }),
    show: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
}

export default UpdateBeaches