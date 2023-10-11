
import React, { useState } from 'react';

function TaskForm({ onTaskAdd }) {
  const [task, setTask] = useState({ name: '', description: '', candidate:'' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.name && task.description && task.candidate) {
      onTaskAdd(task);
      setTask({ name: '', description: '', candidate:'' });
    }
  };

  return (
    <div className="TaskForm">
      <form onSubmit={handleSubmit} class="form">
        <div class="candidate">
        <input
          type="text"
          name="candidate"
          value={task.candidate}
          placeholder="Candidate-Name"
          onChange={handleInputChange}
          required
        />
          </div> 
<div class="taskname">
        <input
        
          type="text"
          name="name"
          placeholder="Task-Name"
          value={task.name}
          onChange={handleInputChange}
          required
        />
        </div>

        <div class="discription">
        <textarea
        type="text"
          name="description"
          placeholder="Task-Description"
          value={task.description}
          onChange={handleInputChange}
          required
        />
        </div>
        
        <button type="submit" class="savebtn">Save Task</button>
        </form>
    </div>
  );
}

export default TaskForm;



