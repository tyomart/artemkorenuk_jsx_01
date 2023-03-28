import { useState, useEffect} from "react";

import './quotamat-style.less'

// JSON https://firebasestorage.googleapis.com/v0/b/todo-first-73588.appspot.com/o/quotamat-source.json
const log = console.log
const Quotamat = () => {
 
  const initialQ = {author:'', quote:''}  
const [nOn, setNoN] = useState(false)
const [n,setN] = useState([])

//let dat = []
let fetchedData =[]
 useEffect( () => {
  const dat = fetch('https://api.github.com/repos/tyomart/test-git-01/git/blobs/07f7a5705febea3099d45fa67e48fbc8f6a2063c')
      .then(response => response.json())
      .then (responce => JSON.parse (atob (responce.content)))
       .then(data => {return setN(data)})
       .then(console.log('FX fired', n))
       
      .catch(console.log('err'))
      
      
      return (val)=>val
    },[])

    
   

const newNum =(le) => {
  const getRND = (min, max) => Math.floor(Math.random() * (max - min) + min);
  return getRND(0, le)
}

const quotA =  (data) => { //async
  //const data = await dat

  console.log('data in quotA', data)
  const len = data.length
  const newQuo = data[newNum(len)]

  console.log(newQuo,'newQuo')
     return (n.author !== newQuo.author) ? newQuo :  quotA(n)

}

  const handleButton = (e) => {
    
    const {author, quote} = quotA(n)
       return setN({author:author, quote:quote})

  }

  const Display = ( disp_quo ) => {

    const { quo } = disp_quo
    
    return <span>
        {/* {console.log('new_quo',disp_quo)} */}
      { quo && <span> {console.log('new_quo',quo, typeof quo)}
        <div id="quote-txt">{disp_quo.quote} </div>
        <div id="quote-author">{disp_quo.author}</div>
      </span> 
      }
    </span>
  }

return ( // BIG RETURN

    <div id="quote-box"> 
  
      {/* {console.log('out', n[1])} */}
      <Display disp_quo = {n}/>
        <button id='new-quote' onClick={handleButton}>next one</button>
        <br />
        <a href={`https://twitter.com/intent/tweet?text=${n.quote} - ${n.author}"`} target="_blank" rel="noopener noreferrer">Tweet</a>
      <br></br>

    </div>
  );

}
export default Quotamat


//<a href="/wiki/Special:Random" title="Load a random page [alt-shift-x]" accesskey="x"><span>Random page</span></a>

// load random wiki-quotes page, if author === state.author -> load another one, find quote, show quote  



 

