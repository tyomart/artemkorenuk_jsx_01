import { useState, useReducer } from "react";

import './taskList_style.less'

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"
import relativeTime from "dayjs/plugin/relativeTime"
import duration from 'dayjs/plugin/duration';

import Timer from "../timer/timer_comp";
import Task from "../task_comp/task_comp";
// import Sandbox4 from "../sandbox4.comp";

const TaskListComp = () => {
  dayjs.extend(customParseFormat)
  dayjs.extend(relativeTime)
  dayjs.extend(duration);

const reducer = (state, action) =>  {
  switch (action.type) {
    case "add":
      return [...state, action.item]

    case "remove":
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];

      case "update":
      return;

    default:
      throw new Error();
  }
}

const realTimeToAdd = () =>   dayjs().get('hour').toString() +'-' 
       + dayjs().get('minute').toString() +'-' 
      + dayjs().get('second').toString() +'-' 
      + dayjs().get('millisecond').toString()

//  console.log('dayJS obj', dayjs())


const TaskList = () => {
  
    const [tasks, dispatch] = useReducer(reducer, [{ 
      realTime: null,    name: '', 
      }]); // clean initial values and line
  
    const [newTask, setNewTask] = useState({}); // useState
  
    const handleAddClick = () => {
  
      if (newTask.name === "" || newTask.descr === "") {
        return;
      }
        dispatch({ type: "add", item: newTask });
                console.log('newTask obj', newTask) // chck newTask obj
 
      setNewTask ({...newTask, timeToExpire:'', dateToExpire:'',   name: '',  }); // clear input fields
      };
  
    const handleChange = (event) => {
        setNewTask({...newTask,['realTime']:realTimeToAdd(), [event.target.name]:event.target.value} );
    }

    //helpers
    // const getName = (checkElem) => {console.log('checkElem ',checkElem); return checkElem}
 
    return (
      <div>
        <div className="tasks-in-list">
         
          {tasks.map((task, index) => {
            return (
              <Task 
                task={task}
                onRemove={() => dispatch({ type: "remove", index })}
              />
              );
          })}
        </div>
        <div className="add-task">

          <input type='date' value={newTask.dateToExpire} min={dayjs().format('YYYY-MM-DD')}  name='dateToExpire' 
              onChange={handleChange}/>
          <input type='time' value={newTask.timeToExpire} min={dayjs().format('HH:mm')}  name='timeToExpire' 
              onChange={handleChange}/>

          <input name='name' value ={newTask.name} onChange={handleChange} placeholder="name" />
            
          <button onClick={handleAddClick}>Add movie</button>
        </div>
      </div>
    );
  }


  return (
    <div className="task-list">
      <h2>Task List</h2>

      <TaskList />
    </div>
  );

}

export default TaskListComp

// TASK:: done(checkbx) - TimeExpireTo - relTimeToExpire - name -  files list


// use Data as object to tweak, trigger alerts and ID for task

// ID: HHMMss (=> reduce all values in objects)

//use in tasks and tweak: HH:MM

// [ {date {HHx,MMx,HH,MM, ID} }, {name, descr}, {file_links} ]

//get myTime obj - { HH, mm, s, m_HH: null, m_MM: null, m_s: null}

    // setMyTime = {...myTime, m_HH, m_MM, m_s}

//if Done clicked -> remove task

    // setTime -> handle HH MM from input, s from dayjs -> setMyTime

//edit task time -> handle Edit time butt -> setTime

//relTimeToExpire -> dayjs(m_HH:m_MM).relativeTime toNow

// checkExpireTime (async) -> alert if relTimeToExpire < 5 (10,15,30 min)


// file bind: getFilename -> upload to Firestore -> getLink -> add filename to fileList 
// file remove: remove from fileList -> remove from Firestore 

// signin - signup





// const showTimer = () => {
//   const difDateToNow = (date)  => dayjs(date).diff(dayjs())

//   const showCountDown = () => setInterval(difDateToNow('2023-02-16'),10)
  
//   return <div> {console.log('now: ', showCountDown())}
//             <h3> timer: {}</h3>
                
//         </div>
// }





 

