
import './_App.css';
import './App_style.less';

import { Route, Router, Routes } from "react-router-dom"

import Sandbox4 from './components/sandbox4.comp';

import Timer from './components/timer/timer_comp';
import TaskListComp from './components/task_list_comp/taskListcomp';
import Calculator from './components/calculator/calculator';
import Quotamat from './components/quotamat/quotamat';
import Markdown from './components/markdown/markdown';

import Main_rou from './components/routes/main';
import Markdown_rou from './components/routes/markdown_rou';
import Quatomator_rou from './components/routes/quatomator_rou';
import Calculator_rou from './components/routes/calculator_rou';
import Navigator from './components/routes/navigator';
import Test_rou from './components/routes/test_rou';


// import DateComp from './components/date_comp';


const App = () => {

  return ( <>
<Routes>

  <Route path='/' element={<Navigator/>}>
        <Route index element={<Main_rou  />} />
        <Route path='calculator' element={<Calculator_rou />} />
        <Route path='quotamat' element={<Quatomator_rou />} />
        <Route path='markdown' element={<Markdown_rou />} />
        <Route path='test' element={<Test_rou />} />

   </Route> 


 
</Routes>


</>
  );
}


export default App;

{/* <div className='blank-space1'> <br/></div>
<Markdown /> */}

 {/* <br /> */}

{/* <TaskListComp /> */}

{/* <Quotamat /> */}

{/* <DateComp /> */}

{/* <Sandbox4 /> */}
{/* <Calculator /> */}
