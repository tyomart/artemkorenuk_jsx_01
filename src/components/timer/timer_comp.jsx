
import { useState, useEffect} from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import duration from 'dayjs/plugin/duration';

import "./timer_comp_styles.css"

  dayjs.extend(relativeTime)
  dayjs.extend(duration);

  const Timer = ({ timeToExp }) => {

    // console.log('date in Timer: ', date0)
    let dateIn = (`${dayjs().format('YYYY-MM-DD')}`+timeToExp).toString()
    // const [stateDateExp, setStateDateExp] = useState('')

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
  
    // const date0 = '2023-02-15 20:43'; // change to props date
  
    const getTime = () => {
      const time =  dayjs(dateIn).diff(dayjs())   
  
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    };
  
   useEffect(() => {
    
      const interval = setInterval(() => getTime(dateIn), 1000);
        
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="timer" role="timer">
        <div className="col-4">
          <div className="box">
            <p id="day">{days}</p>
            <span className="text">DD</span>
          </div>
        </div>
        <div className="col-4"> 
          <div className="box">
            <p id="hour">{hours}</p>
            <span className="text">HH</span>
          </div>
        </div>
        <div className="col-4">
          <div className="box">
            {/* <p id="minute">{minutes < 10 ? "0" + minutes : minutes}</p> */}
            <p id="minute">{minutes}</p>
            
          </div>
        </div>
        <div className="col-4">
          <div className="box">
            <p id="second">{seconds}</p>
            <span className="text">Sec</span>
          </div>
        </div>
      </div>
    );
  };

export default Timer



