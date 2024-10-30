import React, { useState } from 'react';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { supabase } from '../../../../supabaseClient';
import Swal from 'sweetalert2';

function FlightModals({ hide, show }) {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(null);
    const [returnTime, setReturnTime] = useState('');
    const [returnArrival, setReturnArrival] = useState('');
    const [airport, setAirport] = useState('');
    const [ticket, setTicket] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [arrivalReturnDate, setArrivalReturnDate] = useState('');

    const uploadImg = async (image, folder) => {
        const { data, error } = await supabase.storage.from(folder).upload(image.name, image);
        if (error) throw error;
        return data.path;
    };

    const handleImageUpload = async () => {
        if (!image) {
            Swal.fire({
                title: 'Please select an airline logo image file',
                icon: 'error',
                showConfirmButton: true,
            });
            return null;
        }

        // Validate image type (you can extend this to other types if needed)
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validImageTypes.includes(image.type)) {
            Swal.fire({
                title: 'Invalid image type. Please upload a JPEG, PNG, or GIF image.',
                icon: 'error',
                showConfirmButton: true,
            });
            return null;
        }

        try {
            const imagePath = await uploadImg(image, 'flights');
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

    const datas = async () => {
        try {
            const img = await handleImageUpload();
            const { data, error } = await supabase.from('flightsList').insert({
                airplane: origin,
                place: destination,
                departure: departureTime,
                arrival: arrivalTime,
                date: departureDate,
                date_departure: arrivalDate,
                return: returnTime,
                return_arrival: returnArrival,
                price: price,
                airport: airport,
                airplane_img: img,
                ticket_type: ticket,
                date_arrival: returnDate,
                return_date: arrivalReturnDate,
                cancelled: false,
            });
            if (error) throw error;
            Swal.fire({
                icon: 'success',
                title: 'Inserted Successfully',
                text: 'Flight details added successfully!',
            });
            // Clear form after successful submission
            resetForm();
            return data;
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err.message}`,
            });
            console.error(err.message);
        }
    };

    const resetForm = () => {
        setOrigin('');
        setDestination('');
        setDepartureTime('');
        setArrivalTime('');
        setPrice(0);
        setImage(null);
        setReturnTime('');
        setReturnArrival('');
        setAirport('');
        setTicket('');
        setDepartureDate('');
        setArrivalDate('');
        setReturnDate('');
        setArrivalReturnDate('');
    };

    return (
        <div>
            <Modal onHide={hide} show={show}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Flight Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Origin</Form.Label>
                                    <Form.Select
                                        value={origin}
                                        onChange={(e) => setOrigin(e.target.value)}
                                    >
                                        <option>Select Origin</option>
                                        {/* Top International Airports */}
                                        <option value="ATL">Hartsfield-Jackson Atlanta International (ATL)</option>
                                        <option value="PEK">Beijing Capital International (PEK)</option>
                                        <option value="LAX">Los Angeles International (LAX)</option>
                                        <option value="DXB">Dubai International (DXB)</option>
                                        <option value="HND">Tokyo Haneda (HND)</option>
                                        <option value="ORD">O Hare International (ORD)</option>
                                        <option value="LHR">London Heathrow (LHR)</option>
                                        <option value="CDG">Charles de Gaulle Airport (CDG)</option>
                                        <option value="DFW">Dallas/Fort Worth International (DFW)</option>
                                        <option value="CAN">Guangzhou Baiyun International (CAN)</option>
                                        {/* Major Airports in the Philippines */}
                                        <option value="MNL">Ninoy Aquino International (MNL)</option>
                                        <option value="CEB">Mactan-Cebu International (CEB)</option>
                                        <option value="CRK">Clark International (CRK)</option>
                                        <option value="DVO">Francisco Bangoy International (DVO)</option>
                                        <option value="ILO">Iloilo International (ILO)</option>
                                        <option value="ZAM">Zamboanga International (ZAM)</option>
                                        <option value="KLO">Kalibo International (KLO)</option>
                                        <option value="PPS">Puerto Princesa International (PPS)</option>
                                        <option value="TAG">Bohol-Panglao International (TAG)</option>
                                        <option value="LGP">Legazpi Airport (LGP)</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <div
                                    className="horizontal-line w-100 rounded-circle bg-black"
                                    style={{ transform: 'translateY(2450%)' }}
                                ></div>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Destination</Form.Label>
                                    <Form.Select
                                        value={destination}
                                        onChange={(e) => setDestination(e.target.value)}
                                    >
                                        <option>Select Destination</option>
                                        {/* Top International Airports */}
                                        <option value="ATL">Hartsfield-Jackson Atlanta International (ATL)</option>
                                        <option value="PEK">Beijing Capital International (PEK)</option>
                                        <option value="LAX">Los Angeles International (LAX)</option>
                                        <option value="DXB">Dubai International (DXB)</option>
                                        <option value="HND">Tokyo Haneda (HND)</option>
                                        <option value="ORD">O Hare International (ORD)</option>
                                        <option value="LHR">London Heathrow (LHR)</option>
                                        <option value="CDG">Charles de Gaulle Airport (CDG)</option>
                                        <option value="DFW">Dallas/Fort Worth International (DFW)</option>
                                        <option value="CAN">Guangzhou Baiyun International (CAN)</option>
                                        {/* Major Airports in the Philippines */}
                                        <option value="MNL">Ninoy Aquino International (MNL)</option>
                                        <option value="CEB">Mactan-Cebu International (CEB)</option>
                                        <option value="CRK">Clark International (CRK)</option>
                                        <option value="DVO">Francisco Bangoy International (DVO)</option>
                                        <option value="ILO">Iloilo International (ILO)</option>
                                        <option value="ZAM">Zamboanga International (ZAM)</option>
                                        <option value="KLO">Kalibo International (KLO)</option>
                                        <option value="PPS">Puerto Princesa International (PPS)</option>
                                        <option value="TAG">Bohol-Panglao International (TAG)</option>
                                        <option value="LGP">Legazpi Airport (LGP)</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Departure Time</Form.Label>
                                    <Form.Control
                                        value={departureTime}
                                        onChange={(e) => setDepartureTime(e.target.value)}
                                        type="time"
                                        placeholder="Enter Departure Time"
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <div
                                    className="horizontal-line w-100 rounded-circle bg-black"
                                    style={{ transform: 'translateY(2450%)' }}
                                ></div>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Arrival Time</Form.Label>
                                    <Form.Control
                                        value={arrivalTime}
                                        onChange={(e) => setArrivalTime(e.target.value)}
                                        type="time"
                                        placeholder="Enter Arrival Time"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Departure Date</Form.Label>
                                    <Form.Control
                                        value={departureDate}
                                        onChange={(e) => setDepartureDate(e.target.value)}
                                        type="date"
                                        placeholder="Enter Departure Date"
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <div
                                    className="horizontal-line w-100 rounded-circle bg-black"
                                    style={{ transform: 'translateY(2450%)' }}
                                ></div>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Arrival Date</Form.Label>
                                    <Form.Control
                                        value={arrivalDate}
                                        onChange={(e) => setArrivalDate(e.target.value)}
                                        type="date"
                                        placeholder="Enter Arrival Date"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Return Time</Form.Label>
                                    <Form.Control
                                        value={returnTime}
                                        onChange={(e) => setReturnTime(e.target.value)}
                                        type="time"
                                        placeholder="Enter Return Time"
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <div
                                    className="horizontal-line w-100 rounded-circle bg-black"
                                    style={{ transform: 'translateY(2450%)' }}
                                ></div>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Return Arrival Time</Form.Label>
                                    <Form.Control
                                        value={returnArrival}
                                        onChange={(e) => setReturnArrival(e.target.value)}
                                        type="time"
                                        placeholder="Enter Return Arrival Time"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Return Date</Form.Label>
                                    <Form.Control
                                        value={returnDate}
                                        onChange={(e) => setReturnDate(e.target.value)}
                                        type="date"
                                        placeholder="Enter Return Date"
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <div
                                    className="horizontal-line w-100 rounded-circle bg-black"
                                    style={{ transform: 'translateY(2450%)' }}
                                ></div>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Arrival Return Date</Form.Label>
                                    <Form.Control
                                        value={arrivalReturnDate}
                                        onChange={(e) => setArrivalReturnDate(e.target.value)}
                                        type="date"
                                        placeholder="Enter Arrival Return Date"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Header>
                    <Modal.Title>Add Flight Names</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Airline Logo</Form.Label>
                                    <Form.Control
                                        type="file"
                                        onChange={(e) => setImage(e.target.files[0])}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Airport</Form.Label>
                                    <Form.Select
                                        value={airport}
                                        onChange={(e) => setAirport(e.target.value)}
                                    >
                                        <option>Select Airport</option>
                                        {/* Top International Airports */}
                                        <option value="ATL">Hartsfield-Jackson Atlanta International (ATL)</option>
                                        <option value="PEK">Beijing Capital International (PEK)</option>
                                        <option value="LAX">Los Angeles International (LAX)</option>
                                        <option value="DXB">Dubai International (DXB)</option>
                                        <option value="HND">Tokyo Haneda (HND)</option>
                                        <option value="ORD">O Hare International (ORD)</option>
                                        <option value="LHR">London Heathrow (LHR)</option>
                                        <option value="CDG">Charles de Gaulle Airport (CDG)</option>
                                        <option value="DFW">Dallas/Fort Worth International (DFW)</option>
                                        <option value="CAN">Guangzhou Baiyun International (CAN)</option>
                                        {/* Major Airports in the Philippines */}
                                        <option value="MNL">Ninoy Aquino International (MNL)</option>
                                        <option value="CEB">Mactan-Cebu International (CEB)</option>
                                        <option value="CRK">Clark International (CRK)</option>
                                        <option value="DVO">Francisco Bangoy International (DVO)</option>
                                        <option value="ILO">Iloilo International (ILO)</option>
                                        <option value="ZAM">Zamboanga International (ZAM)</option>
                                        <option value="KLO">Kalibo International (KLO)</option>
                                        <option value="PPS">Puerto Princesa International (PPS)</option>
                                        <option value="TAG">Bohol-Panglao International (TAG)</option>
                                        <option value="LGP">Legazpi Airport (LGP)</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Ticket Type</Form.Label>
                                    <Form.Select
                                        value={ticket}
                                        onChange={(e) => setTicket(e.target.value)}
                                    >
                                        <option>Select Ticket Type</option>
                                        <option>Fastest</option>
                                        <option>Cheapest</option>
                                        <option>Best</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        type="number"
                                        placeholder="Enter Price"
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={hide}>Close</button>
                    <button
                        className="btn btn-primary"
                        onClick={datas}
                    >
                        Submit
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

FlightModals.propTypes = {
    hide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
};

export default FlightModals;
