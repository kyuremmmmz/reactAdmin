import React, { useEffect, useState } from 'react';
import Header from '../../panels/Header';
import { Button, Container, Row, Table } from 'react-bootstrap';
import usersDatas from '../../../data/UsersData';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const usersData = async () => {
        try {
            const { data, error } = await usersDatas();
            if (error) throw new Error("No data available");
            setUsers(data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        usersData();
    }, []);

    return (
        <div>
            <Header />
            <Container>
                <h2 className='users mt-2'>Users</h2>
                <Table striped bordered hover className=' mt-4'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.user_metadata.full_name}</td>
                                <td>{item.user_metadata.username }</td>
                                <td>{item.user_metadata.email}</td>
                                <td>+63{item.user_metadata.phone_number}</td>
                                <td>
                                    <div className=' d-flex flex-row'>
                                        <Button variant='danger' className=' m-sm-2'>Delete</Button>
                                        <Button variant='info' className=' m-sm-2'>Edit</Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}

export default Users;
