// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Header from '../../panels/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, ListGroup } from 'react-bootstrap';
import { supabase } from '../../../supabaseClient';
import ModalWidget from './modal/ModalWidget';
import InsertionModalWidget from './modal/InsertionModalWidget';
import Swal from 'sweetalert2';
import UpdateModals from './PlacesModals/updateModals';
function Places() {
    const [data, setData] = useState([]);
    const [editModal, setEdit] = useState(false);
    const [set, setEditData] = useState(null);
    const saveData = async () => {
        const { data, error } = await supabase.from('places').select('*');
        if (error) throw error;
        setData(data);
    }

    const openEdit = async (data) => {
        setEditData(data);
        setEdit(true);
    }

    const hideModal = async() => {
        setEdit(false);
    }

    useEffect(() => {
        saveData();
    }, [])

    return (
        <div>
            <Header />
            <main className='places-data'>
                <div className="container mt-5">
                    <h2 className="text-center">Places</h2>
                    <ListGroup className="mt-4">
                        {data.map((item) => (
                            <ListGroup.Item key={item.id} className="mb-4">
                                <Card style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'row', border: '1px solid #007bff', borderRadius: '0.5rem' }} className="shadow-sm">
                                    <Card.Body style={{ flex: 1 }}>
                                        <Card.Title className="text-center">{item.place_name}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted text-center">
                                            Price: PHP {item.price}
                                        </Card.Subtitle>
                                        <Card.Text>
                                            <strong>Description:</strong> {item.description}
                                        </Card.Text>
                                        <div className="text-center">
                                            <Button variant="primary"  className="mx-2" onClick={()=> openEdit(item)}>
                                                Edit
                                            </Button>
                                            <Button variant="danger" className="mt-2" >
                                                Delete
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    {
                        editModal && (
                            <UpdateModals
                                show={editModal}
                                PlaceData={set}
                                hide={hideModal}
                            />
                        )
                    }
                </div>
            </main>
        </div>
    );
}

export default Places;
