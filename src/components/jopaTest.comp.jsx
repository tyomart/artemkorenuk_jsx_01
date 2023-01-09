import { useState } from "react"
const Sandbox = () => {

  const [jop,setJop] = useState({taskName:0, etcjo: ""})


  
const handleClickJ = () => {setJop((jop) => ({...jop, taskName:jop.taskName+1}))}  
const handleClickM = () => {setJop((jop) => ({...jop, taskName:jop.taskName-1}))}  
const handleClickB = () => {setJop((jop) => ({...jop, taskName:0}))}  
//const handleClickA = taskName => setJop({...jop, [taskName]: jop[taskName]+1})  

// const setFirstName = e => {setName(jop => ({...jop, firstName: e.target.value,}))} -- ()=>handleClickJ()

 
return  <div>
          <button onClick={handleClickJ} onDoubleClick={handleClickM} onBlur={handleClickB}> Sandbox BUT {jop.taskName} </button>
          <br/> 
          <br/> 
       </div>
}
export default Sandbox
  
 
/* 
 */
