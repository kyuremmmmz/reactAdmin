import { Placeholder, Container, Row } from 'react-bootstrap'
function PlaceHolders() {
  return (
      <Container className='color'>
          <Row>
              <div className='width'>
                  <Placeholder as="div" animation="glow">
                      <Placeholder xs={12} className="placeholder-image" />
                  </Placeholder>
              </div>
              <div className='col-9 col-md-9 col-lg-9'>
                  <Placeholder as="h3" animation="glow">
                      <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder as="p" animation="glow" className='text-info fw-bolder'>
                      <Placeholder xs={4} />
                  </Placeholder>
                  <Placeholder as="p" animation="glow">
                      <Placeholder xs={8} />
                      <Placeholder xs={7} />
                      <Placeholder xs={6} />
                  </Placeholder>
                  <div className="text-center mb-2">
                      <Placeholder.Button variant="primary" xs={4} className="mt-3 mx-2" />
                      <Placeholder.Button variant="danger" xs={4} className="mt-3 mx-2" />
                  </div>
              </div>
          </Row>
          <Row>
              <div className='width'>
                  <Placeholder as="div" animation="glow">
                      <Placeholder xs={12} className="placeholder-image" />
                  </Placeholder>
              </div>
              <div className='col-9 col-md-9 col-lg-9'>
                  <Placeholder as="h3" animation="glow">
                      <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder as="p" animation="glow" className='text-info fw-bolder'>
                      <Placeholder xs={4} />
                  </Placeholder>
                  <Placeholder as="p" animation="glow">
                      <Placeholder xs={8} />
                      <Placeholder xs={7} />
                      <Placeholder xs={6} />
                  </Placeholder>
                  <div className="text-center mb-2">
                      <Placeholder.Button variant="primary" xs={4} className="mt-3 mx-2" />
                      <Placeholder.Button variant="danger" xs={4} className="mt-3 mx-2" />
                  </div>
              </div>
          </Row>
          <Row>
              <div className='width'>
                  <Placeholder as="div" animation="glow">
                      <Placeholder xs={12} className="placeholder-image" />
                  </Placeholder>
              </div>
              <div className='col-9 col-md-9 col-lg-9'>
                  <Placeholder as="h3" animation="glow">
                      <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder as="p" animation="glow" className='text-info fw-bolder'>
                      <Placeholder xs={4} />
                  </Placeholder>
                  <Placeholder as="p" animation="glow">
                      <Placeholder xs={8} />
                      <Placeholder xs={7} />
                      <Placeholder xs={6} />
                  </Placeholder>
                  <div className="text-center mb-2">
                      <Placeholder.Button variant="primary" xs={4} className="mt-3 mx-2" />
                      <Placeholder.Button variant="danger" xs={4} className="mt-3 mx-2" />
                  </div>
              </div>
          </Row>
          <Row>
              <div className='width'>
                  <Placeholder as="div" animation="glow">
                      <Placeholder xs={12} className="placeholder-image" />
                  </Placeholder>
              </div>
              <div className='col-9 col-md-9 col-lg-9'>
                  <Placeholder as="h3" animation="glow">
                      <Placeholder xs={6} />
                  </Placeholder>
                  <Placeholder as="p" animation="glow" className='text-info fw-bolder'>
                      <Placeholder xs={4} />
                  </Placeholder>
                  <Placeholder as="p" animation="glow">
                      <Placeholder xs={8} />
                      <Placeholder xs={7} />
                      <Placeholder xs={6} />
                  </Placeholder>
                  <div className="text-center mb-2">
                      <Placeholder.Button variant="primary" xs={4} className="mt-3 mx-2" />
                      <Placeholder.Button variant="danger" xs={4} className="mt-3 mx-2" />
                  </div>
              </div>
          </Row>
      </Container>
  )
}

export default PlaceHolders