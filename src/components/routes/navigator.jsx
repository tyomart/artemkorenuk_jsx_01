import { Route, Routes } from "react-router-dom";
import { Outlet, Link } from 'react-router-dom';

const Navigator = () => {
    return ( <>
            <Link className='main-link' to='/'> MAIN</Link>
        <div className="navi-container">


            <div className="navi-links">
                <Link className='n-link' to='/calculator'> CALCULATOR</Link>
            _--_
                <Link className='n-link' to='/quotamat'> QUOTAMAT</Link>
                _--_
                <Link className='n-link' to='/markdown'> MARKDOWN</Link>
            </div>

        </div>


         <Outlet />
         </>
    )
    
}

export default Navigator;