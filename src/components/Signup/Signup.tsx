import  { useState } from 'react';
import '../Login/LoginForm.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [interests, setInterests] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // Form validation
    if (!name || !email || !password || !interests) {
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
        name,
        email,
        password,
        interests: interests.split(',').map(interest => interest.trim()),
      };

      // Make the POST request using fetch
      const response = await fetch('http://localhost:3000/api/auth/register', {
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
        toast.success('Signup successful!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        // Handle errors from the server
        toast.error(result.message || 'Signup failed. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        console.error('Signup error:', result);
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
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
        <p style={{textAlign:"center"}}>
        <span style={{fontSize:"15px"}}>Have Account? </span>  <Link  style={{fontSize:"15px",color:"aqua"}} to={"/login"}>login here</Link>
        </p>
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
          </div>
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
          <div className="input-group">
            <label htmlFor="interests">Interests</label>
            <input
              type="text"
              id="interests"
              name="interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              required
              placeholder="Enter your interests (comma-separated)"
            />
          </div>
          <button type="submit" className="btn-submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
