
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const TaskUpdate = ({ taskId, onUpdateTask }) => {
  const [task, setTask] = useState({});
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_PLACEHOLDER_API}${taskId}`)
      .then(response => {
        const fetchedTask = response.data;
        setTask(fetchedTask);
        setTitle(fetchedTask.title);
        setUserId(fetchedTask.userId);
        setCompleted(fetchedTask.completed);
      })
      .catch(error => {
        console.log('Error fetching task details:', error);
        setError('Failed to fetch task details');
      });
  }, [taskId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTask = { ...task, title, userId, completed };
    axios.put(`https://jsonplaceholder.typicode.com/todos/${taskId}`, updatedTask)
      .then(response => {
        onUpdateTask(response.data);
        setError('');
      })
      .catch(error => {
        console.error('Error updating task:', error);
        setError('Failed to update task');
      });
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formUserId">
          <Form.Label>User ID</Form.Label>
          <Form.Control type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formStatus">
          <Form.Check type="checkbox" label="Completed" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Task
        </Button>
        <Button variant="secondary" onClick={onCancel} className="ml-2">
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default TaskUpdate;
