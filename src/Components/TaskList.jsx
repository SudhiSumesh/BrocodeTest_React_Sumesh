// TaskList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, Pagination } from "react-bootstrap";

const TaskList = ({ onSelectTask }) => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(16); // Number of tasks to display per page

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/todos`
      );
      setTasks(response.data);
    };
    fetchTasks();
  }, []);

  // Get current tasks
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(currentPage + 1);
  const prevPage = () => setCurrentPage(currentPage - 1);

  return (
    <div>
      <ListGroup>
        {currentTasks.map((task) => (
          <ListGroup.Item
            key={task.id}
            action
            onClick={() => onSelectTask(task)}
          >
            {task.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Pagination>
        <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
        {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }).map(
          (_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          )
        )}
        <Pagination.Next
          onClick={nextPage}
          disabled={currentPage === Math.ceil(tasks.length / tasksPerPage)}
        />
      </Pagination>
    </div>
  );
};

export default TaskList;
