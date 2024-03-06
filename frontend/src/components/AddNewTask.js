//importing necessary modules
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Button from "react-bootstrap/Button";
//functional components responsible for adding new task to tasks list, takes props as parameters
export default function AddNewTask({ tasks, setTasks, fetchData }) {
  //stores title of new task
  const [newTaskTitle, setNewTaskTitle] = useState("");

//this function is called when user clicks  "Add Task" button. 
  const handleAddTask = async () => {
    try {
       // Retrieves token from the local storage, sets authorization header and sends POST request to add new task
      const token = localStorage.getItem("token");
       //checks if the token exists, if not logs error and returns early
      if (!token) {
        console.error("Token not found in local storage");
        return;
      }
      //constructs configuration object with authorization header set using the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "/todo/new-tasks",
        { title: newTaskTitle },
        config
      );
      //updates task state by appending the newly added task received from the server to the existing tasks array
      setTasks([...tasks, response.data]);
      setNewTaskTitle("");
      fetchData()
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  return (
    <div style={{ width: "10%", marginLeft: "45%" }}>
      <Form>
        <Form.Group controlId="formTaskTitle">
          <Form.Control
            type="text"
            placeholder="Enter task title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            style={{marginTop: '10px'}}
          />
        </Form.Group>
        <Button
          variant="primary"
          onClick={handleAddTask}
          style={{ width: "155px", marginTop: '10px' }}
        >
          Add Task
        </Button>
      </Form>
    </div>
  );
}
