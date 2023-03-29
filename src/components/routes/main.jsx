import { Outlet, Route, Routes } from "react-router-dom";
import Calculator from "../calculator/calculator";


const Main_rou = () => {
    return (<>
        <h1>React portfolio. Use Navigation menu</h1>
        
        <Outlet/>
        </>
)
    
}

export default Main_rou;