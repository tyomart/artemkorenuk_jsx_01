
import './markdown-styles.less'
import { useState, useContext, useEffect, useReducer } from 'react'

const log = console.log
const Markdown = () => {


const initialTXT = [
    { tag:'h1',
        cont: 'blablabla'
    }
]

const [edit, setEdit] = useState('')

const [readyTXT, setReadyTXT] = useState('') //finally it is array (JSON)
const [procTXT, setProcTXT] = useState({tag:'',cont:''})

const transForm = (txIn) => {
    log('in', txIn)
if (txIn.substr(0,1) === '#') {   //GET TO REDUCER
    return txIn.replace(/#/m, "<h1>").replace(/\n/m,'</h1>');}
else return txIn
    // cut tag to tag-field, cut content to content-field, send both to procTxt
  
      
    //return txIn //addLinebreaks(txIn)
}

   const handleIn =(e) => {

    setEdit(e.target.value)
    //const inHandled = edit
    setReadyTXT(transForm(edit))

    // const handleOut = inHandled.split('\n')
    // log('inH', handleOut)
     
     log('t-- ', readyTXT)
        return //setProcTXT(handleOut)
    }

const Preview = (props) => {
    const { eDisp }  = props
   
    // PREVIEW RETURN
    return <>
        {eDisp}
        {/* {eDisp.map((val)=><div>{val.typeTag} - {val.contTag}</div>)} */}
    {<div>{procTXT.tag}{procTXT.cont}</div>}
    </>
}


//BIG RETURN
    return <>

        <div id='editor'>editor
        <div id='input-wrapper'>
            <label>
        <textarea id='editor-area' 
            defaultValue={initialTXT.map((val)=>
                {return (val.tag + ' ' + val.cont)}
            )} 
            onChange={handleIn}></textarea>
        </label>
        
        </div>
    
    </div>
    <div id='preview'>

        <Preview eDisp={readyTXT}/>
    </div>
    
    </>
}

export default Markdown;


  // const addLinebreaks = (anyString) => {
    //     return anyString.replaceAll("\n", "<br />!!!\r\n");
    //   };


//array of chars
//if char from tag-table -> insert tag on Display array

//join Display array

