
import './markdown-styles.less'
import { useState, useContext, useEffect, useReducer } from 'react'
import $ from 'jquery';

const log = console.log
const Markdown = () => {


const initialTXT = [
    { txt: 'print here **bold** sdfsdf as'
    }
]

const [edit, setEdit] = useState('')
// const [edit, dispatch] = useReducer('');
const [readyTXT, setReadyTXT] = useState('') //finally it is array (JSON)
const [proc,setProc] = useState([])
const [h1,setH1] = useState(false)
const [bold,setBold] = useState(false)


useEffect(()=>{   
    let aaa = '<h3>aaa</h3>'
    const $outP = $('#output') 
    const html = $outP.html()
    const newHtml = html + readyTXT
    $outP.html(newHtml)
   return 
},[readyTXT])

const h1_rr = () => {
    setH1(!h1) 
    return (h1 === false) ? '<h1>' : '</h1>' 
} 
const b_rr= () => {
    setBold(!bold) 
    return (bold === false) ? '<b>' : '</b>' 
}

const transForm = (txIn) => {
  
log('intransform',txIn);

    const txtMap = ([...strng]) => { log ('strng', strng)
        
        return strng.map(
        (elem) => {if (elem === '#') return log('#->h1', elem.indexOf())
    })}

if (txIn.length > 0) return txtMap(txIn)
}


const handleIn = (e) => {
    const lastChar = e.target.value.substring(e.target.value.length-1,e.target.value.length)

    //
  const tran = (val, eLength) => { 

    if (val === '#')  {return h1_rr()} else {return val} // make SWITCH function
  }
    
  setEdit([...edit,tran(lastChar,e.target.value.length)]) // add last char to Edit
    
    log('edit', edit)



        return setReadyTXT(edit.join(''))
    }

const Preview = (props) => {
    const { eDisp }  = props
   
    // PREVIEW RETURN
    return <>
       <div id='output'><p>{}</p></div>
    </>
}

//BIG RETURN
    return <>

   
    <div>Markdown (under construct.)</div>
        <div id='editor'>editor
        <div id='input-wrapper'>
        <label>
            <textarea id='editor-area' onChange={handleIn}></textarea>
        </label>
        
        </div>
    
    </div>
    <div id='preview'>

        <Preview eDisp={readyTXT}/>
    </div>
    
    </>
}

export default Markdown;

 

    //if (txIn !== undefined) {txIn.map((elem)=>{ return elem + elem })} else return
        // switch (elem) {

        //     case '#': return h1_rr() ; // return txIn.replace(/#/m, "<h1>").replace(/\n/m ,'</h1>') //(/\n/m || /#/m);
        //     case '*': return b_rr();
        //     default : return txIn
        // }

