import React from 'react';

function DeleteTaskListButton({ onDeleteTaskList }) {
  return (
    <div class="dlt">
      <button onClick={onDeleteTaskList}>Delete Task Manager List</button>
    </div>
  );
}

export default DeleteTaskListButton;
