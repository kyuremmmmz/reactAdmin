// eslint-disable-next-line no-unused-vars
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { supabase } from '../../../../supabaseClient';
// eslint-disable-next-line react/prop-types
function ModalWidget({ HotelData, show, hide }) {
    const [hotel_name, setHotelName] = useState('');
    const [hotel_description, setHotelDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState('');
    const [image, setImage] = useState(null);
    const [located, setLocated] = useState('');
    const [amenities, setAmenities] = useState(Array(20).fill(''));

    const handleAmenityChange = (index, value) => {
        const updatedAmenities = [...amenities];
        updatedAmenities[index] = value;
        setAmenities(updatedAmenities);
    };

    useEffect(() => {
        if (HotelData) {
            // eslint-disable-next-line react/prop-types
            setHotelName(HotelData.hotel_name || '');
            // eslint-disable-next-line react/prop-types
            setHotelDescription(HotelData.hotel_description || '');
            // eslint-disable-next-line react/prop-types
            setPrice(HotelData.hotel_price || 0);
            // eslint-disable-next-line react/prop-types
            setDiscount(HotelData.hotel_discount || '');
            // eslint-disable-next-line react/prop-types
            setImage(HotelData.image || null);
            // eslint-disable-next-line react/prop-types
            setLocated(HotelData.hotel_located || '');
        }
    }, [HotelData])

    const save = async () => {
        const { data, error } = await supabase.from('hotels').update({
            hotel_name: hotel_name,
            hotel_description: hotel_description,
            hotel_price: price,
            hotel_discount: discount,
            image: image,
            hotel_located: located,
            amenity1: amenities[0],
            amenity2: amenities[1],
            amenity3: amenities[2],
            amenity4: amenities[3],
            amenity5: amenities[4],
            amenity6: amenities[5],
            amenity7: amenities[6],
            amenity8: amenities[7],
            amenity9: amenities[8],
            amenity10: amenities[9],
            amenity11: amenities[10],
            amenity12: amenities[11],
            amenity13: amenities[12],
            amenity14: amenities[13],
            amenity15: amenities[14],
            amenity16: amenities[15],
            amenity17: amenities[16],
            amenity18: amenities[17],
            amenity19: amenities[18],
            amenity20: amenities[19],
            // eslint-disable-next-line react/prop-types
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
                            <Form.Control type="text" value={hotel_name} placeholder="Enter hotel name" onChange={(e) => setHotelName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Hotel Description</Form.Label>
                            <Form.Control type="text" value={hotel_description} placeholder="Enter hotel description" onChange={(e) => setHotelDescription(e.target)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control style={{ textAlign: 'center' }} type="file"  placeholder="Enter hotel image" onChange={(e) => setImage(e.target.files[0])} />
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
                        {amenities.map((amenity, index) => (
                            <>
                                <Form.Group key={index}>
                                    <Form.Label>Amenity {index + 1}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={amenity}
                                        placeholder={`Enter amenity ${index + 1}`}
                                        onChange={(e) => handleAmenityChange(index, e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group key={index}>
                                    <Form.Label>Amenity {index + 1} Url</Form.Label>
                                    <Form.Control
                                        type="file"
                                        value={amenity}
                                        placeholder={`Enter amenity ${index + 1}`}
                                        onChange={(e) => handleAmenityChange(index, e.target.files[0])}
                                    />
                                </Form.Group>
                            </>
                        ))}
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
