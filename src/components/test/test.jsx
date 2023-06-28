
// import './test-styles.scss'
import { useState, useContext, useEffect,  useLayoutEffect, useReducer } from 'react'
import $ from 'jquery';
import { json } from 'react-router-dom';

const log = console.log
const Markdown = () => {
   const initialPreIn  = `#z_#c_\n- List abcd \n- list 2 bbbb\n\n 12v_**`
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
// const aTest = `#z_#c_\n\n> Quote abcd \n---\n\`\`\`\n**[i_g](hr**h##_i\n\`\`\`\nd![lik](h**x.ru) 12v_**`
const aTest = `#z_#c_\n- List abcd \n- list 2 bbbb\n\n 12v_**`

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
// log('txt: ', txt.split(''))
    txt = txt.replace(/\n/gm, '<br/>')

    // log('replaced TXT', txt)
    return txt
}


const makeHtml = (txt,type) => {                // LInk Invert conversion   // 
    // log('txt\n', txt.split(''))
    const convertCodeBlock = (codeBlock) => {
    
        codeBlock = codeBlock.replace(/\n/gm, '<br/>')
        return codeBlock
    }

    const convertUList = (ulist) => { log('uList\n', ulist.split('') )
       ulist = ulist !== undefined ? ulist.replace(/^/m,'<li>').replace(/$/m,'</li>\n') : 'QQQQ' //replace(/^\s*?\-\s?([\s\S]*?)$/, ``) //$<li>$1</li> //replace(/^/m,'<li>').replace(/$/m,'</li>\n')
        
    //    log('final ulist', ulist)
       return ulist
    }
    let regexToMatch = '';  let regexToHtml=  '';  let  regexToSubstGroups = ""; 

    switch(type) {          // types reducer
        case 'link': 
            regexToMatch =  /\[(.*?)\]\((.*?)\)/; 
            regexToHtml =   /\[(?<link>[^\]]+)\]\((?<url>[^)]+)\)/  ;
            regexToSubstGroups = `<a href="$<url>">$<link></a>`;
            break;
        case 'img': 
            regexToMatch = /\!\[(.*?)\]\((.*?)\)/ 
            regexToHtml=   /\!\[(?<alt>[^\]]+)\]\((?<url>[^)]+)\)/   
            regexToSubstGroups = `<img src="$<url>" alt="$<alt>"/>`;
            break;
        case 'code': 
            regexToMatch = /\n```\n[\s\S]*?\n```\n/gm
            regexToHtml=   /\n```\n(?<codeRGX>[\s\S]*?)\n```\n/gm 
            regexToSubstGroups = `<code>$<codeRGX></code>`;
            break;
        case 'quote': 
            regexToMatch = /\n>\s[\s\S]*?\n/gm
            regexToHtml=   />\s(?<quote>[\s\S]*?)\n/m 
            regexToSubstGroups = `<blockquote>| $<quote></blockquote><br/>`;
        break;
        case 'list': 
            regexToMatch = /^\s*?\-([\s\S]*?)\n\n/gm
            regexToHtml=   /^\s*?\-(?<ult>[\s\S]*?)\n\n/m
            regexToSubstGroups = `<ul>$<ult>--EMRGENCY cASE xxx </ul><br/>`; // not useful because of matching[0]
        break;
 
    }
   
    const convertList = (txt) => {
        log('theList \n', txt.split(''))
        return txt.replace(/^\s*?\-(?<listTXT>[\s\S]*?)\n/gm, `<li>$<listTXT></li>`)
    }
    const replaceToHtml = (type,theList) => {  // TO DO - make right replacing to one <ul> instead of several
        switch (type) { // use matching[0] as matching to convert inside block
            case 'code': return `\n<code>` + convertCodeBlock(matching[0].replace(/\n```\n/gm,'')) + `</code>\n`;
            case 'list': return `\n<ul>${theList}</ul>\n`; //${convertUList(theList)} // convertList(theList)
            default:  return regexToSubstGroups;
        }
    }
    let matching = txt.match(regexToMatch) ;
    if (matching !== null) { //log('match finding', matching[0])
        txt = txt.replace(regexToHtml, replaceToHtml(type, matching[0])) // matching[0] if exist -> theList in replaceToHtml
 

    return makeHtml(txt, type)
}
else return txt 
    }

const handleTest = () => { // --------------------------------TEST BUTTON -------------------------------------------------------------------
   
    const bTest = `##z_#c_\n- List abcd \n###list 2 bbbb\n\n 12v_**`
    const headerReplace = (txt) => {
        return txt = txt.replace(/(?:^|\n)(?!##[^\n]*\n)#\s(?<hd1Gr>[^\n]*)\n/g,`<h1>$<hd1Gr></h1><hr/>`)
                            // .replace(/(?:^|\n)(?!###[^\n]*\n)##\s(?<hd2Gr>[^\n]*)\n/g,`<h2>$<hd2Gr></h2><hr/>`)
                            // .replace(/(?:^|\n)(?!####[^\n]*\n)###\s(?<hd3Gr>[^\n]*)\n/g,`<h3>$<hd3Gr></h3><hr/>`)
                            // .replace(/(?:^|\n)(?!#####[^\n]*\n)####\s(?<hd4Gr>[^\n]*)\n/g,`<h4>$<hd4Gr></h4><hr/>`)
       }
log('replacing', headerReplace(bTest))

    
 }

  // process -> ###s -> withBracketsReplace -> etc foos -> return process

  // withBracketsExchange -> linkPlaceholdReplace, imgPlaceholdReplace, -> i-b change -> makeLinks (back) -> makeHtmlLinks -> return txt
const process = (inStr) => {

    const withBracketsReplace  = (str) => {

// -------- // uniReplace block -----------------
 
        str = uniReplace(str,'i')   
        str = uniReplace(str,'`')   
// ----------// // uniReplace block ------------- 
        return str
        } // withBracketsReplace end

       
   inStr = withBracketsReplace(inStr)  // actions and replacing with brackets

    inStr = convertEndStr(inStr);
return inStr // return of process()
}
const headerReplace0 = (txt) => {
    return txt = txt.replace(/^#(?<hd1Gr>[\s\S]*?)\n/,`<h1>$<hd1Gr></h1><hr/>`).
                replace(/^##(?<hd2Gr>[\s\S]*?)\n/,`<h2>$<hd2Gr></h2><hr/>`).
                    replace(/^###(?<hd3Gr>[\s\S]*?)\n/,`<h3>$<hd3Gr></h3><hr/>`).
                        replace(/^####(?<hd4Gr>[\s\S]*?)\n/,`<h4>$<hd4Gr></h4><hr/>`)
   }
const bufferPreTxt = (inStr) => { 
    // log('inStr', inStr.split(''))
    inStr = headerReplace0(inStr)
    inStr = makeHtml(inStr, 'list')
    return inStr// e_InStr
}

const handleIn = (e) => {

    const inputString = e.target.value
    setPreIn(inputString)
    return 
}
// make stubs OOO -> process text -> inverse to HTML


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

    <div id = 'test-area'>test area</div>
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


