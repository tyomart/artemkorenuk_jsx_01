import { Outlet, Route, Routes } from "react-router-dom";
import Calculator from "../calculator/calculator";
import Quotamat from "../quotamat/quotamat";
import Markdown from "../markdown/markdown";

import './main-style.scss'


const Main_route = () => {


    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(tab => tab.classList.remove('active'));
        tab.classList.add('active');
      });
    }); 
    
    return (<>
        <div className='assets-onmain'>
        <div><Calculator/></div>
        <div><Markdown/></div> 
        <div><Quotamat/></div> 


        <div>were am I?</div>
        </div>

        <Outlet/>
        </>
)
    
}

export default Main_route;

// accordion



  
//   <div className='assets-onmain'>
//   <div><Calculator/></div>
//   <div><Markdown/></div> 
//   <div><Quotamat/></div> 
// </div>