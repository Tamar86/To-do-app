//importing necessary modules and components
import React, { useState } from "react";
import DisplayAllTasks from "./DisplayAllTasks";
import LoginForm from "./LoginForm";

//functional component
export default function Login() {
    //state variable which tracks whether the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);
//this function is logged when user successfully logs in, takes loginData as a parameter
//which contains the token received upon successful login
  const handleLogin = async (loginData) => {
    //sets isLoggedIn to true
    setIsLoggedIn(true); 
    //retrieves the token from loginData object and stores it in the browsers local storage under the key "token"
    const token = loginData.token;
    localStorage.setItem("token", token);
  };
// inside the return statement, the component renders different components based on the value of isLoggedIn
//if isLoggedIn is true, it renders the DisplayAllTasks component passing isLoggedIn as a prop
// if isLoggedIn is false it renders a LoginForm component and binds the handlesLogin function to its onLogin prop 
  return (
    <div>
      {isLoggedIn ? (
        <DisplayAllTasks isLoggedIn={isLoggedIn} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}
