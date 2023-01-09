
const TaskItem = ( {taskItem} ) => { 

  // <div></div>
  const {id, task_name, task_descr, date_time} = taskItem

  return  <div className='task-container' key ={id}>
            <h2 style ={{fontSize:'20pt', color:'#3020aF'}}> <em >Current Task</em></h2>
           <p style ={{fontSize:'20pt', color:'#3020aF'}}>
            <span><b>task #:     {id}            </b></span>
            <span>name: <b>      {task_name}    </b></span>
            <span>to do: <b><em> {task_descr}  </em></b></span>

            <span>time: <b>      {date_time}   </b></span>
          </p> 
          <br/>
           

          </div>
     
}

export default TaskItem


// *** idea ***
// map throw the taskList and choose with flag current

