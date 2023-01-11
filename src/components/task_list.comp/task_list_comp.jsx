import { useState, useReducer } from "react";

import './task_list_style.less'


const TaskListComp = () => {

const reducer = (state, action) =>  {
  switch (action.type) {
    case "add":
      return [...state, action.item]
       
    case "remove":
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];

      case "update":
      return;

    default:
      throw new Error();
  }
}

const Task = ({ task, onRemove }) => {

  const listAuxFoo = (item) => {
    return <span>{Object.values(item).map((el) => <span>  {el}  </span>)}</span>
  }

  return (
    <div className="task">
      {listAuxFoo(task)}
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}

const  TaskList = () => {

  const [tasks, dispatch] = useReducer(reducer, [{ name: "Heat", surname: 'Beep', descr: 'A - A' }]); 
  const [newTask, setNewTask] = useState([]);

  const handleAddClick = () => {
    if (newTask.name === "" || newTask.surname === '' || newTask.descr === "") {
      return;
    }

    dispatch({ type: "add", item: newTask });
    setNewTask ({}) 
    };

  const handleChange = (event) => {
      
    setNewTask({...newTask, [event.target.name]:event.target.value});
  }

  return (
    <div>
      <div className="movies">

        {tasks.map((movie, index) => {
          return (
            <Task
              task={movie}
              onRemove={() => dispatch({ type: "remove", index })}
            />

          );
        })}
      </div>
      <div className="add-movie">
        <input name='name' onChange={handleChange} placeholder="name" />
        <input name='surname' onChange={handleChange}  placeholder="surname" />
        <input name='descr' onChange={handleChange}  placeholder="descr" />
        <button onClick={handleAddClick}>Add movie</button>
      </div>
    </div>
  );
}

  return (
    <div className="task-list">
      <h2>Task List</h2>
      <TaskList />
    </div>
  );

}

export default TaskListComp



