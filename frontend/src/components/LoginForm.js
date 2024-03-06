//importing necessary modules
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
//link component from "react-router-dom" to navigate to the registration page
import { Link } from "react-router-dom"
//functional component
export default function LoginForm({ onLogin }) {
  //state variables for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
//this function is triggered when user submits the login form
//takes event object as a parameter to prevent default form submission behavior
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      //sends POST request to the server's endpoint with the users email and password
      //if the login is successful it calls the onLogin function passed as a prop
      //passing the response data (users authentication token) to it
      const response = await axios.post("/auth/login", {
        email: email,
        password: password,
      });
      console.log("Login successful", response.data);
      onLogin(response.data);
    } catch (error) {
      console.error("Error login user", error);
    }
  };
//return statement
//onchange event handles update the state variable email and password as the user types
//onsubmit event is set to trigger handleLogin function
  return (
    <div style={{ width: "40%", marginLeft: "30%" }}>
      <Form onSubmit={handleLogin}>
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
          <label htmlFor="floatingPasswordCustom">Password</label>
        </Form.Floating>

        <Button
          variant="primary"
          type="submit"
          style={{ width: "300px", marginTop: "20px", marginLeft: "25%" }}
        >
          Log In
        </Button>
      </Form>
      <br/>
      {/* link to the registration page using Link component from react-router-dom */}
      <h5> Don't have account? <Link to='/register'>Register</Link></h5>
      
    </div>
  );
}
