import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { supabase } from '../../../../supabaseClient';

function FestivalsInsertion({ show, hide }) {
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
            const imagePath = await uploadImg(imageFile, 'Festivals');
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
            const imagePath = await uploadImg(image, 'Festivals');
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
            const { data, error } = await supabase.from('Festivals').insert([{
                img: hotelName,
                Description: hotelDescription,
                Price: price,
                Located: located,
                TipsForVisitors: discount,
                imgUrl: imagePath,
                Dine1: amenities[0] || null,
                Dine2: amenities[1] || null,
                Dine3: amenities[2] || null,
                Dine4: amenities[3] || null,
                Dine5: amenities[4] || null,
                Dine6: amenities[5] || null,
                Dine7: amenities[6] || null,
                Dine8: amenities[7] || null,
                Dine9: amenities[8] || null,
                Dine10: amenities[9] || null,
                Dine11: amenities[10] || null,
                Dine12: amenities[11] || null,
                Dine13: amenities[12] || null,
                Dine14: amenities[13] || null,
                Dine15: amenities[14] || null,
                Dine16: amenities[15] || null,
                Dine17: amenities[16] || null,
                Dine18: amenities[17] || null,
                Dine19: amenities[18] || null,
                Dine20: amenities[19] || null,
                DineUrl1: amenityImagePaths[0] || null,
                DineUrl2: amenityImagePaths[1] || null,
                DineUrl3: amenityImagePaths[2] || null,
                DineUrl4: amenityImagePaths[3] || null,
                DineUrl5: amenityImagePaths[4] || null,
                DineUrl6: amenityImagePaths[5] || null,
                DineUrl7: amenityImagePaths[6] || null,
                DineUrl8: amenityImagePaths[7] || null,
                DineUrl9: amenityImagePaths[8] || null,
                DineUrl10: amenityImagePaths[9] || null,
                DineUrl11: amenityImagePaths[10] || null,
                DineUrl12: amenityImagePaths[11] || null,
                DineUrl13: amenityImagePaths[12] || null,
                DineUrl14: amenityImagePaths[13] || null,
                DineUrl15: amenityImagePaths[14] || null,
                DineUrl16: amenityImagePaths[15] || null,
                DineUrl17: amenityImagePaths[16] || null,
                DineUrl18: amenityImagePaths[17] || null,
                DineUrl19: amenityImagePaths[18] || null,
                DineUrl20: amenityImagePaths[19] || null,
            }]);

            if (error) throw error;
            hide();
            Swal.fire({
                title: 'Festivals has been posted!',
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
                    <Modal.Title>Post Festivals</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Festival Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter hotel name" onChange={(e) => setHotelName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Festival Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter hotel description" onChange={(e) => setHotelDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control style={{ textAlign: 'center' }} type="file" onChange={(e) => setImageFile(e.target.files[0])} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tips for the visitors</Form.Label>
                            <Form.Control as={'textarea'} placeholder="Tips for the visitors" onChange={(e) => setDiscount(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Festival Located</Form.Label>
                            <Form.Control type="text" placeholder="Enter hotel located" onChange={(e) => setLocated(e.target.value)} />
                        </Form.Group>
                        {amenities.map((amenity, index) => (
                            <React.Fragment key={`amenity-${index}`}>
                                <Form.Group>
                                    <Form.Label>Amenity {index + 1}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder={`Enter Amenity ${index + 1}`}
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

export default FestivalsInsertion;
