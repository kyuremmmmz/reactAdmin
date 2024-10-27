import React, { useEffect, useState } from 'react';
import Header from '../../panels/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, ListGroup, Row, Col, Placeholder } from 'react-bootstrap';
import { supabase } from '../../../supabaseClient';
import Swal from 'sweetalert2';
import FestivalsInsertion from './FestivalsModals/FestivalsInsertion';
import FestivalsModalUpdate from './FestivalsModals/FestivalsModalUpdate';
function Festivals() {
    const [data, setData] = useState([]);
    const [editModal, setEdit] = useState(false);
    const [set, setEditData] = useState(null);
    const [showModal, setModal] = useState(false);
    const saveData = async () => {
        const { data, error } = await supabase.from('Festivals').select('*');
        if (error) throw error;
        setData(data);
    }

    const deleteData = async (id) => {
        await supabase.from('Festivals').delete().eq('id', id);
        Swal.fire({
            title: 'Place deleted successfully!',
            icon: 'success',
            timer: 1500
        });
    }

    const openEdit = async (datas) => {
        console.log('Data to Edit:', datas);
        setEdit(true);
        setEditData(datas);
    }

    const hideModal = async () => {
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
                <div className="container mt-5 w-auto">
                    <Row>
                        <h2 className="text-center w-25 col-1">Festivals Postings</h2>
                        <Button variant='success' className=' col-2' onClick={showInserModal}>Add Festivals</Button>
                    </Row>
                    <ListGroup className="mt-4">
                        {
                            data != null && data.length > 0 ? (
                                data.map((hotel) => (
                                    <Container key={hotel.id} className='color'>
                                        <Row className='object-fit-cover'>
                                            <div className='col-3'>
                                                <div className='width'>
                                                    <img
                                                        className='pic'
                                                        src={`https://tglolshdsrixggmpvujc.supabase.co/storage/v1/object/public/Festivals/${hotel.imgUrl}`}
                                                        alt={hotel.img}
                                                    />
                                                </div>
                                                <div className=' mt-4'>
                                                    <div className=' width4'>
                                                        <h2 className=' text-sm'>Tips for the visitors</h2>
                                                        <ul>
                                                            <li>{ hotel.TipsForVisitors }</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=' mt-3 col-9 col-md-9 col-lg-9'>
                                                <h3>{hotel.img}</h3>
                                                <p className='text-info fw-bolder'>{hotel.Located}</p>
                                                <p>{hotel.Description}</p>
                                                <h3 className=''>
                                                    Festivals Highlights
                                                </h3>
                                                <Row>
                                                    {[...Array(20).keys()].map((index) => {
                                                        const amenityKey = `Dine${index + 1}`;
                                                        const amenityKey2 = `DineUrl${index + 1}`;
                                                        return hotel[amenityKey] ? (
                                                            <Col key={index} xs={7} md={3} className="d-flex justify-content-center">
                                                                <div className="width2">
                                                                    <img
                                                                        className="pic2"
                                                                        src={`https://tglolshdsrixggmpvujc.supabase.co/storage/v1/object/public/Festivals/${hotel[amenityKey2]}`}
                                                                    />
                                                                    <p className='text-light position-absolute bottom-50' style={{
                                                                        right: '60px',
                                                                        transform: ' translateY(150%)',
                                                                    }}>
                                                                        {hotel[amenityKey]}
                                                                    </p>
                                                                </div>
                                                            </Col>
                                                        ) : null;
                                                    })}
                                                </Row>
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
                        <FestivalsModalUpdate
                            show={editModal}
                            hide={hideModal}
                            FestivalData={set}
                        />
                    )}

                    <FestivalsInsertion show={showModal} hide={hide} />
                </div>
            </main>
        </div>
    );
}

export default Festivals
