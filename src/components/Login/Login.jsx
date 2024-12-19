import React, { useContext, useState } from 'react';
import './LoginForm.css';
import { ToastContainer, toast } from 'react-toastify';
import AuthContext from "../../context/auth/AuthContext";
import {  useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const data = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!email || !password) {
      toast.error('All fields are required!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }


    try {
      // Prepare the request body
      const requestBody = {
        email,
        password,
      };

      // Make the POST request using fetch
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Handle the response
      const result = await response.json();

      if (response.ok) {
        toast.success('Login successful!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        data.SetUser(result.user)

        
        setTimeout(() => {
          navigate("/")
        }, 1000);
      } else {
        // Handle errors from the server
        toast.error(result.message || 'Login failed. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.error('Login error:', result);
      }
    } catch (error) {
      // Handle network or unexpected errors
      toast.error('An error occurred. Please try again later.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.error('Network error:', error);
    }
  };


  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-form">
        <h2>Login</h2>
        <p style={{textAlign:"center"}}>
        <span style={{fontSize:"15px"}}>Not Have Account </span>  <Link  style={{fontSize:"15px",color:"aqua"}} to={"/signup"}>Signup here</Link>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn-submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
