import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";

const Register = () => {
  // State to hold user inputs
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  // State to hold any error messages
  const [err, setErr] = useState(null);

  // Function to update state when user types
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Function to handle form submission
  const handleClick = async (e) => {
    e.preventDefault(); // Prevent page from refreshing
    try {
      // Make API request to the backend registration endpoint
      await axios.post("http://localhost:8800/api/auth/register", inputs);
    } catch (err) {
      // Set the error state if the request fails
      setErr(err.response.data);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Circle Up.</h1>
          <p>
            Join our community to connect, share, and discover. It's free and always will be.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            {err && <div className="error">{err}</div>}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
