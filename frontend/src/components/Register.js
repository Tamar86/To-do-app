//this component serves as an entry point for users who want to register or log into the application.
import React, { useState } from "react";
import RegistrationForm from "./RegistrationForm";
import Login from "./Login";

export default function Register() {
  //determines whether to display the registration form or the login form
  //it is initialized to true which means registration form should be displayed by default
  const [showRegistration, setShowRegistration] = useState(true);
  //this function is responsible for toggling the display between the registration and login forms.
  //when called it updates the showRegistration state by toggling its value between true and false
  const handleToggleForm = () => {
    setShowRegistration(!showRegistration);
  };
  //inside the return statement the component conditionally renders either the registration form or the login form
  //based on the value of showRegistration .

  return (
    <div>
      {showRegistration ? (
        <RegistrationForm onToggleForm={handleToggleForm} />
      ) : (
        <Login />
      )}
    </div>
  );
}
