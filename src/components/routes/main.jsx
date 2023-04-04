import { Outlet, Route, Routes } from "react-router-dom";
import Calculator from "../calculator/calculator";
import Quotamat from "../quotamat/quotamat";

import './main-style.less'


const Main_rou = () => {
    return (<>
        
        <div className='assets-onmain'>
            <div><Calculator/></div>
            <div><Quotamat/></div>
        </div>
        <Outlet/>
        </>
)
    
}

export default Main_rou;