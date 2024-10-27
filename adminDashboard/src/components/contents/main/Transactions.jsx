import { useEffect, useState } from 'react';
import Header from '../../panels/Header';
import { Container, Card, Row, Col, Badge } from 'react-bootstrap';
import { format } from 'date-fns';
import 'bootstrap/dist/css/bootstrap.min.css';
import { supabase } from '../../../supabaseClient';
import Swal from 'sweetalert2';
import { FaRegEnvelope, FaPhoneAlt, FaCreditCard, FaPaypal, FaCalendarAlt, FaReceipt } from 'react-icons/fa';

function Transactions() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const { data, error } = await supabase.from('payment_table').select('*');
            if (error) throw error;
            setData(data);
        } catch (e) {
            console.error(e);
            Swal.fire('Oops!', 'Could not fetch data. Please try again later.', 'error');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Header />
            <main className="main">
                <Container className="mt-4">
                    <h2>Transaction Records</h2>
                    <Row xs={1} md={2} lg={3} className="g-4 mt-3">
                        {data.map((item) => (
                            <Col key={item.id}>
                                <Card className="transaction-card shadow-lg">
                                    <Card.Header className="text-center card-header">
                                        <h5>{item.name}</h5>
                                        <Badge bg={item.pay_via === 'paypal' ? 'info' : 'success'} className="payment-badge">
                                            {item.pay_via === 'paypal' ? <FaPaypal /> : <FaCreditCard />}
                                            &nbsp;{item.pay_via}
                                        </Badge>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Text className="payment-amount">
                                            <FaReceipt className="icon" /> ${item.payment}
                                        </Card.Text>
                                        <Card.Text>
                                            <FaRegEnvelope className="icon" /> {item.gmail}
                                        </Card.Text>
                                        <Card.Text>
                                            <FaPhoneAlt className="icon" /> +630{item.phone}
                                        </Card.Text>
                                        <Card.Text>
                                            <FaCreditCard className="icon" /> Ref: {item.reference_number}
                                        </Card.Text>
                                        <Card.Text>
                                            <FaCalendarAlt className="icon" /> {item.date_of_payment
                                                ? format(new Date(item.date_of_payment), 'MMMM d, yyyy h:mm a')
                                                : 'Not Paid'}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </main>
        </div>
    );
}

export default Transactions;
