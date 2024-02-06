// TaskCreation.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const TaskCreation = ({ onCreateTask }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, userId, completed };
    axios.post(import.meta.env.VITE_PLACEHOLDER_API, newTask)
      .then(response => {
        onCreateTask(response.data);
        setTitle('');
        setUserId('');
        setCompleted(false);
        setError('');
      })
      .catch(error => {
        console.log('Error creating task:', error);
        setError('Failed to create task');
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
        <Button variant="primary" type="submit" className='btn btn-primary mt-4'>
          Create Task
        </Button>
      </Form>
    </div>
  );
};

export default TaskCreation;
