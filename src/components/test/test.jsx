
import './markdown-styles.less'
import { useState, useContext, useEffect,  useLayoutEffect, useReducer } from 'react'
import $ from 'jquery';
import { json } from 'react-router-dom';

const log = console.log
const Markdown = () => {
   const initialPreIn  = `z_c_\n\`\`\`\n[i_g**en]( z\n\`\`\`d! [gg_\n\`\`\`\n<*hi\n\`\`\`\nd![li 12v_*\n> Quota\n other text strings`
    const [preIn, setPreIn] = useState(initialPreIn ) // inputing state
const [edit, setEdit] = useState('') // //what Shows in editor
const [readyTXT, setReadyTXT] = useState('') //Shows Output

let flags  = 
    {   
        inputOn: false,
        h1: true,
        h2: true,
        h3: true,
        h4: true,
        b: true,
        i: true,
        tr:true,
        td: true,
        th: true,
        ul: true,
        ol: true,
        li: true,
        code: true,
        //codeBlock: true,
        cacheSpec:'',
        
        test:false, //test flag
    } 

const breakLines = (txt) => {

    return txt.split('\n')
}
// TO DO makes negative groups for 2 backticks and 3 backticks
const convert = (proTag ) => { //cash, char, j, txtAr

    const tagOpClos = (tag) => { // open/closed tag substitution
        //exclusion cases are expected here
       return !flags[`${tag}`]         //basic case
            ? `<${tag}>` : `</${tag}>`   
    }
   
    // tag cases
    if (proTag === '#' )                     // <h1> ///tag && txtAr[json-1] === '\n'
            {log('# fired')
            flags = {...flags, h1:!(flags.h1)}
            return tagOpClos('h1');
            }
  
    if (proTag === '**')                     // <h1> tag
            {
                flags = {...flags, b:!(flags.b)}
            return tagOpClos('b');
            }
    if (proTag === '_')                     // <h1> tag
            {
                flags = {...flags, i:!(flags.i)}
            return tagOpClos('i');
            }
       
    if (proTag === '\`')                     // <h1> tag
            {
                flags = {...flags, code:!(flags.code)}
            return tagOpClos('code');
            }
    if (proTag === '\`\`\`')                     // <h1> tag
            {
                flags = {...flags, codeBlock:!(flags.codeBlock)}
            return tagOpClos('code'); // replace 'codeBlock' to 'code'
            }

        if (proTag === ' ')                     // <h1> tag
        {            
        return ' '
        }
    }  

const convertEndStr = (txt, type) => {
//   log('convertEnd')
    if (flags.h1===false) {
        flags = {...flags, h1:!(flags.h1)}
        return txt.replace(/$/, '</h1><hr/><br/>\n')
    } 
    
    else return txt.replace(/^/,  '<p>').replace(/$/,'</p>')
} 


const uniReplace = (txt, type) => {
    let regex = '', toTag = ''
    
    switch (type) {
        case 'b': regex = /\*\*/;  toTag = '**';break
        case 'i': regex = /\_/;  toTag = '_';break
        case '\`': regex = /(?<![`\\])`(?!`)/;  toTag = '`';break;
        default: regex = /\`/;  toTag = '';break;
    }

    if (toTag.length === 0) 
        return txt
   
    else {
        if (txt.match(regex)) { //(txt.match(/.*\*\*/))
        
            txt = txt.replace(regex, convert(toTag))
            
        return uniReplace(txt, type)
        }
        else {
            //log('txt else', txt)
            return txt}

    }
    
}
const aTest = `#z_#c_\
                \n
                > quotesfsdf afsdf\n
                aaaaa`

const linkPlaceholdReplace = (txt,type) => {

    let  regex = /(<code>[\s\S]*?<\/code>)/gm ; let stub = '©~<CODE>~©';
       
     
    let matching =  txt.match(regex)
    let storageLink = matching !== null ? matching.reduce((acc,elem)=>{return [...acc, elem]},[]) : []  // collect links
    txt = txt.replace( regex, stub)

    return [txt, storageLink]
}

const linkInverseReplace  = (txt, store, type) =>  { // Invert Links Conversion
    // log('inverse replace', type)
    let regexStub ='©~<CODE>~©';
  

    let regexGlob = new RegExp(regexStub,'g'); let regexNoGlob = new RegExp(regexStub);
    return store.length > 0 
    ?   store.reduce((acc,elem) => {  

            let matchCPR = txt.match(regexGlob) 

                if (matchCPR!==null) 
                    { txt = txt.replace(regexNoGlob, elem);
                            // log('inversed', txt )
                    return acc = txt}
                else return acc = txt
        }, '' ) 
    :txt;} // end of ternary 

const linkInverseReplace0  = (txt, store, type) =>  { // Invert Links Conversion
   
        return store.length > 0 
        ?   store.reduce((acc,elem) => {  
              
                let matchCPR = txt.match(/©~<CODE>~©/g) 
    
                    if (matchCPR!==null) 
                        { txt = txt.replace(/©~<CODE>~©/, elem);
                        return acc = txt}
                    else return acc = txt
            }, '' ) 
        :txt;} // end of ternary 

const convertCodeBlock = (txt) => {
log('txt: ', txt.split(''))
    txt = txt.replace(/\n/gm, '<br/>')
    return txt
}

const makeHtml = (txt,type) => {                // LInk Invert conversion   // 

    let regexToMatch = '';  let regexToHtml=  '';  let  regexToSubstGroups = ""; let codeBlock = 'a';
    switch(type) {
    
        case 'quote': 
            regexToMatch = />\s[\s\S]*?\n/gm
            regexToHtml=   />\s(?<quote>[\s\S]*?)\n/m 
            regexToSubstGroups = `\n<blockquote>| $<quote></blockquote><br/>\n`;
        break;

             }
let matching = txt.match(regexToMatch) ;
 log('matching', matching !== null ? matching[0] : 'NULL')
    if (matching !== null) { 
        txt = txt.replace(regexToHtml, regexToSubstGroups  
        )

    return makeHtml(txt, type)
}
else return txt 
    }


  // process -> ###s -> withBracketsReplace -> etc foos -> return process

  // withBracketsExchange -> linkPlaceholdReplace, imgPlaceholdReplace, -> i-b change -> makeLinks (back) -> makeHtmlLinks -> return txt
const process = (inStr) => {

    const withBracketsReplace  = (str) => {

// -------- // uniReplace block -----------------
 
        str = uniReplace(str,'i')   
        str = uniReplace(str,'`')   
// ----------// // uniReplace block -------------

        // //get back transformed brackets
  
        return str
        } // withBracketsReplace end

       
   inStr = withBracketsReplace(inStr)  // actions and replacing with brackets

    inStr = convertEndStr(inStr);
return inStr // return of process()
}

const bufferPreTxt = (inStr) => { 
    // b-InStr - ``` to <code> // c_InStr hides <code> // other replacing // d_InStr - unhide back <code)

    // let b_InStr = makeHtml(preIn, 'code')
    // let [c_InStr, store] = linkPlaceholdReplace(b_InStr, 'code')

    // c_InStr = breakLines(c_InStr).map(str => process(str)).join('') 
    // let d_InStr =  linkInverseReplace0(c_InStr, store, 'code')
    let e_InStr = makeHtml(inStr, 'quote')
    return  e_InStr
}

const handleIn = (e) => {

    const inputString = e.target.value
    setPreIn(inputString)
    return 
}
// make stubs OOO -> process text -> inverse to HTML
const handleTest = () => { // --------------------------------TEST BUTTON -------------------------------------------------------------------
   
    return log('quote', makeHtml(preIn, 'quote'))
}

useLayoutEffect(()=>{                 //triggering Text Processor and sync editor and ReadyTXT

    if (preIn.length >0) { // to not send empties in state

        
        setEdit(preIn) ; //log('preIn in Fx', preIn)
       
        // setTimeout(5000)
        setReadyTXT(bufferPreTxt(preIn)) // TO DO make code blocks
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

// Components for out ----------------------

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
            <textarea id='editor-area' value ={preIn}  onChange={handleIn}></textarea> 
            {/* onKeyDown ={handleBS} */}
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



{/* <div>Markdown (under construct.)</div> */}


<div> <button onClick ={handleTest}>TEST</button></div>

</>
}

export default Markdown;


