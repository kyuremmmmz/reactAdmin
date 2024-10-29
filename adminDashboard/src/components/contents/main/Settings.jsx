import React, { useState } from 'react';
import Header from '../../panels/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import "./sett.css";

const Settings = () => {
  const [activeSection, setActiveSection] = useState(null); // State to track the active section
  const [password, setPassword] = useState('');
  const [recoveryInfo, setRecoveryInfo] = useState('');

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    console.log("Password:", password);
    console.log("Recovery Info:", recoveryInfo);
    setPassword('');
    setRecoveryInfo('');
  };

  return (
    <div>
      <Header />
      <main className="main">
        <Container>
          <h2 className="settings-header">Settings</h2>

          {/* Profile Settings Section */}
          <Row className="mb-4">
            <Col xs={12} md={6} className="text-left">
              <span className="setting-link" onClick={() => toggleSection('profile')} >
                Profile Settings
              </span>
              <p className="section-description">
                Update your name, email, and contact information.
              </p>
              {/* Content toggles inside */}
              {activeSection === 'profile' && (
                <div className="profile-form-container">
                  <Row>
                    <Col>
                      <Form.Group controlId="formName">
                        <Form.Label className="label-name">Change Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" className="input-name" />
                      </Form.Group>
                      <Form.Group controlId="formEmail">
                        <Form.Label className="label-email">Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" className="input-email" />
                      </Form.Group>
                      <Form.Group controlId="formContact">
                        <Form.Label className="label-contact">Contact Information</Form.Label>
                        <Form.Control type="text" placeholder="Enter your contact info" className="input-contact" />
                      </Form.Group>
                      <Button variant="primary" className="save-button">Save Profile Information</Button>
                    </Col>
                  </Row>
                </div>
              )}
            </Col>
          </Row>

          {/* Account Settings Section */}
          <Row className="mb-4">
            <Col xs={12} md={6} className="text-left">
              <span className="setting-link" onClick={() => toggleSection('account')}>
                Account Settings
              </span>
              <p className="section-description">
                Manage account security, password, and recovery options.
              </p>
              {/* Content toggles inside */}
              {activeSection === 'account' && (
                <div className="account-form-container">
                  <Row>
                    <Col>
                      <Form onSubmit={handleAccountSubmit}>
                        <Form.Group controlId="formPassword">
                          <Form.Label className="label-password">Change Password</Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="Enter new password"
                            className="input-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group controlId="formRecovery">
                          <Form.Label className="label-recovery">Account Recovery</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter recovery info"
                            className="input-recovery"
                            value={recoveryInfo}
                            onChange={(e) => setRecoveryInfo(e.target.value)}
                          />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="save-account">Save Account Settings</Button>
                      </Form>
                    </Col>
                  </Row>
                </div>
              )}
            </Col>
          </Row>

          {/* Help Center Section */}
          <Row className="mb-4">
            <Col xs={12} md={6} className="text-left">
              <span className="setting-link" onClick={() => toggleSection('help')}>
                Help Center
              </span>
              <p className="section-description">
                Access support resources, troubleshooting guides, and FAQs for assistance.
              </p>
              {/* Content toggles inside */}
              {activeSection === 'help' && (
                <div className="help-center-container">
                  <Row>
                    <Col>
                      <h5>Support and Resources</h5>
                      <ul>
                        <li>Knowledge Base (Documentation)</li>
                        <li>Contact Information</li>
                        <li>Troubleshooting Guides</li>
                        <li>FAQs</li>
                      </ul>
                    </Col>
                  </Row>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default Settings;
