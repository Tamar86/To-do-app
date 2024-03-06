//importing necessary modules
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
//this component allows users to register for a new account by providing their email address and password
export default function RegistrationForm({ onToggleForm }) {
  //state variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //this function is triggered when user submits the registration form
  //takes event object as a parameter to prevent default form submission behavior
  const handleRegistration = async (event) => {
    event.preventDefault();

    console.log("Toggle", onToggleForm);
    try {
      //sends POST request to the server's endpoint with the users email and password
      //if the registration is successful it it logs the response data and invokes the onToggleForm function provided as a prop
      //which is intended to toggle between registration and login

      const response = await axios.post("/auth/register", {
        email: email,
        password: password,
      });

      console.log("Registration successful", response.data);
      onToggleForm();
    } catch (error) {
      console.error("Error registering user", error);
    }
  };
//return statement
  return (
    <div style={{ width: "40%", marginLeft: "30%" }}>
      <Form onSubmit={handleRegistration}>
        <Form.Floating className="mb-3">
          <Form.Control
            id="floatingInputCustom"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInputCustom">Email address</label>
        </Form.Floating>
        <Form.Floating>
          <Form.Control
            id="floatingPasswordCustom"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Password</label>
        </Form.Floating>

        <Button
          variant="primary"
          type="submit"
          style={{ width: "300px", marginTop: "20px", marginLeft: "25%" }}
        >
          Register
        </Button>
      </Form>
      <br />
      <h5>
        {" "}
        Already registered? <Link to="/">Login</Link>
      </h5>
    </div>
  );
}
