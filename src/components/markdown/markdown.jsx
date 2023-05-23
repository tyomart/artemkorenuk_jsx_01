import './markdown-styles.less'
import { useState, useContext, useEffect , useLayoutEffect, useCallback} from 'react'
import $ from 'jquery';

const log = console.log
const Markdown = () => {


const [preIn, setPreIn] = useState('') // inputing state
const [edit, setEdit] = useState('') // //Shows Input
 


const [readyTXT, setReadyTXT] = useState('') //Shows Output
const [cache, setCache] = useState([])
const [bsf,setBSF] = useState(false)


const flagsObj  = 
    {   outputFlag: false,
        
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
//  log('000 flags', flags)

// ---------------------- engine block----

const lastChar = (string0) => {
    if (string0.length>0) {
        return string0.slice(-1)
    }
    else return '©'
}
const prevChar = (string0) => {
    if (string0.length>1) {
        return string0.slice(-2,-1)
    }
    else return '©' //TO FIX
}

 const special = (testedChar) => {
        
        const specialSet = ['*','\\','\`','#','i','[',']', '|']
       return  Boolean(specialSet.reduce((acc,elem) => { return acc=acc+(elem===testedChar)} ,false))
    }

const convert = (proTag) => {

    const tagger = (tag) => { // open/closed tag substitution
        
        //exclusion cases are expected here

        log('outval fired')
       return !flags[`${tag}`]         //basic case
            ? `<${tag}>` : `</${tag}>`   
    }
   
    // tag cases
    if (proTag === '#')                     // <h1> tag
            {log('# fired')
                setFlags({...flags, h1:!(flags.h1)})
            return tagger('h1',0);
            }
    if (proTag === '##')                     // <h1> tag
            {log('# fired')
                setFlags({...flags, h2:!(flags.h2)})
            return tagger('h2',0);
            }
    if (proTag === '###')                     // <h1> tag
            {log('# fired')
                setFlags({...flags, h3:!(flags.h3)})
            return tagger('h3',0);
            }
    if (proTag === '*')                     // <h1> tag
            {setFlags({...flags, b:!(flags.b)})
            return tagger('b',0);
            }
  
    else return proTag
} 

const processorTXT = (inVal, out) => { // MOST HOT ISSUE - from where I have to take value to OUTPUT to  show processed only text 

    log('lastChar in proc:', lastChar(inVal))

    if (bsf === true) {

        setBSF(false)

       // out = processorBS(inVal)
        return [inVal, out.slice(0,-1)] //out
    }

    else if (special(lastChar(inVal))) { // if special, add Last to  Cache and Out

        //log('S')
        setCache(cache.concat(lastChar(inVal)))

        out += lastChar(inVal)  //(readyTXT === undefined|| readyTXT.length === 0)  ? lastChar(inVal) : 
        log('readyTXT', readyTXT, 'caache', cache)
       
        // let outVal = readyTXT
            return [inVal, out]
    }
    else if 
      
        (special(prevChar(inVal)) === false) { // if common, and previous is common -> out /// special(lastChar(inVal)) === false && 
           //log('0-0')
           
        out += lastChar(inVal) //(readyTXT === undefined|| readyTXT.length === 0)  ? lastChar(inVal) : 
        
        
        
            
            return  [inVal, out]
        }
        else { // (special(prevChar(inVal)) === true)
            //log('1-0')
           
                let tagLen = cache.length;
                let outVal = '';
                let beforeTag = out.slice(out.length-(tagLen+3),-(tagLen+2))
                let joinedCache = Object.values(cache).map((m) => m).join('')
                
                let part0 = out.slice(0,-(tagLen))
                let convertedTag = convert( joinedCache, beforeTag) //call Convert
                
                let partLast = lastChar(inVal)

               out = part0.concat(convertedTag).concat(partLast) // invalNoTag + Tag + lastChar
               
            setCache('')

            
            return [inVal, out]
        }
    
    }

const processorBS = (inBS,flag) => { /// MAKE THIS
    let tagBS
    let tagBSLength

    const newSpecial = (oldVal, specChar) => {

        const findSpecial = () => {
             
            return 
        }

        return
    }

    if (special(lastChar(inBS))===true) {

        if (special(prevChar(inBS)) === true && 
                (lastChar(inBS) !== prevChar(inBS)))
                {
        return processorBS(inBS, lastChar(inBS)) // no affecting on flags
        }

        else if (special(prevChar(inBS)) === true && 
                    (lastChar(inBS) === prevChar(inBS)))
            {
                
                return processorBS(inBS, newSpecial(inBS))
            }

        else return inBS.slice(0,-1) // no TAG founded

        // 
        // reFlagged(in)
    }
    else

    return log('processor BS')
}

const handleIn = (e) => {

    //log('001 flags', flags)
   
    const inputString = e.target.value
    setPreIn(inputString)

    return 
  
}

const handleBS =(e) => {
    
if (e.key === 'Backspace' && preIn.length >0) {

    log('BACKSPACE')
    setBSF(true)
    //  setEdit(edit.slice(0,-1))
    //  setReadyTXT(readyTXT.slice(0,-1))
    
    
} return 

    
}

useLayoutEffect(()=>{                 //parser HTML, uses 'output' id in <div> at Display /// I use it to sync editor and ReadyTXT
     //log('preIn in Effect',preIn)


    const processedTXT = processorTXT(preIn, readyTXT) 
    
    //const processedBS = 
    

   if (preIn.length >0) { // to not send empties in state


        setEdit(preIn)

        setReadyTXT(processedTXT[1])

}
  else {log('empties')}
},[preIn])

useLayoutEffect(()=>{                 //parser HTML, uses 'output' id in <div> at Display
   
    const $outP = $('#output') 
    const html = $outP.html()
    const newHtml = html + readyTXT
    $outP.html(newHtml)
   return 
},[readyTXT])


const handleTest = () => {
    let cca = '789'
    //const aTest = {0:'#',1:'#',2:'*', 3:'##'}
    const aTest = '0123456789'
   
log('test:',aTest.slice(-2,-1))
   
    return 
}

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

//BIG RETURN before OUTPUT ---------------------------------
    return <> 

    <div>Markdown (under construct.)</div>
        <div id='editor'>editor
        <div id='input-wrapper'>
        <label>
            <textarea id='editor-area' onKeyDown ={handleBS} onChange={handleIn}></textarea>
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

// const processorTXT0 = (inVal, out) => { /// sequentually change proc0 to proc foo and fix the error
//         if (special(lastChar(inVal))) { //if (lastChar(inVal) === '#') {

//         // out += lastChar(inVal)
//         // log('s')
//         // log('out', out)
        
//         log('S')
//         setCache(cache.concat(lastChar(inVal)))

//         out += lastChar(inVal) //(readyTXT === undefined|| readyTXT.length === 0)  ? lastChar(inVal) : 
//         log('readyTXT', readyTXT, 'caache', cache)
       
//         // let outVal = readyTXT
//             return [inVal, out]
//     }

    
//     else if (prevChar(inVal) !== '#' ) {

//         out += lastChar(inVal)
//     log('0-0')
//     log('out', out)
//     return [inVal,out]
//     }
//     else {

//         //out += lastChar(inVal)
//        log('1-0')
//         log('out', out)
        
//         const changedOut = out.length ?  out.slice(0,-1).concat('<#>').concat(lastChar(inVal)) : lastChar(inVal)
//         //log('lastChar', out.slice(-2,-1) )
//         return [inVal,changedOut] //
//     }
// } 


// else {
//    log('1-0')
//     log('out', out)
//     const changedOut = out.slice(-2,-1).concat('<#>').lastChar(inVal)
//     log('lastChar', out.slice(-2,-1) )

//return [inVal,changedOut]
    //log('procTest:', [inVal,changedTXT])


// BACKSPACE handle

//INSERT INSIDE TEXT - find place in EDIT and insert
// if edit changed more than 1 char use Insert Foo -> find new text
//, process char by char through Processor: part before insertion, and part after to USE PROPER FLAGS

//for INSERT FOO - use varaible to cut the end of Edit after cursor position
