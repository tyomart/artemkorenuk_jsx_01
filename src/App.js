
import './_App.css';
import './App_style.less';
import { useState } from 'react'

import TaskList from './components/task_list.comp/task_list_comp'
import TaskListComp from './components/task_list.comp/task_list_comp';

/* 
import DateComp from './components/date_comp'
import ActionBar from './components/action_bar_comp'
import AuthBar from './components/auth_comp' */

/* import Task from './components/task-item/task-item'; */ //COMPs
/* import { tSklad } from './data/task_data.js' */ // JSON

 
//import { pp } from './_test-pak-me/test-pack-me'; // TEST PAK
/* import Form from './components/test.comp';  *///test comp
// import Sandbox3 from './components/task_list_comp';
//import Sandbox4 from './components/sandbox4.comp';



const App = () => {
/* 
 const [stateTask, setStateTask ] = useState ({});   //STATE hook


 const handleTaskName = (e) => // set state
  {e.preventDefault();
    setStateTask({...stateTask, taskName: e.target.value});
  
  
  };

   const testBut = (e) => (console.log('test PRESSED', e)) */



  return ( 
 <div className="App">

 
  
 {/* <Sandbox3 /> props = {tSklad} */}
 <br />

{/* //NEW TASK */}
 
{/* AUTH - NAV BAR */}
{/* <AuthBar />
      <h1> TODO list</h1> 

<DateComp /> */}

{/* CURRENT TASK */}
{/*     { <Task taskItem = {tSklad[0]}>
      <h2>
      Current task</h2>
      </Task> } 
   
<ActionBar  /> */}

<TaskListComp />

{/* <button >wtf button</button> */}
  
</div>
  );
}

export default App;
