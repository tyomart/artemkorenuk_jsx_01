
import './markdown-styles.less'
import { useState, useContext, useEffect , useLayoutEffect} from 'react'
import $ from 'jquery';

const log = console.log
const Markdown = () => {


const [edit, setEdit] = useState('')
//const [edCache, setEdCache] = useState('')

const [readyTXT, setReadyTXT] = useState('') //finally it is array (JSON)


const flagsObj  = 
    { 
        h1: false,
        h2: false,
        b: false,
        //set neg_H1(val) { this.f_h1 = !val}, 
        
       
    } 
const [flags, setFlags] = useState( flagsObj )

useLayoutEffect(()=>{                 //parser HTML, uses 'output' id in <div> at Display
   
    const $outP = $('#output') 
    const html = $outP.html()
    const newHtml = html + readyTXT
    $outP.html(newHtml)
   return 
},[readyTXT])


const proc = (inVal) => {
    let outVal = inVal;
    
    let tmpStr = 'aaa<h1>'

    charLen = -1; tagLen = -4
    const lastChar = (inString) = inString.substring(inString.length-1)
    
    const cutEdit = edit.substring(edit.length-charLen)
    const cutEditTag = edit.substring(edit.length-4)
    const cutEditTag0 = tmpStr.substring(tmpStr.length-4)
    //const cutEditCTag = edit.substring(edit.length-5)
    const lastChar_inVal = lastChar(inVal);
    const lastTag_inVal = inVal.substring(inVal.length-tagLen)

   //log('cutEdit', cutEdit) ; log('inVal', lastChar_inVal)
   // log('state::',  '\n', 'edit', edit, '\n', 'readyTXT', readyTXT)

    // h1:true ; h2: false

    const outVal_Foo = (tag, aCondition) => { //tag, adding condition - depends how many chars have to slice from end of inVal string
        log('outValFoo cutEdit', cutEditTag)
        return  !flags[`${tag}`] 
            ? readyTXT.slice(0,readyTXT.length+aCondition).concat(`<${tag}>`) 
                : readyTXT.slice(0,readyTXT.length+aCondition).concat(`</${tag}>`)   
    }


    if (lastChar_inVal === '*' && cutEdit === '*' )      // <b> tag
        {              
        setFlags({...flags, b:!(flags.b)});       
        outVal_Foo('b', charLen)
        }

  
    else if (lastChar_inVal === '#'  && cutEditTag === '<h1>')  // <h2> tag  == need to check how many # in the end of string
            {
            log('cutEditTag' ,cutEditTag, '-e', edit )    
            log('cutEditTag0' ,cutEditTag0 )    
            setFlags({...flags, h2:!(flags.h2)})
            outVal_Foo('h2', tagLen);
            }
     else if (lastChar_inVal === '#')                     // <h1> tag
            {setFlags({...flags, h1:!(flags.h1)})
            outVal_Foo('h1',0);
            }
     
    else outVal = readyTXT.concat(lastChar_inVal)  //default ELSE adding lastCHar
        
   // log('outVal::', outVal)

    return outVal
} 
const handleIn = (e) => {

    const inputString = e.target.value

    setEdit(inputString)

    const proceedTxt = proc(inputString)
    setReadyTXT(proceedTxt)
    return 
    }


const Preview = (props) => {  //const { eDisp }  = props
  
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

    {/* <div> <button onClick ={handleTest}>TEST</button></div> */}

    </>
}

export default Markdown;


// const checkLastChars = (inString, markChar) => {
            
//     const checkLast = (stringForCheck) => {
//         let counter = 0;
//         if (stringForCheck.length > 0 && lastChar(stringForCheck) === markChar) {
//             counter = counter++
//         return checkLast(stringForCheck.slice(-1)) 
//         }
//         else return counter;
//     }
//     return checkLast(inString)
// }

 

// const handleTest = () => {

//     const aTest = 'sdsdf** *sd*sfa * sdf ** sdfsdf** sdfsdf sdfsgf#'

//     return log('pre0',)
// }


 // ---------- working part for entire entered txt

 // const tagsYN =(tag)=> {

//     const  flagSet = () => {
//             log('h1:', flagsObj.h1)
    
//         let newFH1 = !flagsObj.h1
//         flagsObj.h1 = newFH1
//             log('h1:', flagsObj.h1)
//         return setFlags({...flags, flagsObj});
//     }
// flagSet();

//     return flagsObj.h1 === true ? `<${tag}>` : `</${tag}>`
// }
// const tagsYM =(tag)=> {

//     const  flagSet = () => {
//             log('b:', flagsObj.b)
    
//         let newFB = !flagsObj.b
//         flagsObj.b = newFB
//             log('b:', flagsObj.b)
//         return setFlags({...flags, flagsObj});
//     }
// flagSet();

//     return flagsObj.b === true ? `<${tag}>` : `</${tag}>`
// }


// const redur = () =>edit.split('').reduce((acc,elem,n) => {
  
//     switch(elem) {
        
//         case '#': return acc+ tagsYN('h1');
//         case '*': return acc + tagsYM('b')
//         default: return acc+elem}}
        
//         ,[]) 

// useLayoutEffect((el)=> {
//     const redurRes = redur()
//     log('FX!', redurRes)
//     setReadyTXT(redurRes)
// }

// , [edit])  
