// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Header from '../../panels/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,  Container, ListGroup, Row, } from 'react-bootstrap';
import { supabase } from '../../../supabaseClient';
import Swal from 'sweetalert2';
import InsertionOfBeaches from './BeachesModals/InsertionOfBeaches';
import UpdateBeaches from './BeachesModals/UpdateBeaches';
import PlaceHolders from './PlaceHolders/PlaceHolders';
function Beaches() {
    const [data, setData] = useState([]);
    const [editModal, setEdit] = useState(false);
    const [set, setEditData] = useState(null);
    const [showModal, setModal] = useState(false);
    const saveData = async () => {
        const { data, error } = await supabase.from('Beaches').select('*');
        if (error) throw error;
        setData(data);
    }

    const deleteData = async (id) => {
        await supabase.from('Beaches').delete().eq('id', id);
        Swal.fire({
            title: 'Place deleted successfully!',
            icon: 'success',
            timer: 1500
        });
    }

    const openEdit = async (data) => {
        setEditData(data);
        setEdit(true);
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
                <div className="container mt-5">
                    <Row>
                        <h2 className="text-center w-25 col-1">Beaches Postings</h2>
                        <Button variant='success' className=' col-2' onClick={showInserModal}>Add Beach</Button>
                    </Row>
                    <ListGroup className="mt-4">
                        {
                            data != null && data.length > 0 ? (
                                data.map((hotel) => (
                                    <Container key={hotel.id} className='color1'>
                                        <Row className='object-fit-cover'>
                                            <div className=' col-3'>
                                                <div className='width'>
                                                    <img
                                                        className='pic'
                                                        src={`https://tglolshdsrixggmpvujc.supabase.co/storage/v1/object/public/beaches/${hotel.image}`}
                                                        alt={hotel.beach_name}
                                                    />
                                                </div>
                                            </div>
                                            <div className='mt-3 col-9 col-md-9 col-lg-9'>
                                                <h3>{hotel.beach_name}</h3>
                                                <p className='text-info fw-bolder'>{hotel.beach_located}</p>
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
                                <PlaceHolders/>
                            )
                        }

                    </ListGroup>

                    {data && (
                        <UpdateBeaches
                            show={editModal}
                            hide={hideModal}
                            BeachData={set}
                        />
                    )}

                    <InsertionOfBeaches show={showModal} hide={hide} />
                </div>
            </main>
        </div>
    );
}

export default Beaches
