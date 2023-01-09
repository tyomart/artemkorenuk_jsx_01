
import './_App.css';
import { useState } from 'react'
import task_data from './data/task_data.json' // JSON

import TaskList from './components/task_list_comp'
import DateComp from './components/date_comp'
import ActionBar from './components/action_bar_comp'
import AuthBar from './components/auth_comp'

import Task from './components/task-item/task-item';

 
import { pp, testParam } from './_test-pak-me/test-pack-me'; // TEST PAK

var new_task = {} //change to const
const nullFoo = () => null;
const App = () => {

    const [name, setName ] = useState ('');
    const handleInput = () => {console.log(name)}
    const { id, task_Name, date_time} = task_data



// {pp('task_data imported', task_data)}
  return ( 

  
  <div className="App">


<Task task_data ={task_data}>
      <h2>
      Current task</h2>
      </Task>

      
    <div className='inp_test'> 
      <input placeholder ='test input' onChange={ e => setName(e.target.value)}/>
      <button onClick = { () => handleInput()}> Inp Test</button> 
    </div>
   
    <AuthBar />
      <h1> TODO list</h1>  
    <DateComp />
    <ActionBar />

    <div className='new_Task'>
      <form onSubmit={pp('ready to push SUBMIT, why re-rendering')}>

        <input id={id} name="title" value="1" placeholder ='New task here'/>
        <input id={id} name="descr" value="2" placeholder ='New descr here'/>
    
        <input id={id} name="date" value="3" placeholder ='New date here'/>
         
        <button type={id} onClick ={() => ([...task_data, new_task])}>Submit!</button>
        </form>
    </div>

    
    {/* {pp('task_data imported', task_data)} */}
   <TaskList task_data ={task_data} />
 
</div>
  );
}

export default App;
