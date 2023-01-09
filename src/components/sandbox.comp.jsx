import {useState} from 'react'

import SandboxIn from "./sandboxIn.comp "


const Sandbox = () => {

  const testVal = {name: 'Ivan', surname: '3,4' } // id:'1', 



  const testSklad = [
    {
      "id":1,
    "doneAttr": false,
    "task_name": "Alpha",
    
  },
  { "id":2,
    "doneAttr": false,
    "task_name": "Beta",
  
  },]

 const [jop,setJop] = useState([])
  const [jop2,setJop2] = useState({new_name:'Name', new_descr:'Surname'})

 
const handleClickJ = () => // 1 button
  {
    setJop((jop) => ([...jop, jop2]))
    console.log('add to Big Sklad',jop)
 
  }  
const handleClickJ2 = () =>  // 2 button
  {
  
    setJop2((jop2) => ({...jop2, key_val:'1', } //id1:jop.length.toString()
    ))
    console.log('add id elem',jop2)
    // let arrchecker = [1,2,3,'wtf']
    // console.log('ARR CHECK', [...arrchecker, 'a'])
    const AddItem = (arr, item) => [...arr, item]

    console.log(AddItem([1,2,3], 'a'))

  }  

return  <div>
          {/* {console.log('testVal just before child', testVal)} */}
          <SandboxIn fontsize = {32} testObj = {{keyName: 'Ivan', keySurname: 'Kozyulka'}}/>
          {/* <button onClick={handleClickJ}> jop Submit to BIG sklad {jop.taskName} </button>
          <button onClick={handleClickJ2}> add elem to temp object  </button> */}
          <br/> 
          <br/> 
       </div>
}

export default Sandbox


