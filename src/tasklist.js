
import React from 'react';
//import { useState } from 'react';
import Task from './task';

function TaskList({tasks, onAssign, onComplete, onPending, onDelete, onEdit}) {
 
  //const [filter, setFilter] = useState('all');
  // const filteredTasks = tasks.filter((task) => {
  //   if (filter === 'all') return true;
  //   if (filter === 'pending') return task.status === 'pending';
  //   if (filter === 'assigned') return task.status === 'assigned';
  //   if (filter === 'completed') return task.status === 'completed';
  //   return true;
  // });

  return (
    <div className="TaskList">
      <div >Task Manager List</div>
      <ol>
        {tasks.map((task) => (
          <Task

            key={task.id}
            task={task}
            onAssign={onAssign}
            onComplete={onComplete}
            onPending={onPending}
            onEdit={onEdit} // Pass the editTask function
            onDeleteTask={onDelete}
          />
        ))}
       
      </ol>

      
{/* <ul>
      {filteredTasks.map((task) => (
        <TaskList
          key={task.id}
          //tasks={getCurrentTasks()}
          task={task}
          onAssign={() => onAssign(task.id)}
          onComplete={() => onComplete(task.id)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </ul>  */}

    </div>
  );
}


export default TaskList;
