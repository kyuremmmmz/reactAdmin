import React, { useEffect, useState } from 'react'
import Header from '../../panels/Header'
import { Container, Table } from 'react-bootstrap'

function Users() {
    const [users, setUsers] = useState([]);
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        
    }, []);
    return (
    <div>
        <Header />
        <Container>
            <h2 className='users'>Users</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>John Doe</td>
                            <td>johndoe@example.com</td>
                        </tr>
                    </tbody>
                </Table>
        </Container>
    </div>
    )
}

export default Users
