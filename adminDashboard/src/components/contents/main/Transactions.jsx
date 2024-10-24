// eslint-disable-next-line no-unused-vars
import React from 'react'
import Header from '../../panels/Header'
import { Container, Tabs, Tab } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
function Transactions() {
  return (
    <div>
        <Header />
        <Container>
            <h2>Transactions</h2>
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3">
                <Tab eventKey="home" title="Home">
                    Tab content for Home
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    Tab content for Profile
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                    Tab content for Contact
                </Tab>
            </Tabs>
        </Container>
    </div>
  )
}

export default Transactions
