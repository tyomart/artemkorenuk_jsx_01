
import './markdown-styles.less'
import { useState, useContext, useEffect , useLayoutEffect} from 'react'
import $ from 'jquery';

const log = console.log
const Markdown = () => {


const [edit, setEdit] = useState('') // CHECK edit are added by 1 char, if more USE insertion processing, and for initial text, as well 
 
//const [edCache, setEdCache] = useState('')

const [readyTXT, setReadyTXT] = useState('') //finally it is array (JSON)


const flagsObj  = 
    { 
        h1: false,
        h2: false,
        h3: false,
        b: false,
        i: false,
        code: false,
        code3: false,
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
 
    let tmpStr = 'aaa<h1>'

    let outVal = inVal;
    let charLen = 1; let tagLen = 4; let codeTag = 6;
    let cacheStr = '';

    const lastChar = (inString) => inString.substring(inString.length-1)
    const cutEdit = edit.substring(edit.length-charLen)
    const cutEditTag = readyTXT.substring(readyTXT.length-tagLen)
    const currentChar = lastChar(inVal); 
    //log('currentChar',currentChar)
   // const lastTag_inVal = inVal.substring(inVal.length-tagLen)

//    log('cutEdit', cutEdit) ; log('inVal', currentChar)
//    log('state::',  '\n', 'edit', edit, '\n', 'readyTXT', readyTXT)

    const outVal_Foo = (tag, aCondition) => { //tag, adding condition - depends how many chars have to slice from end of inVal string
        
        // log('cutEditTag_outVal' ,cutEditTag, '-e', edit )
        // log('aCondition', aCondition)
        if (tag ==='code3') // CHECK LATER -- this exception may cause <code><code> issue
        {   log('find CODE3')
            return  !flags.code3 
            ? readyTXT.slice(0, readyTXT.length - aCondition).concat(`<code>`) 
                : readyTXT.slice(0, readyTXT.length - aCondition).concat(`</code>`) 
        }
        else 
        return  !flags[`${tag}`] 
            ? readyTXT.slice(0, readyTXT.length - aCondition).concat(`<${tag}>`) 
                : readyTXT.slice(0, readyTXT.length - aCondition).concat(`</${tag}>`)   
    }

    if (currentChar === '*' && cutEdit === '*')      // <b> tag
        {        
        setFlags({...flags, b:!(flags.b)});    
        return outVal_Foo('b', charLen)
        }
    else if (currentChar === 'i' && cutEdit === '\\')      // <b> tag
        {        
        setFlags({...flags, i:!(flags.i)});    
        return outVal_Foo('i', charLen)
        }
    else if (currentChar === '\n' )      // <b> tag
        {        
        //setFlags({...flags, i:!(flags.i)}); 
        //log('NEW LINE')   
        return outVal_Foo('br/', 0)
        }
    
        //FIX --  2 backtiks don't be parsed as tags

    else if (currentChar === '`' && edit.length === 2)      // TRIPLE ``` at start 
        
        {   //log('Check 1st chunk of line', edit.slice(-3))
            log('1` at start FIRED')
            setFlags({...flags, code3:!(flags.code3)});  //  
            return outVal_Foo('code3', 2)
        }
    else if (currentChar === '`' && readyTXT.slice(-7)==='<br/>``')      // TRIPLE ```
        if (flags.code === true) 
        {  //log('Check 1st chunk of line', edit.slice(-3))
            log('THREE bactick FIRED for closing')
            setFlags({...flags, code3:!(flags.code3)});  //  
            return outVal_Foo('code3', 2)
        }
        else { log('THREE bactick FIRED')
             setFlags({...flags, code3:!(flags.code3)});  //  
            return outVal_Foo('code3', 2)
        }

    else if (currentChar === '`')      // <code> tag && flags.code = true
       if(edit.length === 0) 
        { log('first char at string is BACTICK')      
        setFlags({...flags, code:!(flags.code)});    
        return outVal_Foo('code',0)
        }
      else if(currentChar === '`' && edit.slice(-1) === '`') 
        { log('return to plain text after 2 BT', edit)      
        setFlags({...flags, code:!(flags.code)});    
        return setEdit(edit.slice(0,charLen),'`' )
        }
        // else {
        //     setFlags({...flags, code:!(flags.code)}); 
        //     log('last ELSE FIRED')   
        //     return outVal_Foo('code', codeTag+2)
        // }

    else if (currentChar === '#'  && cutEditTag === '<h2>')  // <h3> tag  
            {
            setFlags({...flags, h3:!(flags.h3), h2:false, h1:false})
            return outVal_Foo('h3', tagLen);
            }

    else if (currentChar === '#'  && (cutEditTag === '<h1>' || cutEditTag === '</h1>'))  // <h2> tag
            
            {  let tempH2flag = flags.h2
            setFlags({...flags, h2:!(flags.h2), h1:false}) // have to reset previous header flags to be able add closing current tag, as </h2>
            return  outVal_Foo('h2', tagLen); 
            }

     else if (currentChar === '#')                     // <h1> tag
            {setFlags({...flags, h1:!(flags.h1)})
            return outVal_Foo('h1',0);
            }
     
    else outVal = readyTXT.concat(currentChar)  //default ELSE adding lastCHar
        
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

const handleTest = () => {

    const aTest = '0123456789\n``'

    return log('edit Length:',aTest.length, ' ', aTest.slice(-3))//log('Substring',aTest.substring(0, aTest.length-6))
}

// BACKSPACE handle

//INSERT INSIDE TEXT - find place in EDIT and insert
// if edit changed more than 1 char use Insert Foo -> find new text
//, process char by char through Processor: part before insertion, and part after to USE PROPER FLAGS

//for INSERT FOO - use varaible to cut the end of Edit after cursor position

const HtmlView = (props) => {  //const { eDisp }  = props
  
    // HTML RETURN
    return <>
       <div id='html_view'><p>{readyTXT}</p></div> 
    </>
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
    <div id='html-view-area'> <div id='html-area-header'>HTML</div> <br/>
        <HtmlView htmlDisp = {readyTXT}></HtmlView>

    </div>
    <br></br>
    <div id='preview'>
       
 
        <Preview eDisp={readyTXT}/> 
    </div>

    <div> <button onClick ={handleTest}>TEST</button></div>

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

//  const handleTest = () => {

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
