import { useState, useEffect} from "react";

import './quotamat-style.less'

const log = console.log

const Quotamat = () => {
 
const [n,setN] = useState([])
const [q,setQ] = useState({author:'',quote:''})

const newNum =() => {
  const getRND = (min, max) => Math.floor(Math.random() * (max - min) + min);
  return getRND(0, n.length)
}

useEffect(()=>{ 
  const getgit = async () => {
       try{
    let data =  await fetch ("https://api.github.com/repos/tyomart/test-git-01/git/blobs/954c5aecc79be64c37ce3f02a8e5b06511e28637")
     
    const smthFetched = await  data.json ()
    const parsedQuo = JSON.parse( atob (smthFetched.content)) 
    
    setN(parsedQuo)
    setQ(parsedQuo[newNum()]);
       }  
    catch (error) {
      (console.error('err'))};

      }
  getgit()
},[])   

const newQ = () => {
  const qq = (n !== []) && n[newNum()] 
  return (qq.author !== q.author) ? qq : newQ()
}
  const handleButton = (e) => {
     return setQ(newQ())
  } 
return ( // BIG RETURN 

<>
  { (n.length === 0) 
    ? <p>Loading quotes</p> 
      : q.author 
        ? ( <div id="quote-box"> 
              <div  id="author">{q.author}</div>
              <div id="text">{q.quote}</div> 
              <button id='new-quote' onClick={handleButton}>next one</button>
              <a href={`https://twitter.com/intent/tweet?text=${n.quote} - ${n.author}"`} target="_blank" rel="noopener noreferrer" id="tweet-quote">Tweet</a>

          </div> ) 

          : <p>no quotes</p>
    } 
        <footer><div id='footer'>Quotamat 1.0 by Artem Korenuk for freeCodeCamp certification projects </div></footer>
</>
);
}
export default Quotamat




 

