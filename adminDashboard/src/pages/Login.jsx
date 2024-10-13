import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginData from "../data/login-data";
import HCaptcha from '@hcaptcha/react-hcaptcha';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Hcaptcha, setCaptcha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const captcha = useRef();

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = await LoginData(email, password);
    setLoading(false);

    if (user && user.data && user.data.session) {
      const token = user.data.session.access_token;
      localStorage.setItem("token", token);
      alert(token);
      navigate("/home");
    } else {
      alert("Invalid email or password!");
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
        <input
          type="text"
          placeholder="Admin Id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </main>
      <div className="">
        <HCaptcha
          ref={captcha}
          sitekey="030e62ac-0200-47b6-9e7a-e086d94872a2"
          onVerify={setCaptcha}
        />
      </div>
      <div className="">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <button onClick={handleLogin} className="drop-shadow-large">
            LOGIN
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
