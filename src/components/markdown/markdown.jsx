import './markdown-styles.less'
import { useState, useContext, useEffect , useLayoutEffect, useCallback} from 'react'
import $ from 'jquery';

const log = console.log
const Markdown = () => {


const [preIn, setPreIn] = useState('') // inputing state
const [edit, setEdit] = useState('') // //what Shows in editor
const [readyTXT, setReadyTXT] = useState('') //Shows Output
 
const [charBS, setCharBS] = useState('') // deleted char, BS flag 
const [charBSflag, setCharBSflag] = useState(false) // deleted char, BS flag 

const [cache, setCache] = useState([])




const flagsObj  = 
    {   outputFlag: false,
        
        h1: false,
        h2: false,
        h3: false,
        b: false,
        i: false,
        code: false,
        code3: false,
        
        test:false, //test flag
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

       // log('outval fired')
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
            {log('## fired')
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

const processorBS = (inVal,char) => { 
  
    const tagCut = () => { //numbers of chars to cut depends of tag
            
        switch (char) {

        case '###' : return 4
        case '##' : return 4
        case '#' : return 4
        case '*' : return 3
    }

    return 
}
    const tag = () => { //numbers of chars to cut depends of tag
            
        switch (char) {

        case '###' : return '<h3>'
        case '##' : return '<h2>'
        case '#' : return '<h1>'
        case '*' : return '<b>'
    }
      //return 
}

    if (special(char) === true) {       // special BS // char = lastChar(preIn)
        log('BS special')

        let specCounter = ''
        const findEndSpecs = (txt,ch) => { //      define Tag length and number of same specs
            const lastChar = txt.slice(-1) 
            
            if (txt.length > 0) {
    
                if (lastChar === ch) {
                    specCounter.concat(ch)
                    return findEndSpecs(txt.slice(0,-1), ch)
                }
                else {
                   //log('specCounter', specCounter)   
                    return specCounter
                }
            }
    
        return specCounter
       }

       // const tagOpClos = (ch) => readyTXT.slice(-(tagCut(ch)),-(tagCut(ch)-1)) // get char on place of '/' in closing tag
       // let tagToCut = tagCut(findEndSpecs(char))
       let remaindTag = tag(findEndSpecs(inVal.slice(0,-1),char))
       let tagToCut = tag(remaindTag).length;

       // check for open-close tag to cut
       log('newtag', remaindTag, 'tagToCut', tagToCut)
       setCharBS(''); setCharBSflag(false)
       return [remaindTag,tagToCut]// what to add if multiole specs, what to cut


        } //  end of 'special char = true'

    else {  // default BS
        log('defualt BS')
        setCharBS(''); setCharBSflag(false)
    return ['', 1]  // .slice(-1) in states      
    }



       // how procBS works -> 
       // if currChar is special
            // find whole tag - curr spec char - findEndSpecs
             // find open or closed the tag
            // return [what delete in preIn and Edit, what delete from readyTXT]
        // if not special just cut 1 char
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

const handleTest = () => {

    let specCounter = ''
    const findEndSpecs = (txt,ch) => { //WHY it finds for  one char less than occurs 
        const lastChar = txt.slice(-1) 
        
        if (txt.length > 0) {

            if (lastChar === ch) {
                specCounter  = specCounter.concat(ch)
                return findEndSpecs(txt.slice(0,-1), ch)
            }
            else {
                log('specCounter', specCounter)   
                return specCounter
            }
        }

    return specCounter
   }
   
    let cca = '789'
    //const aTest = {0:'#',1:'#',2:'*', 3:'##'}
    const aTest = '0123456789</b>#'
   
   log('specs' , findEndSpecs(aTest, '#'))
   
   setFlags({...flags, test: !flags.test})
    return 
}

useLayoutEffect(() => { // TEST layout FX

    setPreIn (preIn.slice(0,-2))
    setEdit (edit.slice(0,-2))

    log('tested preIn', preIn, 'edit', edit)
    return
},[flags.test])

useLayoutEffect(()=>{                 //triggering Text Processor and sync editor and ReadyTXT

    if (preIn.length >0) { // to not send empties in state

    if (charBSflag === true) {
        log('we proc BS', charBS)
        let proceedBStxt = processorBS(preIn, charBS)
        log('FX', proceedBStxt[0],'cut',proceedBStxt[1])
        setReadyTXT(readyTXT.slice(0,-proceedBStxt[1]).concat(proceedBStxt[0])) // slice tag, add remainder if multiple specs
       
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

//TO DO 
// a) NOW -- use converter to change remained spec and tag in inpur and ready
// b) MAKE IT LATER USING Handle foo not FX. find a way to not chage preIn after BS whole tag in preIn, edit and ready

//----------------------

// BUG list 

// 1) if special BS then after adding characters to textarea immediatly after BS readyTXT makes empty and nothing in output occures
// makes to BS characters when adding new chars instead of normal input
// sometimes BS add lastChar of preIn to readyTXT
// 1) answer - bcause preIn changes and FX call to procTXT to add lastChar


// THOUGHTS how to --------------

//BS multiple specials belongs to current tag
        // var A ) if special(prevChar(preIn)) -> find prev(prevChar) until is not the same and not special
        // BS char, change special chars on txt and add same txt chars to readyTXT
        
        // then have to solve how to convert special



////////// trash ----------------


// const getTag = (curChar) => {
//        switch (curChar) {
//         case '#': return flagsObj.h1 === true ? '<h1>' : '</h1>'
//        }
//     //return tag
// }
// OPENCLOSE BS
// if (tagOpClos(char) === '/') { // decide how many chars BS for closed-open tags
//     setFlags({...flags,h1:true}) // !! SOLVE H1 hardcoded issue to any tag 
//   //log('closing / detected') //log('after CLOSING Spec BS', readyTXT.slice(0,-(tagToCut+1)), 'flag h1', flags.h1 ) 
    
//         return [inVal.slice(0,-tagToCut), readyTXT.slice(0,-(tagToCut+1)) ]  // return BS for </tag>
// } 
// else { 
//     setFlags({...flags,h1:false})
//     return [inVal.slice(0,-tagToCut) , readyTXT.slice(0,-tagToCut) ]  //  return BS for open <tag>
// }

