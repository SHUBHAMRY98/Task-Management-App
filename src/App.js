import React from 'react';
import { useState } from 'react';
import './App.css'
import TaskForm from './taskform';
import TaskList from './tasklist';
import TaskDlt from './taskdlt';
//import Filter from './filter';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { v4 as uuidv4 } from 'uuid'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const addTask = (newTask) => {
    const taskWithId = { ...newTask, id: uuidv4() }; 
    setTasks([...tasks, taskWithId]);
  };

  const assignTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: 'assigned' } : task
    );
    setTasks(updatedTasks);
  };

  const completeTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: 'completed' } : task
    );
    setTasks(updatedTasks);
  };

  const pendingTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: 'Pending' } : task
    );
    setTasks(updatedTasks);
  };

  const editTask = (taskId, updatedTask) => {
    // Update the task logic
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, ...updatedTask } : task
    );
    setTasks(updatedTasks);
  };

  

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const deleteTaskList = () => {
    setTasks([]);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6; // Set the number of tasks to display per page

  const getCurrentTasks = () => {
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    return tasks.slice(indexOfFirstTask, indexOfLastTask);
  };

   const [filter, setFilter] = useState('all');

  const onDragEnd = (result) => {
    // Handle the drag-and-drop logic here

    if (!result.destination) {
      return; // The task was dropped outside of a valid drop area
    }
  
    const reorderedTasks = Array.from(filteredTasks);
    const [reorderedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, reorderedTask);
  
    // Update the state with the reordered tasks
    setTasks(reorderedTasks);
  };
 

  return (



    <div className="App">
      <h3>Task Management App</h3>
      <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="task-list">
      <TaskForm onTaskAdd={addTask} />
      {/* <Filter filter={filter} setFilter={setFilter} /> */}

     
        
          {(provided) => (
            <div ref={provided.innerRef}>

      <TaskList
       tasks={getCurrentTasks()}
        //tasks={tasks}
        onAssign={assignTask}
        onComplete={completeTask}
        onPending={pendingTask}
        onEdit={editTask}
        onDelete={deleteTask}
        //filter={filteredTasks}
      />
{provided.placeholder}
            </div>

          )}
          



 {/* Pagination controls */}
 <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={tasks.length <= currentPage * tasksPerPage}
        >
          Next
        </button>
      </div>
    
<TaskDlt onDeleteTaskList={deleteTaskList} />
</Droppable>
   
   </DragDropContext>
</div>
  );
}


export default App;
