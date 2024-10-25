import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { supabase } from '../../../../supabaseClient';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
function InsertionOfRestaurants({show, hide}) {
    const [hotelName, setHotelName] = useState('');
    const [hotelDescription, setHotelDescription] = useState('');
    const [menu, setMenu] = useState('');
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
            const imagePath = await uploadImg(imageFile, 'food_area');
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
            const imagePath = await uploadImg(image, 'food_area');
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
            const { data, error } = await supabase.from('food_area').insert([{
                img: hotelName,
                description: hotelDescription,
                located: located,
                imgUrl: imagePath,
                menu: menu,
                dine1: amenities[0],
                dine2: amenities[1],
                dine3: amenities[2],
                dine4: amenities[3],
                dine5: amenities[4],
                dine6: amenities[5],
                dine7: amenities[6],
                dine8: amenities[7],
                dine9: amenities[8],
                dine10: amenities[9],
                dine11: amenities[10],
                dine12: amenities[11],
                dine13: amenities[12],
                dine14: amenities[13],
                dine15: amenities[14],
                dine16: amenities[15],
                dine17: amenities[16],
                dine18: amenities[17],
                dine19: amenities[18],
                dine20: amenities[19],
                dineUrl1: amenityImagePaths[0],
                dineUrl2: amenityImagePaths[1],
                dineUrl3: amenityImagePaths[2],
                dineUrl4: amenityImagePaths[3],
                dineUrl5: amenityImagePaths[4],
                dineUrl6: amenityImagePaths[5],
                dineUrl7: amenityImagePaths[6],
                dineUrl8: amenityImagePaths[7],
                dineUrl9: amenityImagePaths[8],
                dineUrl10: amenityImagePaths[9],
                dineUrl11: amenityImagePaths[10],
                dineUrl12: amenityImagePaths[11],
                dineUrl13: amenityImagePaths[12],
                dineUrl14: amenityImagePaths[13],
                dineUrl15: amenityImagePaths[14],
                dineUrl16: amenityImagePaths[15],
                dineUrl17: amenityImagePaths[16],
                dineUrl18: amenityImagePaths[17],
                dineUrl19: amenityImagePaths[18],
                dineUrl20: amenityImagePaths[19],
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
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter hotel name" onChange={(e) => setHotelName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter hotel description" onChange={(e) => setHotelDescription(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control style={{ textAlign: 'center' }} type="file" onChange={(e) => setImageFile(e.target.files[0])} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Menu</Form.Label>
                            <Form.Control type="text" placeholder="Enter hotel Price" onChange={(e) => setMenu(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Hotel Located</Form.Label>
                            <Form.Control type="text" placeholder="Enter hotel located" onChange={(e) => setLocated(e.target.value)} />
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

InsertionOfRestaurants.propTypes = {
    hide: PropTypes.bool.isRequired,
    show: PropTypes.func.isRequired,
}


export default InsertionOfRestaurants
