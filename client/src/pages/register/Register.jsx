import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./register.scss";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const navigation = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8800/api/auth/register",
        inputs
      );
      navigation('/login');
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.errors);
      }
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
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
            {errors.messageUsername && <span className='text-error'>{errors.messageUsername}</span>}
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            {(errors.email || errors.messageEmail) && <span className='text-error'>{errors.email || errors.messageEmail}</span>}
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {errors.password && <span className='text-error'>{errors.password}</span>}
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
