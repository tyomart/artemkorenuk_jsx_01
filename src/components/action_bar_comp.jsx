import { useState, useEffect } from 'react'

import { tSklad } from '../data/task_data'

import TaskListComp from './task_list_comp'





const ActionBar = () => {
 
  // const zapSklad = [...tSklad]

  const [storage, setStorage] = useState([])
  const [newTask, setNewTask] = useState({})
  const [zapSklad, setZapSklad] = useState([...tSklad])
  // let [showHNY, setshowHNY] = useState(false)
  const [show, toggleShow] = useState(false);

  const handleChange = (e) => // NEW TASK
    { setNewTask({...newTask, [e.target.name]: e.target.value})  /* doneAttr:false */
   
   // console.log(newTask)
  }

  const handleAddTask = (e) =>  // SUBMIT TO === add Task
  {
    e.preventDefault();
    setStorage((storage) => ([...storage, newTask]))
 
  } ;



return <div className='actionBar'>

<div>
  <TaskListComp taskList = {storage.length === 1 && storage}/>

  <form onSubmit={handleAddTask} > {/* HOW TO ADD VALUE IN INPUT ? */}
    <label>New task: </label>

    <input name='id' placeholder='id' defaultValue={newTask.id} onChange={handleChange}></input>
    <input name='task_name' placeholder='name' defaultValue={newTask.task_name} onChange={handleChange}></input>
    <input name='task_descr' placeholder='description' onChange={handleChange}></input>
    <input name='date_time' placeholder='date & time' onChange={handleChange}></input>
    <button type='submit'>Add to list</button>
  </form>

  <div key='TaskList'>

</div>

  {/* <button onClick={setshowHNY(!showHNY)}>HNY button </button>
  {showHNY ?? <h1>Happy New Year!!!</h1>} */}

   <div>
      <button
        onClick={(

        ) => toggleShow(!show)}>
        HNY but
      </button>    
      {show && <h1 style={{color:'red'}}>HAPPY NEW YEAR</h1>}
    </div>
    <div>what for the rest??</div> 
  

</div> 

</div>
}
export default ActionBar;


// ***idea*** use Context for BIG SKLAD
