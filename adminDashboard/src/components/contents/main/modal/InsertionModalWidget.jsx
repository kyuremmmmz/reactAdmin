import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { supabase } from '../../../../supabaseClient';
import Swal from 'sweetalert2';

function InsertionModalWidget({ show, hide }) {
    const [hotelName, setHotelName] = useState('');
    const [hotelDescription, setHotelDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [located, setLocated] = useState('');
    const [amenities, setAmenities] = useState(Array(20).fill(''));
    const [amenityImages, setAmenityImages] = useState(Array(20).fill(null));

    const uploadImg = async (image, folder) => {
        const { data, error } = await supabase.storage.from(folder).upload(image.name, image);
        if (error) throw error;
        return data.path;
    };

    const handleImageUpload = async () => {
        if (!imageFile) {
            Swal.fire({
                title: 'Please select a hotel image file',
                icon: 'error',
                showConfirmButton: true,
            });
            return null;
        }

        try {
            const imagePath = await uploadImg(imageFile, 'hotel_amenities_url');
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

    const handleAmenityImageUpload = async (index) => {
        const image = amenityImages[index];
        if (!image) {
            Swal.fire({
                title: `Please select an image file for amenity ${index + 1}`,
                icon: 'error',
                showConfirmButton: true,
            });
            return null;
        }

        try {
            const imagePath = await uploadImg(image, 'hotel_amenities_url'); 
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

        const amenityImagePaths = await Promise.all(
            amenityImages.map((_, index) => handleAmenityImageUpload(index))
        );

        try {
            const { data, error } = await supabase.from('hotels').insert([{
                hotel_name: hotelName,
                hotel_description: hotelDescription,
                hotel_price: price,
                hotel_discount: discount,
                hotel_located: located,
                image: imagePath,
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
                amenity1Url: amenityImagePaths[0],
                amenity2Url: amenityImagePaths[1],
                amenity3Url: amenityImagePaths[2],
                amenity4Url: amenityImagePaths[3],
                amenity5Url: amenityImagePaths[4],
                amenity6Url: amenityImagePaths[5],
                amenity7Url: amenityImagePaths[6],
                amenity8Url: amenityImagePaths[7],
                amenity9Url: amenityImagePaths[8],
                amenity10Url: amenityImagePaths[9],
                amenity11Url: amenityImagePaths[10],
                amenity12Url: amenityImagePaths[11],
                amenity13Url: amenityImagePaths[12],
                amenity14Url: amenityImagePaths[13],
                amenity15Url: amenityImagePaths[14],
                amenity16Url: amenityImagePaths[15],
                amenity17Url: amenityImagePaths[16],
                amenity18Url: amenityImagePaths[17],
                amenity19Url: amenityImagePaths[18],
                amenity20Url: amenityImagePaths[19],
            }]);

            if (error) throw error;
            hide();
            Swal.fire({
                title: 'Hotel has been posted!',
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

    const handleAmenityChange = (index, value) => {
        const updatedAmenities = [...amenities];
        updatedAmenities[index] = value;
        setAmenities(updatedAmenities);
    };

    const handleAmenityChangeImages = (index, value) => {
        const updatedAmenitiesImages = [...amenityImages];
        updatedAmenitiesImages[index] = value;
        setAmenityImages(updatedAmenitiesImages);
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
                        {amenities.map((amenity, index) => (
                            <React.Fragment key={index}>
                                <Form.Group>
                                    <Form.Label>Amenity {index + 1}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={`Enter amenity ${index + 1}`}
                                        onChange={(e) => handleAmenityChange(index, e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Amenity {index + 1} Image</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={(e) => handleAmenityChangeImages(index, e.target.files[0])}
                                    />
                                </Form.Group>
                            </React.Fragment>
                        ))}
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

export default InsertionModalWidget;
