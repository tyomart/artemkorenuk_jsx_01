import { React } from 'react'
import But from '../components/but_comp'

const AuthBar = (props) => (


<div className ='authBar' id='auth_bar'>
  {/* <button className='theButs'>SignIn</button> */}
  <But content='SignIn' />
  {/* <button className='theButs'>SignUp</button> */}
  <But content='SignUp' />
  
</div>
)
export default AuthBar;