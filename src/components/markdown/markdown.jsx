
import './markdown-styles.less'
import { useState, useLayoutEffect, } from 'react'
import $ from 'jquery';


const log = console.log
const Markdown = () => {
//    const initialPreIn  = `# Markdown editor\nyou can write plain text, and, make markdown
// \n## like headers \n lists\n- first line _italic_\n- second is **bold**\n- to exit list press Return twice\n\n and etc \n
// > you can se quotation\n some \`inline code\` and block code also\n\`\`\`this is \n block of 
// \ncode\n\`\`\`\nMay be I will add some features as copy HTML button or highlighting in code blocks`

   const initialPreIn  = `# Markdown editor\nyou can **write markdown**\n## like headers \n lists\n_italic text_\nplain text`

    const [preIn, setPreIn] = useState(initialPreIn ) // inputing state
const [edit, setEdit] = useState('') // //what Shows in editor
const [readyTXT, setReadyTXT] = useState('') //Shows Output


// const breakLines = (txt) => {

//     return txt.split('\n')
// }
  
const convertEndStr = (txt) => {

    return txt.replace(/\n/gm, '<br/>') 
} 

const headerReplace = (txt) => { // TO DO fix <br/> before <h tags>
    return txt = txt.replace(/(?:^|\n)(?!##[^\n]*\n)#\s(?<hd1Gr>[^\n]*)\n/g,`\n<h1>$<hd1Gr></h1><hr/>`)
                        .replace(/(?:^|\n)(?!###[^\n]*\n)##\s(?<hd2Gr>[^\n]*)\n/g,`\n<h2>$<hd2Gr></h2><hr/>`)
                        .replace(/(?:^|\n)(?!####[^\n]*\n)###\s(?<hd3Gr>[^\n]*)\n/g,`\n<h3>$<hd3Gr></h3><br/>`)
                        .replace(/(?:^|\n)(?!#####[^\n]*\n)####\s(?<hd4Gr>[^\n]*)\n/g,`\n<h4>$<hd4Gr></h4><br/>`)
   }

const italReplace = (txt) => {
    log('matching', txt.match(/(?:\s|^)_(?<itGr>[\s\S]*?)_(?=\s|\n|$)/g))
    log('txt\n', txt.split(''))
    return txt = txt.replace(/(?:\s|^)_(?<itGr>[\s\S]*?)_(?=\s|\n|$)/g,` <i>$<itGr></i> ` )
}
const boldReplace = (txt) => {

    return txt = txt.replace(/(?:\s|^)\*\*(?<bGr>[\s\S]*?)\*\*(?=\s|\n|$)/g,` <b>$<bGr></b> ` ) 
}
const codeInlineReplace = (txt) => {

    return txt = txt.replace(/(?:\s|^)(?!``|```)`(?<codeInGr>[\s\S]*?)`(?=\s|\n|$)/g,` <code>$<codeInGr></code> ` )
}

const linkPlaceholdReplace = (txt,type) => {

    let regex = ''; let stub = ''
    switch (type){
        case 'link': regex = /\[(.*?)\]\((.*?)\)/g ; stub = '©©©';break;
        case 'img': regex = /\!\[(.*?)\]\((.*?)\)/g ; stub = '©~©';break;
        case 'code': regex = /(<code>[\s\S]*?<\/code>)/gm ; stub = '©~<CODE>~©';break;
       
    }   
    let matching =  txt.match(regex)
    let storageLink = matching !== null ? matching.reduce((acc,elem)=>{return [...acc, elem]},[]) : []  // collect links
    txt = txt.replace( regex, stub)

    return [txt, storageLink]
}

const linkInverseReplace  = (txt, store, type) =>  { // Invert Links Conversion
    // log('inverse replace', type)
    let regexStub = ''
    switch(type){
        case 'link':  regexStub = '©©©'; break
        case 'img':  regexStub = '©~©'; break
        case 'code':  regexStub = '©~<CODE>~©'; break
    
        default:  regexStub = ''; break
    }

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

const linkInverseReplace0  = (txt, store, type) =>  { // for CODE Invert Links Conversion
   
        return store.length > 0 
        ?   store.reduce((acc,elem) => {  
              
                let matchCPR = txt.match(/©~<CODE>~©/g) 
    
                    if (matchCPR!==null) 
                        { txt = txt.replace(/©~<CODE>~©/, elem);
                        return acc = txt}
                    else return acc = txt
            }, '' ) 
        :txt;} // end of ternary 

const makeHtml = (txt,type) => {                // LInk Invert conversion   // 
    
    const convertCodeBlock = (codeBlock) => {
    
        codeBlock = codeBlock.replace(/\n/gm, '<br/>')
        return codeBlock
    }

    const convertUList = (ulist) => {  //log('theList \n', txt.split(''))
    return ulist.replace(/^\s*?\-(?<listGroup>[\s\S]*?)\n/gm, `<li id='list_1'>$<listGroup></li>`) 
    }
    let regexToMatch = '';  let regexToHtml=  '';  let  regexToSubstGroups = ""; 

    switch(type) {          // types reducer for replacing groups
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
            regexToHtml=   /^\s*?\-(?<ult>[\s\S]*?)\n\n/gm
            regexToSubstGroups = `<ul>WRONG</ul><br/>`; // not useful because of matching[0]
        break;
 
    }
   
    const replaceToHtml = (type,txtList) => {  // to use matching[0] as matching to convert inside block
        switch (type) { 
            case 'code': return `\n<code>` + convertCodeBlock(matching[0].replace(/\n```\n/gm,'')) + `</code>\n`;
            case 'list': return `<ul>${convertUList(txtList)}</ul>`; // 
            default:  return regexToSubstGroups; // for other types
        }
    }
    let matching = txt.match(regexToMatch) ;
    if (matching !== null) { //log('match finding', matching[0])
        txt = txt.replace(regexToHtml, replaceToHtml(type, matching[0]&& matching[0])) // matching[0] if exist -> theList in replaceToHtml
 

    return makeHtml(txt, type)
}
else return txt 
    }

    // make stubs to hide blocks and img-links, make replacement of main part, then blocks back on places changed to tags

const replacer = (inStr) => { 
//    log('1 inStr\n', inStr.split('') )
   
    inStr = headerReplace(inStr)
    inStr = makeHtml(inStr, 'quote')
    inStr = makeHtml(inStr, 'list')
    
    inStr = makeHtml(inStr, 'code'); //convert code to <code>

    let [c_InStr, store] = linkPlaceholdReplace(inStr, 'code') ; //replacing to stubs
    let [pre1str,storeImgs] =   linkPlaceholdReplace(c_InStr, 'img') 
    let [d_InStr,storeLinks] =   linkPlaceholdReplace(pre1str, 'link')  

    //replacing  out of other blocks
            d_InStr = italReplace(d_InStr) //italic
            d_InStr = boldReplace(d_InStr) //bold
            d_InStr = codeInlineReplace(d_InStr) //inline code
            

        d_InStr =  linkInverseReplace0(d_InStr, store, 'code');// replace back <code> tags and Img, Link signs
        d_InStr = linkInverseReplace (d_InStr,storeImgs, 'img' )
        d_InStr = linkInverseReplace (d_InStr,storeLinks, 'link')
        
        d_InStr = makeHtml(d_InStr, 'img') //replace to tags
        d_InStr = makeHtml(d_InStr, 'link') 

        d_InStr = convertEndStr(d_InStr) // <br/> 
        log('d_Instr\n', d_InStr)
    return  d_InStr // q_InStr
}

const handleIn = (e) => {

    const inputString = e.target.value
    setPreIn(inputString)
    return 
}

useLayoutEffect(()=>{                 //triggering Text Processor and sync editor and ReadyTXT

    if (preIn.length >0) { // to not send empties in state

        
        setEdit(preIn) ; //log('preIn in Fx', preIn)
       
        // setTimeout(5000)
        setReadyTXT(replacer(preIn)) // 
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

    <div>Markdown v.0.9</div>
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

{/* <div> <button onClick ={handleTest}>TEST</button></div> */}

</>
}

export default Markdown;




 // c_InStr = breakLines(c_InStr).map(str => innerProcess(str)).join('') // make strings and process links,img, etc
        // log('cInstr', c_InStr)


        // const innerProcess = (inStr) => { // main processor is uniReplace // linkPlace,Inverse,makeHtml to bypass with code blocks
        //     log('proc fired')
        //         const withBracketsReplace  = (preStr) => {
                    
                   
                  
            
        //     // -------- // uniReplace block ----------------- // transmit just marker of further replace
        //             // str = uniReplace(str,'b')   
        //             // // str = uniReplace(str,'i')   
        //             // str = uniReplace(str,'`')
                   
                    
                      
                     
        //             // str = uniReplace(str,'>')   
        //     // ----------// // uniReplace block -------------
            
            
        //             // //get back transformed brackets
                   
              
        //             return preStr
        //             } // withBracketsReplace end
            
                   
        //        inStr = withBracketsReplace(inStr)  // actions and replacing with brackets
            
        //     // header replace
        //     //   inStr = headerReplace0(inStr)
             
        //         inStr = convertEndStr(inStr);
        //     return inStr // return of process()
        //     }

        
// let flags  = 
//     {   
//         inputOn: false,
//         h1: true,
//         h2: true,
//         h3: true,
//         h4: true,
//         b: true,
//         i: true,
//         tr:true,
//         td: true,
//         th: true,
//         ul: true,
//         ol: true,
//         li: true,
//         code: true,
//         //codeBlock: true,
//         cacheSpec:'',
        
//         test:false, //test flag
//     } 

// const convert = (proTag ) => { //cash, char, j, txtAr

//     const tagOpClos = (tag) => { // open/closed tag substitution
//         //exclusion cases are expected here
//        return !flags[`${tag}`]         //basic case
//             ? `<${tag}>` : `</${tag}>`   
//     }
   
//     // tag cases
//     if (proTag === '#' )                     // <h1> ///tag && txtAr[json-1] === '\n'
//             {log('# fired, convert H1 called')
//             flags = {...flags, h1:!(flags.h1)}
//             return tagOpClos('h1');
//             }
//     if (proTag === '##')                     // <h1> tag
//             {log('## fired')
//                 flags = {...flags, h2:!(flags.h2)}
//             return tagOpClos('h2');
//             }
//     if (proTag === '###')                     // <h1> tag
//             {log('### fired')
//             flags = {...flags, h3:!(flags.h3)}
//             return tagOpClos('h3');
//             }
//     if (proTag === '####')                     // <h1> tag
//             {log('#### fired')
//             flags = {...flags, h4:!(flags.h4)}
//             return tagOpClos('h4');
//             }
//     if (proTag === '**')                     // <h1> tag
//             {
//                 flags = {...flags, b:!(flags.b)}
//             return tagOpClos('b');
//             }
//     if (proTag === '_')                     // <h1> tag
//             {
//                 flags = {...flags, i:!(flags.i)}
//             return tagOpClos('i');
//             }
       
//     if (proTag === '\`')                     // <h1> tag
//             {
//                 flags = {...flags, code:!(flags.code)}
//             return tagOpClos('code');
//             }
  
//     if (proTag === 'ul')                     // <h1> tag
//             {
//                 flags = {...flags, ul:!(flags.ul)}
//             return tagOpClos('ul');
//             }
//     if (proTag === 'li')                     // <h1> tag
//             {
//                 flags = {...flags, li:!(flags.li)}
//             return tagOpClos('li');
//             }
//         if (proTag === 'ol')                     // <h1> tag
//                 {
//                     flags = {...flags, ol:!(flags.ol)}
//                 return tagOpClos('ol');
//                 }
//         if (proTag === 'th')                     // <h1> tag
//                 {
//                     flags = {...flags, codeBlock:!(flags.codeBlock)}
//                 return tagOpClos('code');
//                 }
//         if (proTag === 'td')                     // <h1> tag
//                 {
//                     flags = {...flags, codeBlock:!(flags.codeBlock)}
//                 return tagOpClos('code');
//                 }
//         if (proTag === 'tr')                     // <h1> tag
//                 {
//                     flags = {...flags, tr:!(flags.tr)}
//                 return tagOpClos('tr');
//                 }
//         if (proTag === ' ')                     // <h1> tag
//         {
            
//         return ' '
//         }
//     }  

// const uniReplace = (txt, type) => { // use marker for replace, and use actually text situation as '>' -> />\s/ for blockquote
//     let regex = '', toTag = ''
    
//     switch (type) {
//         case 'b': regex = /\*\*/;  toTag = '**';break
//         case 'i': regex = /\_/;  toTag = '_';break
//         case '\`': regex = /(?<![`\\])`(?!`)/;  toTag = '`';break;
//         // case 'ul': regex = /\-/;  toTag = 'ul';break
//         case '>': regex = /\>\s/;  toTag = 'blockquote';break
//         default: regex = /\`/;  toTag = '';break;
//     }

//     if (toTag.length === 0) 
//         return txt
   
//     else {
//         if (txt.match(regex)) { //(txt.match(/.*\*\*/))
//             txt = txt.replace(regex, convert(toTag))  
//         return uniReplace(txt, type)
//         }
//         else {
//             //log('txt else', txt)
//             return txt}
//     }   
// }
//   log('convertEnd')
    // if (flags.h1===false) {
    //     flags = {...flags, h1:!(flags.h1)}
    //     return txt.replace(/$/, '</h1><hr/>\n')
    // } 
    // else  if (flags.h2===false) {
    //     flags = {...flags, h2:!(flags.h2)} 
    //     return txt.replace(/$/, '</h2><hr/>\n')
    // }
    // else  if (flags.h3===false) {
    //     return txt.replace(/$/, '</h3>\n')
    // }
    // else  if (flags.h4===false) {
    //     return txt.replace(/$/,  '</h4>\n')
    // }
    // else 