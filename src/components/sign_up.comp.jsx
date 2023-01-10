import { React } from 'react'
import But from './but_comp'

const SignUp = () => (


<div className ='sign-in-form' id='sign-in-form'>
  <form>
    <input name='username' placeholder='username'></input>
    <input name='password' placeholder='password'></input>
    <button type='submit'>SIGN UP</button>
  </form>
  
</div>
)
export default SignUp;