// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import Header from '../../panels/Header'
import { Container, Table } from 'react-bootstrap'
import { format } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import { supabase } from '../../../supabaseClient';
import Swal from 'sweetalert2';
function Transactions() {
    const [data, setData] = useState([]);

    const fethData = async () => {
        try {
            const { data, error } = await supabase.from('payment_table').select('*');
            if (error) throw error;
            setData(data);
        } catch (e) {
            console.error(e);
            Swal.fire('The Internet?', 'That thing is still around?', 'question');
        }
    }

    useEffect(() => {
        fethData();
    }, [])
return (
    <div>
        <Header />
        <Container>
            <h2>Transactions</h2>
            <Table striped bordered hover className=' mt-4'>
                <thead>
                    <tr>
                        <th className=' text-center'>Name</th>
                        <th className=' text-center'>Email</th>
                        <th className=' text-center'>Reference Number</th>
                        <th className=' text-center'>Booking ID</th>
                        <th className=' text-center'>Phone</th>
                        <th className=' text-center'>Paid Via</th>
                        <th className=' text-center'>Payment Amount</th>
                        <th className=' text-center'>Date of Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className=' text-center'>
                            <td>{item.name}</td>
                            <td>{item.gmail}</td>
                            <td>{item.reference_number}</td>
                            <td>{item.booking_id}</td>
                            <td>+630{item.phone}</td>
                            <td>
                                <div className='payment-card'>
                                    <img src={item.pay_via === 'paypal'
                                        ? 'https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white'
                                        : 'https://img.shields.io/badge/Credit%20Card-blue?style=for-the-badge&logo=stripe&logoColor=white'} alt='Payment Type' />
                                </div>
                            </td>
                            <td>{item.payment}</td>
                            <td>{item.date_of_payment
                                ? format(new Date(item.date_of_payment), 'MMMM d, yyyy h:mm a')
                                : 'Not Paid'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    </div>
)
}

export default Transactions
