
import React from 'react';

import { Button } from 'react-bootstrap';

const TaskDetails = ({ task,  }) => {

  return (
    <div>
      <h2>{task.title}</h2>
      <p>Assigned User: {task.userId}</p>
      <p>Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
      <Button variant="primary" >Back to Task List</Button>
     
    </div>
  );
};

export default TaskDetails;
