
import './_App.css';
import './App_style.scss';

import { Route, Router, Routes } from "react-router-dom"




// import Main_route from './components/routes/main_route';
import Markdown_rou from './components/routes/markdown_rou';
import Quatomator_rou from './components/routes/quatomator_rou';
import Calculator_rou from './components/routes/calculator_rou';
import Navigator from './components/routes/navigator';
import Test_rou from './components/routes/test_rou';


// import DateComp from './components/date_comp';


const App = () => {

  return ( <>
<Routes>

  <Route path='/' element={<Navigator/>} //id='navigator-onapp'
  >
        {/* <Route index element={<Main_route  />} /> */}
        <Route path='calculator' index element={<Calculator_rou />} />
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
