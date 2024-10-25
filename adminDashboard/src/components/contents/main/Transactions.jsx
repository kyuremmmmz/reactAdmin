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
                        <th className=' text-center'>Name</th>
                    </tr>
                </thead>
            </Table>
        </Container>
    </div>
  )
}

export default Transactions
