// App.js
import React, { useState } from "react";
import TaskList from "./Components/TaskList";
import TaskDetails from "./Components/TaskDEtails";
import TaskCreation from "./Components/TaskCreation";
import TaskUpdate from "./Components/TaskUpdate";
import { Container, Row, Col, Button } from "react-bootstrap";

function App() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreationForm, setShowCreationForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleTaskSelection = (task) => {
    setSelectedTask(task);
  };

  const handleTaskCreation = () => {
    setShowCreationForm(true);
  };

  const handleTaskCreationCancel = () => {
    setShowCreationForm(false);
  };

  const handleTaskUpdate = () => {
    setShowUpdateForm(true);
  };

  const handleCreateTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setShowCreationForm(false);
  };

  return (
    <Container>
      <Row>
        <h2>Task List</h2>
        <Col md={4}>
          <Button onClick={handleTaskCreation} className="my-2">
            Create Task
          </Button>
          <TaskList tasks={tasks} onSelectTask={handleTaskSelection} />
        </Col>

        <Col md={4}>
          {selectedTask && <TaskDetails task={selectedTask} />}
          {showCreationForm && <TaskCreation onCreateTask={handleCreateTask} />}
          {/* <Button variant="primary" onClick={handleTaskUpdate} className=''>Update </Button> */}
          {showUpdateForm && (
            <TaskUpdate
              taskId={selectedTask.id}
              onUpdateTask={setSelectedTask}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
