import './markdown-styles.less'
import { useState, useContext, useEffect , useLayoutEffect, useCallback} from 'react'
import $ from 'jquery';

const log = console.log
const Markdown = () => {


const [preIn, setPreIn] = useState('') // inputing state
//const [preInLen, setPreInLen] = useState(0) // inputing state
const [edit, setEdit] = useState('') // //Shows Input
const [readyTXT, setReadyTXT] = useState('') //Shows Output
 
const [charBS, setCharBS] = useState('') // deleted char, BS flag 
const [charBSflag, setCharBSflag] = useState(false) // deleted char, BS flag 


const [cache, setCache] = useState([])
//const [bsf,setBSF] = useState(false)



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

const getTag = (curChar) => {
       switch (curChar) {
        case '#': return flagsObj.h1 === true ? '<h1>' : '</h1>'
       }
    //return tag
}

const processorTXT = (inVal, out) => { // MOST HOT ISSUE - from where I have to take value to OUTPUT to  show processed only text 

    log('procTXT fired')
    
    if (special(lastChar(inVal))) { // if special, add Last to  Cache and Out

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

const processorBS = (inVal,char) => { /// MAKE THIS

    log('proc BS fired')
    //
   
    const tagCut = () => {
            
        switch (char) {
        case '#' : return 4
        case '*' : return 3
    }

    return 
}
    const newDefaultBSEdit = ()=> edit.slice(0,-1)
    const newDefaultBSReadyTXT =()=> readyTXT.slice(0,-1)
   
    if (special(char) === true) {       // special BS
        log('BS special')

        // defineTag (char) 
        return  [newDefaultBSEdit(), readyTXT.slice(0,-tagCut(char)) ]  
    }
    
        
    /// HOW TO CHECK OPEN-CLOSED tag - if '<' is not slice(-4?) then TAG is ClosingTag 
    /// ? if deleting tag then change tagFlag due to OPEN or Closing tag to delete

    
    else {  // default BS
        setCharBS(''); setCharBSflag(false)
    return [newDefaultBSEdit(), newDefaultBSReadyTXT() ]        
    }

    
}


const handleIn = (e) => {
   
    const inputString = e.target.value
    setPreIn(inputString)

    return 
}

const handleBS =(e) => {
    
if (e.key === 'Backspace' && preIn.length >0) {
e.preventDefault()

    let BSedCurrChar = preIn.slice(-1)

     log('BS pressed, ?char = ', BSedCurrChar)

        setCharBS(BSedCurrChar) // BSed character we analyze for proper BS
        setCharBSflag(true) // flag BS to decide which Processor to use

      setPreIn(preIn.slice(0,-1)) // delete char in preIn

} return 

    
}

useLayoutEffect(()=>{                 //triggering Text Processor and sync editor and ReadyTXT

    if (preIn.length >0) { // to not send empties in state

    if (charBSflag === true) {
        log('we proc BS', charBS)
        setEdit(preIn)
        setReadyTXT(processorBS(preIn, charBS)[1])
    }
    

   else {

    log('add Char', preIn)
        setEdit(preIn)

        setReadyTXT(processorTXT(preIn, readyTXT)[1])
    }

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
            <textarea id='editor-area' value ={preIn} onKeyDown ={handleBS} onChange={handleIn}></textarea>
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


