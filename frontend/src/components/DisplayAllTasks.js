//importing necessary modules and components
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";
import AddNewTask from "./AddNewTask";
import UpdateTask from "./UpdateTask";
import DeleteTask from "./DeleteTask";
//functional component responsible for displaying  all tasks, handling task selection and managing the state of tasks.
export default function DisplayAllTasks() {
  //state variable that represents the list of tasks
  const [tasks, setTasks] = useState([]);
  //represents currently selected task
  const [selectedTask, setSelectedTask] = useState(null);

  //async function responsible for fetching tasks from server using axios
  // token from the local storage, sets authorization header and sends GET request to fetch tasks
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);

      if (!token) {
        console.error("Token not found in local storage");
        return;
      }

      console.log("token", token);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get("/todo/tasks", config);
      setTasks(response.data.tasks);
      console.log("tasks", response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };
  //Fetch data only when component mounts
  useEffect(() => {
    fetchData();
  }, []);
  const handleTaskSelection = (task) => {
    setSelectedTask(task);
  };

  //function for handling completion status
  const handleTaskCompletion = async (taskId, isChecked) => {
    try {

      const token = localStorage.getItem("token");
      console.log("token", token);
      if (!token) {
        console.error("Token not found in local storage");
        return;
      }
      console.log("token", token);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const completionStatus = isChecked? true : false
      await axios.put(
        `/todo/task-completed/${taskId}`,
        { completed: completionStatus },config
        
      );
      fetchData();
    } catch (error) {
      console.error("Error updating task completion status", error);
    }
  };
  //return statement

  //A loop iterates over the tasks array and renders a checkbox for each task
  return (
    <div>
      <Form style={{ marginLeft: "45%" }}>
        <h5>Title</h5>
        {tasks.map(
          (task) =>
            task._id && (
              <div key={`task-${task._id}`}
              className={`task ${task.completed? 'completed' : ""}`}
              >
                <Form.Check
                  type="checkbox"
                  id={`task-${task._id}`}
                  label={task.title}
                  checked={task.completed}
                  
                  onChange={(e) => {
                    handleTaskSelection(task);
                    handleTaskCompletion(task._id, e.target.checked );
                  }}
                />
              </div>
            )
        )}
        {/* these 3 components are rendered, passing necessary props to each component */}
      </Form>
      <AddNewTask
        tasks={tasks}
        setTasks={setTasks}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        fetchData={fetchData}
      />
      <UpdateTask
        tasks={tasks}
        setTasks={setTasks}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
        fetchData={fetchData}
      />
      <DeleteTask
        tasks={tasks}
        setTasks={setTasks}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
    </div>
  );
}
