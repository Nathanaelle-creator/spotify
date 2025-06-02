import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    birthdate: "",
    phone: "",
    country: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() => navigate("/"));
  };

  return (
    <div className="register-container">
      <h2>Let have an account !</h2>
      <form onSubmit={handleSubmit}>
        {[
          "firstname",
          "lastname",
          "username",
          "email",
          "password",
          "birthdate",
          "phone",
          "country",
        ].map((field) => (
          <div key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={
                field === "birthdate"
                  ? "date"
                  : field === "email"
                  ? "email"
                  : field === "password"
                  ? "password"
                  : "text"
              }
              
              name={field}
              value={form[field]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/">Click here</a>
      </p>
    </div>
  );
};

export default Register;
