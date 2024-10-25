// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Header from '../../panels/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, ListGroup, Row, Col, Placeholder } from 'react-bootstrap';
import { supabase } from '../../../supabaseClient';
import Swal from 'sweetalert2';
import UpdateModals from './PlacesModals/updateModals';
import InsertionModal from './PlacesModals/InsertionModals';
function Places() {
    const [data, setData] = useState([]);
    const [editModal, setEdit] = useState(false);
    const [set, setEditData] = useState(null);
    const [showModal, setModal] = useState(false);
    const saveData = async () => {
        const { data, error } = await supabase.from('places').select('*');
        if (error) throw error;
        setData(data);
    }

    const deleteData  = async (id) => {
        await supabase.from('places').delete().eq('id', id);
        Swal.fire({
            title: 'Place deleted successfully!',
            icon:'success',
            timer: 1500
        });
    }

    const openEdit = async (data) => {
        setEditData(data);
        setEdit(true);
    }

    const hideModal = async() => {
        setEdit(false);
    }

    const showInserModal = async () => {
        setModal(true);
    }

    const hide = async () => {
        setModal(false);
    }

    useEffect(() => {
        saveData();
    }, [])

    return (
        <div>
            <Header />
            <main className='main'>
                <div className="container mt-5">
                    <Row>
                        <h2 className="text-center w-25 col-1">Places Postings</h2>
                        <Button variant='success' className=' col-2' onClick={showInserModal}>Add Place</Button>
                    </Row>
                    <ListGroup className="mt-4">
                        {
                            data != null && data.length > 0 ? (
                                data.map((hotel) => (
                                    <Container key={hotel.id} className='color'>
                                        <Row className='object-fit-cover'>
                                            <div className='width'>
                                                <img
                                                    className='pic'
                                                    src={`https://tglolshdsrixggmpvujc.supabase.co/storage/v1/object/public/places_url/${hotel.image}`}
                                                    alt={hotel.place_name}
                                                />
                                            </div>
                                            <div className='col-9 col-md-9 col-lg-9'>
                                                <h3>{hotel.place_name}</h3>
                                                <p className='text-info fw-bolder'>{hotel.locatedIn}</p>
                                                <p>{hotel.description}</p>
                                                <div className="text-center mb-2">
                                                    <Button
                                                        variant="primary"
                                                        onClick={() => openEdit(hotel)}
                                                        className="mt-3 mx-2"
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => deleteData(hotel.id)}
                                                        className="mt-3 mx-2"
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </div>
                                        </Row>
                                    </Container>
                                ))
                            ) : (
                                <Container className='color'>
                                    <Row>
                                        <div className='width'>
                                            <Placeholder as="div" animation="glow">
                                                <Placeholder xs={12} className="placeholder-image" />
                                            </Placeholder>
                                        </div>
                                        <div className='col-9 col-md-9 col-lg-9'>
                                            <Placeholder as="h3" animation="glow">
                                                <Placeholder xs={6} />
                                            </Placeholder>
                                            <Placeholder as="p" animation="glow" className='text-info fw-bolder'>
                                                <Placeholder xs={4} />
                                            </Placeholder>
                                            <Placeholder as="p" animation="glow">
                                                <Placeholder xs={8} />
                                                <Placeholder xs={7} />
                                                <Placeholder xs={6} />
                                            </Placeholder>
                                            <div className="text-center mb-2">
                                                <Placeholder.Button variant="primary" xs={4} className="mt-3 mx-2" />
                                                <Placeholder.Button variant="danger" xs={4} className="mt-3 mx-2" />
                                            </div>
                                        </div>
                                        </Row>
                                        <Row>
                                            <div className='width'>
                                                <Placeholder as="div" animation="glow">
                                                    <Placeholder xs={12} className="placeholder-image" />
                                                </Placeholder>
                                            </div>
                                            <div className='col-9 col-md-9 col-lg-9'>
                                                <Placeholder as="h3" animation="glow">
                                                    <Placeholder xs={6} />
                                                </Placeholder>
                                                <Placeholder as="p" animation="glow" className='text-info fw-bolder'>
                                                    <Placeholder xs={4} />
                                                </Placeholder>
                                                <Placeholder as="p" animation="glow">
                                                    <Placeholder xs={8} />
                                                    <Placeholder xs={7} />
                                                    <Placeholder xs={6} />
                                                </Placeholder>
                                                <div className="text-center mb-2">
                                                    <Placeholder.Button variant="primary" xs={4} className="mt-3 mx-2" />
                                                    <Placeholder.Button variant="danger" xs={4} className="mt-3 mx-2" />
                                                </div>
                                            </div>
                                        </Row>
                                </Container>
                            )
                        }

                    </ListGroup>

                    {data && (
                        <UpdateModals
                            show={editModal}
                            hide={hideModal}
                            PlaceData={data}
                        />
                    )}

                    <InsertionModal show={showModal} hide={hide} />
                </div>
            </main>
        </div>
    );
}

export default Places;
