import { React } from 'react'


// import relativeTime from "dayjs/plugin/relativeTime";
// import calendar from "dayjs/plugin/calendar";
import toArray from "dayjs/plugin/toArray"
import dayjs from "dayjs";

// dayjs.extend(relativeTime);
// dayjs.extend(calendar);
dayjs.extend(toArray)

// let dateVar= dayjs().format("MMMM YYYY, dddd")

// let timeVar = dayjs().format("HH : MM")

let timeIdStamp = dayjs().toArray().join('')

console.log ('timeId ', timeIdStamp)

const DateComp = (props) => (

<div className='theDate' id='date_div'> 
    <h3>Current date/time:</h3>
    {/* <div id ='cur_date'>{dateVar}</div>
    <div id ='cur_time'>{timeVar}</div> */}
    <div id ='cur_time'>{timeIdStamp}</div>

</div>

)

export default DateComp;