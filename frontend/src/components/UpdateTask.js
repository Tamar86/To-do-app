//importing necessary modules
import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
//functional component responsible for updating task in database and takes props as a parameters.
export default function UpdateTask({ tasks, setTasks, selectedTask, fetchData }) {
  const [updatedTitle, setUpdatedTitle] = useState(
    selectedTask ? selectedTask.title : ""
  );

  //async function responsible for handling  the update of tasks
  const handleUpdateTask = async () => {
    try {
        // Retrieves token from the local storage, sets authorization header and sends DELETE request to fetch tasks
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
      //sends a put request to the server to update the task with the specified ID
      await axios.put(
        `/todo/update-task/${selectedTask._id}`,
        { title: updatedTitle },
        config
      );
      const updatedTasks = tasks.map((task) =>
        task._id === selectedTask._id
          ? { ...task, title: updatedTitle.title }
          : task
      );
      setTasks(updatedTasks);
      setUpdatedTitle("");
      fetchData()
    } catch (error) {
      console.error("Error updating task", error);
    }
  };
//return statement
  return (
    <div style={{ width: "10%", marginLeft: "45%" }}>
      <Form>
        <Form.Group controlId="formTaskTitle">
          <Form.Control
            type="text"
            placeholder="Enter task title"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            style={{ marginTop: "10px" }}
          />
          <Button
            variant="success"
            onClick={handleUpdateTask}
            style={{ width: "155px", marginTop: "10px" }}
          >
            Update Task
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}
