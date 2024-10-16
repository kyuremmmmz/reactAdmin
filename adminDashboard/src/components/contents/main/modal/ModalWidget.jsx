import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { supabase } from '../../../../supabaseClient';

function ModalWidget({ HotelData, show, hide }) {
    const [hotel_name, setHotelName] = useState('');
    const [hotel_description, setHotelDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState('');
    const [image, setImage] = useState(null);
    const [located, setLocated] = useState('');
    const [amenities, setAmenities] = useState(Array(20).fill(''));
    const [amenityUrls, setAmenityUrls] = useState(Array(20).fill(''));

    const handleAmenityChange = (index, value) => {
        const updatedAmenities = [...amenities];
        updatedAmenities[index] = value;
        setAmenities(updatedAmenities);
    };

    const handleAmenityUrlChange = async (index, file) => {
        if (file) {
            const fileName = `${HotelData.id}_${file.name}`;
            const filePath = `${fileName}`;
            const { data, error } = await supabase.storage
                .from('hotel_amenities_url')
                .upload(filePath, file);

            if (error) {
                Swal.fire('Error', error.message, 'error');
            } else {
                const updatedUrls = [...amenityUrls];
                updatedUrls[index] = fileName; // Store only the file name
                setAmenityUrls(updatedUrls);
            }
        }
    };

    useEffect(() => {
        if (HotelData) {
            setHotelName(HotelData.hotel_name || '');
            setHotelDescription(HotelData.hotel_description || '');
            setPrice(HotelData.hotel_price || 0);
            setDiscount(HotelData.hotel_discount || '');
            setImage(HotelData.image || null);
            setLocated(HotelData.hotel_located || '');
            const newAmenities = [];
            const newUrls = [];
            for (let i = 1; i <= 20; i++) {
                newAmenities.push(HotelData[`amenity${i}`] || '');
                newUrls.push(HotelData[`amenity${i}Url`] || '');
            }
            setAmenities(newAmenities);
            setAmenityUrls(newUrls);
        }
    }, [HotelData]);

    const save = async () => {
        const { data, error } = await supabase.from('hotels').update({
            hotel_name,
            hotel_description,
            hotel_price: price,
            hotel_discount: discount,
            image,
            hotel_located: located,
            ...amenities.reduce((acc, curr, index) => ({
                ...acc,
                [`amenity${index + 1}`]: curr,
                [`amenity${index + 1}Url`]: amenityUrls[index],
            }), {}),
        }).match({ id: HotelData.id });

        if (error) {
            Swal.fire('Error', error.message, 'error');
        } else {
            Swal.fire('Success', 'Hotel details updated successfully!', 'success');
            hide();
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
                            value={hotel_name}
                            onChange={(e) => setHotelName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="formHotelDescription">
                        <Form.Label>Hotel Description</Form.Label>
                        <Form.Control
                            type="text"
                            value={hotel_description}
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
                    <FormGroup controlId="formDiscount">
                        <Form.Label>Discount</Form.Label>
                        <Form.Control
                            type="text"
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup controlId="formLocated">
                        <Form.Label>Located In</Form.Label>
                        <Form.Control
                            type="text"
                            value={located}
                            onChange={(e) => setLocated(e.target.value)}
                        />
                    </FormGroup>
                    {amenities.map((amenity, index) => (
                        <FormGroup key={index} controlId={`formAmenity${index + 1}`}>
                            <Form.Label>Amenity {index + 1}</Form.Label>
                            <Form.Control
                                type="text"
                                value={amenity}
                                onChange={(e) => handleAmenityChange(index, e.target.value)}
                            />
                            <Form.Label>Amenity {index + 1} URL</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => handleAmenityUrlChange(index, e.target.files[0])}
                            />
                        </FormGroup>
                    ))}
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

export default ModalWidget;
