//importing necessary modules
import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";

//functional component responsible for deleting task from database and takes props as a parameters.
export default function DeleteTask({
  tasks,
  setTasks,
  selectedTask,
  setSelectedTask,
}) {
  //async function responsible for handling  the deletion of tasks
  const handleDeleteTask = async () => {
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
      //sends a DELETE request to the server to delete the task with the specified ID
      await axios.delete(
        `/todo/delete-tasks/${selectedTask._id}`,

        config
      );
      //updates tasks state by filtering out the deleted task from array of tasks
      const updatedTasks = tasks.filter(
        (task) => task._id !== selectedTask._id
      );
      setTasks(updatedTasks);
      setSelectedTask(null);
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };
//returns delete button 
  return (
    <div style={{ width: "10%", marginLeft: "45%" }}>
      <Button
        variant="danger"
        onClick={handleDeleteTask}
        style={{ width: "155px", marginTop: "10px" }}
      >
        Delete Task
      </Button>
    </div>
  );
}
