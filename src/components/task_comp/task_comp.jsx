
import Sandbox4 from '../sandbox4.comp';
import Timer from '../timer/timer_comp';
import './task_comp_style.less'

const Task = ({task, onRemove }) => {

  console.log('DATE in Task:', task.timeToExpire)

  const listAuxFoo = (item) => {
    return <span>

     
      {/* MAKE FILTER HERE FOR EMPTY TASK */}
            {Object.keys(item).map((elem) => elem !== 'realTime' && <span> {item[elem]} </span>)}

          </span> 
  }
  return (
    <div className="task">
      <br />
       <Timer dateToExp={task.dateToExp} timeToExp={task.timeToExpire}/> 
      {listAuxFoo(task)}

  
      <button onClick={onRemove}>Remove</button>


      {/* <span> --- <Sandbox4 daty={task.timeToExpire} /> </span> */}
    </div> //end tag
  );
}

export default Task

