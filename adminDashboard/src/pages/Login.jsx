// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginData from "../data/login-data";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Form, FormControl, FormGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rcaptcha, setCaptcha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const captcha = useRef();

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!rcaptcha) {
      alert("Please complete the CAPTCHA!");
      return;
    }

    setLoading(true);

    const user = await LoginData(email, password, rcaptcha);
    setLoading(false);

    if (user && user.data && user.data.session) {
      const token = user.data.session.access_token;
      localStorage.setItem("token", token);
      alert(token);
      navigate("/home");
    } else {
      alert("Invalid email, password, or CAPTCHA!");
    }
  };

  return (
    <div className="take-screen content-mid-vertical bg-pangasinan gap-xlarge">
      <header className="content-mid-vertical gap-xsmall">
        <h1 style={{
          margin: 0,
          padding: 0,
          color: 'white',
          filter: 'drop-shadow(5px 5px 10px #000000)',
          fontSize: '120px',
          height: 'fit-content',
        }}>
          TRAVEL GO
        </h1>
        <h4 className="">Travel and get more experience here in Pangasinan!</h4>
      </header>

      <main className="content-mid-vertical">
        <Form>
          <FormGroup>
            <FormControl
              type="text"
              placeholder="Admin Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
        </Form>
      </main>
      <div className="">
        <HCaptcha
          ref={captcha}
          sitekey="030e62ac-0200-47b6-9e7a-e086d94872a2"
          onVerify={setCaptcha}  // This sets the captcha token
        />
      </div>
      <div className="">
        <button onClick={handleLogin} className="drop-shadow-large" disabled={loading}>
          {loading ? "Logging in..." : "LOGIN"}
        </button>
      </div>
    </div>
  );
};

export default Login;
