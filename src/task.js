

// import React from 'react';

// function Task({ task, onAssign }) {
//   return (
//     <li className="Task">
//       <h3>{task.title }</h3>
//       <p>{task.description}</p>
//       <button onClick={() => onAssign(task.id)}>Assign</button>
//     </li>
//   );
// }

// export default Task;

import React from 'react';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

function Task({ task, onAssign, onComplete, onPending, onDeleteTask, onEdit, index}) {
  const getStatusStyle = () => {
    switch (task.status) {
      case 'assigned':
        return { backgroundColor: 'rgb(252, 252, 67)' };
      case 'completed':
        return { backgroundColor: 'rgb(161, 255, 37)' };
      case 'Pending':
        return { backgroundColor: 'rgb(255, 60, 60)' };
      default:
        return {};
    }
  };

  const [isEditing, setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ name: task.name, description: task.description, candidate: task.candidate });

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Implement the save logic and update the task
    // You can use an update function passed as a prop (e.g., onEdit) to save the changes.
    
    // First, create the updated task object
    const updatedTask = { name: editedTask.name, description: editedTask.description, candidate: editedTask.candidate };
  
    onEdit(task.id, updatedTask);
  
    setEditing(false);
  };


  return (
    <div>
    <li className="Task" style={getStatusStyle()}>

{isEditing ? (
        <div>
           <input
            type="text"
            value={editedTask.candidate}
            onChange={(e) => setEditedTask({ ...editedTask, candidate: e.target.value })}
          />
          <input
            type="text"
            value={editedTask.name}
            onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) :(
<div>
        <div>{task.candidate}</div>
      <div>{task.name}</div>
      <p>{task.description}</p>
      <button onClick={() => onAssign(task.id)}>Assign</button>
      <button onClick={() => onComplete(task.id)}>Complete</button>
      <button onClick={() => onPending(task.id)}>Pending</button>
      <button onClick={()=> handleEdit(task.id)}>Update</button>
      <button onClick={() => onDeleteTask(task.id)}>Delete</button>
      </div>
      )}
    </li>

<Draggable draggableId={task.id.toString()} index={index}>
{(provided) => (
  <li
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    className="Task"
  >
    {/* Task content and buttons */}
  </li>
)}
</Draggable>
</div>
  );
}

export default Task;
