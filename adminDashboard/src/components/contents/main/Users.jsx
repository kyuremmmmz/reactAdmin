import React, { useEffect, useState } from 'react';
import Header from '../../panels/Header';
import { Button, Container, Dropdown, DropdownButton, Row, Table } from 'react-bootstrap';
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
                            <th className='text-center'>ID</th>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>User Name</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Phone Number</th>
                            <th className='text-center'>Status</th> {/* New Status Column */}
                            <th className='text-center'>
                                <Dropdown>
                                    <Dropdown.Toggle variant='primary'>
                                        Actions
                                    </Dropdown.Toggle>
                                </Dropdown>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.user_metadata.full_name}</td>
                                <td>{item.user_metadata.username}</td>
                                <td>{item.user_metadata.email}</td>
                                <td>+63{item.user_metadata.phone_number}</td>
                                <td>
                                    <td>
                                        <span className={Date.now() - new Date(item.last_sign_in_at).getTime() <= 10 * 60 * 1000 ? 'text-success' : 'text-muted'}>
                                            {Date.now() - new Date(item.last_sign_in_at).getTime() <= 10 * 60 * 1000 ? 'active' : 'offline'}
                                        </span>
                                    </td>
                                </td>
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
