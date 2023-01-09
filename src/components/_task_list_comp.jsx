import { useState } from "react"


import { tSklad } from "../data/task_data"

import { useReducer } from "react";

const TaskListComp = ({ taskList }) => { 
                                              console.log(typeof taskList);  console.log('taskList', taskList) //get and check 

  const { id, task_name, descr, date_time } = taskList

  // const [stateList, setStateList] = useState(taskList)

  // const updList = () => {setStateList(stateList => ( {...stateList, taskList}))
    
  //   console.log('List', stateList)
  // }
 
  // taskList !== 0 ? updList() : console.log('empty taskList') 


  return  <div className = 'task-list'> 

  <h4>Task List:</h4>  
  
  
  
   {/* WHY ZAPLIST IS NOT ABLE TO UPDATE?? */}
   {/* {stateList && <div>
     
      {stateList.map((obj) =>  
          (<h3 key={obj.task_name}>{obj.id} - {obj.task_name} - {obj.task_descr} - {obj.date_time}</h3>))}  */}
      


    </div> 


 
   
}

export default TaskListComp

// *** idea *** roll down button to add new task
