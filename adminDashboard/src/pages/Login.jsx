import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginData from "../data/login-data";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = LoginData.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      const token = "sample-token-123";
      localStorage.setItem("token", token);

      navigate("/home");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="take-screen content-mid-vertical bg-pangasinan gap-xlarge">
<<<<<<< HEAD
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
=======
      <header className="content-mid-vertical gap-xsmall bg-orange">
        <h1 className="">TRAVEL GO</h1>
        <h4 className="">Travel and get more experience here in Pangasinan!</h4>
>>>>>>> parent of 690fb9c (add Home Page)
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
        <button onClick={handleLogin}>LOGIN</button>
      </div>
    </div>
  );
};

export default Login;
