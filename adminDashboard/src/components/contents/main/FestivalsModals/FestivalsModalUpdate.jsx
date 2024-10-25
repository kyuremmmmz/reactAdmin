// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { supabase } from '../../../../supabaseClient';
import PropTypes from 'prop-types';

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
            // eslint-disable-next-line no-unused-vars
            const { data, error } = await supabase.storage
                .from('hotel_amenities_url')
                .upload(filePath, file);

            if (error) {
                Swal.fire('Error', error.message, 'error');
            } else {
                const updatedUrls = [...amenityUrls];
                updatedUrls[index] = fileName;
                setAmenityUrls(updatedUrls);
            }
        }
    };

    useEffect(() => {
        if (HotelData) {
            setHotelName(HotelData.img || '');
            setHotelDescription(HotelData.Description || '');
            setPrice(HotelData.Price || 0);
            setImage(HotelData.imgUrl || '');
            setLocated(HotelData.Located || '');
            const newAmenities = [];
            const newUrls = [];
            for (let i = 1; i <= 20; i++) {
                newAmenities.push(HotelData[`Dine${i}`] || '');
                newUrls.push(HotelData[`DineUrl${i}`] || '');
            }
            setAmenities(newAmenities);
            setAmenityUrls(newUrls);
        }
    }, [HotelData]);

    const save = async () => {
        const { data, error } = await supabase.from('Festivals').update({
            img: hotel_name,
            Description: hotel_description,
            hotel_price: price,
            imgUrl: image,
            Located: located,
            ...amenities.reduce((acc, curr, index) => ({
                ...acc,
                [`amenity${index + 1}`]: curr,
                [`amenity${index + 1}Url`]: amenityUrls[index],
            }), {}),
        }).match({ id: HotelData.id });

        if (error) {
            Swal.fire('Error', error.message, 'error');
            return;
        } else {
            Swal.fire('Success', 'Hotel details updated successfully!', 'success');
            hide();
        }

        if (data == null) {
            return;
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
                            as={'textarea'}
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

ModalWidget.propTypes = {
    HotelData: PropTypes.shape({
        id: PropTypes.string.isRequired,
        img: PropTypes.string,
        Description: PropTypes.string,
        Price: PropTypes.number,
        imgUrl: PropTypes.string,
        Located: PropTypes.string,
        Dine1: PropTypes.string,
        Dine2: PropTypes.string,
        Dine3: PropTypes.string,
        Dine4: PropTypes.string,
        Dine5: PropTypes.string,
        Dine6: PropTypes.string,
        Dine7: PropTypes.string,
        Dine8: PropTypes.string,
        Dine9: PropTypes.string,
        Dine10: PropTypes.string,
        Dine11: PropTypes.string,
        Dine12: PropTypes.string,
        Dine13: PropTypes.string,
        Dine14: PropTypes.string,
        Dine15: PropTypes.string,
        Dine16: PropTypes.string,
        Dine17: PropTypes.string,
        Dine18: PropTypes.string,
        Dine19: PropTypes.string,
        Dine20: PropTypes.string,
        DineUrl1: PropTypes.string,
        DineUrl2: PropTypes.string,
        DineUrl3: PropTypes.string,
        DineUrl4: PropTypes.string,
        DineUrl5: PropTypes.string,
        DineUrl6: PropTypes.string,
        DineUrl7: PropTypes.string,
        DineUrl8: PropTypes.string,
        DineUrl9: PropTypes.string,
        DineUrl10: PropTypes.string,
        DineUrl11: PropTypes.string,
        DineUrl12: PropTypes.string,
        DineUrl13: PropTypes.string,
        DineUrl14: PropTypes.string,
        DineUrl15: PropTypes.string,
        DineUrl16: PropTypes.string,
        DineUrl17: PropTypes.string,
        DineUrl18: PropTypes.string,
        DineUrl19: PropTypes.string,
        DineUrl20: PropTypes.string,
    }),
    show: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
};

export default ModalWidget;
