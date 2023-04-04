
import './markdown-styles.less'
import { useState, useContext, useEffect, useReducer } from 'react'
import $ from 'jquery';

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

useEffect(()=>{   
    let aaa = '<h3>aaa</h3>'
    const $outP = $('#output') 
    const html = $outP.html()
    const newHtml = html + readyTXT
    $outP.html(newHtml)
   return 
},[readyTXT])

const transForm = (txIn) => {
    log('in', txIn)
if (txIn.substr(0,1) === '#') {   //GET TO REDUCER
    return txIn.replace(/#/m, "<h1>").replace(/\n/m,'</h1>');}
else return txIn
    
}

const handleIn =(e) => {

    setEdit(e.target.value)
      setReadyTXT(transForm(edit))

     log('t-- ', readyTXT)
        return //setProcTXT(handleOut)
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

 

