import React from 'react'
import Header from '../../../panels/Header'
import { Col, Form, Modal, Row } from 'react-bootstrap'
import PropTypes from 'prop-types'

function FlightModals({hide, show}) {
  return (
    <div>
          <Modal onHide={hide} show={show}>
              <Modal.Header closeButton>
                  <Modal.Title>Add Flight Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form>
                      <Row>
                          <Col>
                              <Form.Group>
                                  <Form.Label>Origin</Form.Label>
                                  <Form.Control type="text" placeholder="Enter Origin" />
                              </Form.Group>
                          </Col>
                          <Col>
                              <div className="horizontal-line w-100 rounded-circle bg-black" style={{
                                  transform: 'translateY(2450%)',
                              }}></div>
                          </Col>
                          <Col>
                              <Form.Group>
                                  <Form.Label>Destination</Form.Label>
                                  <Form.Control type="text" placeholder="Enter Destination" />
                              </Form.Group>
                          </Col>
                      </Row>
                      <Row>
                          <Col>
                              <Form.Group>
                                  <Form.Label>Departure Time</Form.Label>
                                  <Form.Control type="time" placeholder="Enter Origin" />
                              </Form.Group>
                          </Col>
                          <Col>
                              <div className="horizontal-line w-100 rounded-circle bg-black" style={{
                                  transform: 'translateY(2450%)',
                              }}></div>
                          </Col>
                          <Col>
                              <Form.Group>
                                  <Form.Label>Arrival Time</Form.Label>
                                  <Form.Control type="time" placeholder="Enter Destination" />
                              </Form.Group>
                          </Col>
                      </Row>
                      <Row>
                          <Col>
                              <Form.Group>
                                  <Form.Label>Departure Date</Form.Label>
                                  <Form.Control type="date" placeholder="Enter Origin" />
                              </Form.Group>
                          </Col>
                          <Col>
                              <div className="horizontal-line w-100 rounded-circle bg-black" style={{
                                  transform: 'translateY(2450%)',
                              }}></div>
                          </Col>
                          <Col>
                              <Form.Group>
                                  <Form.Label>Arrival Date</Form.Label>
                                  <Form.Control type="date" placeholder="Enter Destination" />
                              </Form.Group>
                          </Col>
                      </Row>
                  </Form>
              </Modal.Body>
              <Modal.Header>
                  <Modal.Title>Add Flight Names</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <Form>
                      <Row>
                          <Col>
                              <Form.Group>
                                  <Form.Label>Airline Logo</Form.Label>
                                  <Form.Control type="file" placeholder="Enter Airline name" />
                              </Form.Group>
                              <Form.Group>
                                  <Form.Label>AirPort name(Only accepting accronyms)</Form.Label>
                                  <Form.Control type="text" placeholder="Enter AirPort name" />
                              </Form.Group>
                              <Form.Group>
                                  <Form.Label>Price</Form.Label>
                                  <Form.Control type="number" placeholder="Enter Price" />
                              </Form.Group>
                              <Form.Group>
                                  <Form.Label>Ticket Type</Form.Label>
                                  <Form.Select onChange={(e)=> e.target.value.toLowerCase()}>
                                      <option>Select Ticket Type</option>
                                      <option>Fastest</option>
                                      <option>Cheapest</option>
                                      <option>Best</option>
                                  </Form.Select>
                              </Form.Group>
                          </Col>
                    </Row>
                  </Form>
              </Modal.Body>
              <Modal.Footer>
                  <Row>
                      <Col>
                          <button type="button" className="btn btn-secondary" onClick={hide}>Cancel</button>
                      </Col>
                      <Col>
                          <button type="submit" className="btn btn-primary">Submit</button>
                      </Col>
                  </Row>
              </Modal.Footer>
        </Modal>
    </div>
  )
}

FlightModals.propTypes = {
    hide: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
}

export default FlightModals