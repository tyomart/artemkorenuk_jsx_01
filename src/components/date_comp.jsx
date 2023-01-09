import { React } from 'react'

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";

dayjs.extend(relativeTime);
dayjs.extend(calendar);

let dateVar= dayjs()
    
    .format("MMMM YYYY, dddd")

let timeVar = dayjs()
    
.format("HH : MM")

const DateComp = (props) => (

<div className='theDate' id='date_div'> 
    <h3>Current date/time:</h3>
    <div id ='cur_date'>{dateVar}</div>
    <div id ='cur_time'>{timeVar}</div>

</div>

)

export default DateComp;