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
                          <div className="horizontal-line w-25 rounded-circle bg-black" style={{
                              transform: 'translateY(2450%)',
                          }}></div>
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
                                  <Form.Label>Origin</Form.Label>
                                  <Form.Control type="text" placeholder="Enter Origin" />
                              </Form.Group>
                          </Col>
                          <div className="horizontal-line w-25 rounded-circle bg-black" style={{
                              transform: 'translateY(2450%)',
                          }}></div>
                          <Col>
                              <Form.Group>
                                  <Form.Label>Destination</Form.Label>
                                  <Form.Control type="text" placeholder="Enter Destination" />
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