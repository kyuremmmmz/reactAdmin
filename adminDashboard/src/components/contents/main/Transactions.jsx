// eslint-disable-next-line no-unused-vars
import React from 'react'
import Header from '../../panels/Header'
import { Container, Tabs, Tab, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
function Transactions() {

  return (
    <div>
        <Header />
        <Container>
            <h2>Transactions</h2>
            <Table striped hover bordered>
                <thead>
                    <tr>
                        <th className=' text-center'>Name</th>
                        <th className=' text-center'>Email</th>
                        <th className=' text-center'>Reference Number</th>
                        <th className=' text-center'>Booking ID</th>
                        <th className=' text-center'>Phone</th>
                        <th className=' text-center'>Paid Via</th>
                    </tr>
                        <tr className=' text-center'>
                            <td>John Doe</td>
                            <td>johndoe@example.com</td>
                            <td>123456789</td>
                            <td>12345</td>
                            <td>1234567890</td>
                            <td>John Doe</td>
                        </tr>
                </thead>
            </Table>
        </Container>
    </div>
)
}

export default Transactions
