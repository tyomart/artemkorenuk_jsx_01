
import './markdown-styles.less'
import { useState, useContext, useEffect,  useLayoutEffect, useReducer } from 'react'
import $ from 'jquery';
import { json } from 'react-router-dom';

const log = console.log
const Markdown = () => {

    const [preIn, setPreIn] = useState('') // inputing state
const [edit, setEdit] = useState('') // //what Shows in editor
const [readyTXT, setReadyTXT] = useState('') //Shows Output

let flags  = 
    {   
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
        cacheSpec:'',
        
        test:false, //test flag
    } 

const breakLines = (txt) => {

    return txt.split('\n')
}

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
    if (proTag === '##')                     // <h1> tag
            {log('## fired')
                flags = {...flags, h2:!(flags.h2)}
            return tagOpClos('h2');
            }
    if (proTag === '###')                     // <h1> tag
            {log('### fired')
            flags = {...flags, h3:!(flags.h3)}
            return tagOpClos('h3');
            }
    if (proTag === '####')                     // <h1> tag
            {log('#### fired')
            flags = {...flags, h4:!(flags.h4)}
            return tagOpClos('h4');
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
        }

const convertEndStr = () => {
//   log('convertEnd')
    if (flags.h1===false) {
        return '</h1><hr/>br/>'
    } 
    else  if (flags.h2===false) {
        return '</h2><hr/><br/>\n'
    }
    else  if (flags.h3===false) {
        return '</h3><br/>'
    }
    else  if (flags.h4===false) {
        return '</h4><br/>'
    }
    else return ''
} 
const bReplace = (txt) => {
    // log('b fired')
    if (txt.match(/\*\*/)) { //(txt.match(/.*\*\*/))
        
        txt = txt.replace(/\*\*/, convert('**'))
        
    return bReplace(txt)
    }
    else {
        //log('txt else', txt)
        return txt}

}

const iReplace = (txt) => {
if (txt.match(/\_/)) { //(txt.match(/.*\*\*/))
        
    txt = txt.replace(/\_/, convert('_'))
    
return iReplace(txt)
}
else {
    //log('txt else', txt)
    return txt}
  }

  // process -> ###s -> withBracketsReplace -> etc foos -> return process

  // withBracketsExchange -> linkPlaceholdReplace, imgPlaceholdReplace, -> i-b change -> makeLinks (back) -> makeHtmlLinks -> return txt
const process = (inStr) => {

//let storeLinks = []
//let storeImgs = []
let storeCode = []
let count = 1
    const withBracksReplace  = (preStr) => {
        //log('str', str, '~~', count++)
        //str ='####dl_fabcdee_[_kk_mm](123zz_yy567)z_bcd[_k1_mm](123zz_67)__[_kk_1mm]' // test str
        const linkPlaceholdReplace = (txt) => {
            //log('aTxt', txt)
            let matching =  txt.match(/\[(.*?)\]\((.*?)\)/g )
            log('matching', matching)
            let storageLink = matching !== null ? matching.reduce((acc,elem)=>{return [...acc, elem]},[]) : []  // collect links
        
            txt = txt.replace( /\[(.*?)\]\((.*?)\)/g, '©©©')
        
            return [txt, storageLink]
        }
        const imgPlaceholdReplace = (txt) => {
            //log('aTxt', txt)
            let matching =  txt.match(/\!\[(.*?)\]\((.*?)\)/g )
            log('Img matching', matching)
            let storageLink = matching !== null ? matching.reduce((acc,elem)=>{return [...acc, elem]},[]) : []  // collect links
        
            txt = txt.replace( /\!\[(.*?)\]\((.*?)\)/g, '©~©')
        log('placehold Imgs', txt)
            return [txt, storageLink]
        }
        const linkInverseReplace  = (txt, store) =>  { // Invert Links Conversion
        
        //log('bTxt', txt, 'store', store )
            return store.length > 0 
            ? store.reduce((acc,elem) => {  
                //const regexInvert = /©©©/
                //log('inverse Replace fired - elem', elem);
                let matchCPR = txt.match(/©©©/g) 

                if (matchCPR!==null) 

                    { txt = txt.replace(/©©©/, elem);//log('newTxt', txt)
                    return acc = txt}
                else return acc = txt
            }, '' ) 
        :txt;} // end of ternary 

        const imgInverseReplace  = (txt, store) =>  { // Invert Links Conversion
        
        //log('bTxt', txt, 'store', store )
            return store.length > 0 
            ? store.reduce((acc,elem) => {  
                //const regexInvert = /©©©/
                //log('inverse Replace fired - elem', elem);
                let matchCPR = txt.match(/©~©/g) 

                if (matchCPR!==null) 

                    { txt = txt.replace(/©~©/, elem);//log('newTxt', txt)
                    return acc = txt}
                else return acc = txt
            }, '' ) 
            :txt;} // end of ternary 
        
        const makeHtmlLinks = (txt) => {                // LInk Invert conversion   
            // log('cTxt', txt)
                const regexToLinkMatch = /\[(.*?)\]\((.*?)\)/g
            if (txt.match(regexToLinkMatch) !== null) {

                    const regexToHtml=  /(?<txt1>[^[]+)\[(?<link>[^\]]+)\]\((?<url>[^)]+)\)(?<txt2>[^[]+)/g 
                    txt = txt.replace(regexToHtml,"$<txt1><a href='$<url>'>$<link></a>$<txt2>")
                return makeHtmlLinks(txt)
            }
            else return txt 
        }
        const makeHtmlImg = (txt) => {                // LInk Invert conversion   
            //log('makeHtmlImg inTXT', txt)

                const regexToImgMatch = /\!\[(.*?)\]\((.*?)\)/g
            if (txt.match(regexToImgMatch) !== null) {

                    const regexToHtml=  /(?<txt1>[^[]+)\!\[(?<alt>[^\]]+)\]\((?<url>[^)]+)\)(?<txt2>[^[]+)/g     
                    txt = txt.replace(regexToHtml,`$<txt1><img src='$<url>' alt="$<alt>"/>$<txt2>`)
                 
                return makeHtmlImg(txt)
            }
            else return txt 
        }
   
       let [pre1str,storeImgs] =  imgPlaceholdReplace(preStr) 
        let [str,storeLinks] =  linkPlaceholdReplace(pre1str) 
        


        // //replacing
        str = iReplace(str) //invoke iReplace here
        str = bReplace(str)

        //get back transformed brackets
        str = imgInverseReplace (str,storeImgs)
        str = linkInverseReplace (str,storeLinks)
      
         str = makeHtmlImg(str)
        str = makeHtmlLinks(str)
       log('finally str', str)
        return str
        } // withBracketsReplace end

   inStr = withBracksReplace(inStr)  // actions and replacing with brackets

   inStr = inStr.match(/^####.*$/) ? inStr.replace(/^####/, convert('####')) : inStr
   inStr = inStr.match(/^###.*$/) ? inStr.replace(/^###/, convert('###')) : inStr
   inStr = inStr.match(/^##.*$/) ? inStr.replace(/^##/, convert('##')) : inStr
   inStr = inStr.match(/^#.*$/) ? inStr.replace(/^#/, convert('#')) : inStr
 
   //inStr = inStr.replace(/$/, convertEndStr())
   withBracksReplace(inStr)
return inStr // return of process()
}

const testTXT = (inVal) => {

    breakLines(inVal).forEach(str => process(str))
    
    return 
}

const handleIn = (e) => {
   
    const inputString = e.target.value
    setPreIn(inputString)

    return 
}

const handleTest = () => {
   
  
   const aTest = '#z_#c_**[i_g**en](http://g_p**e.ru/8_.j)zd##![google.com](http://goo_**x.com)fg_**h##_id![li_nk](http://ya_**x.ru) 12v_**'

  
    process(aTest)
    return log('process ->', '\n', )// process(aTest)
}

useLayoutEffect(()=>{                 //triggering Text Processor and sync editor and ReadyTXT

    if (preIn.length >0) { // to not send empties in state

  
        setEdit(preIn)

        setReadyTXT(testTXT(preIn))
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


// links
// \[(?<link>.*?)\]\((?<url>.*?)\)


// log ('inStr', inStr)

// log('##zb#czd##fgh##'.match(/^##.*$/) ? 'test match' : 'test not')

//  if (inStr.length > 0) {

//     if (inStr.match(/^##.*$/) === true )  { log('matching ##', inStr.match(/^##/), )

//     log('match')

//     return inStr = inStr.replace(/^##/, convert('##')) 
   

        
//     }

// else if (inStr.match(/^#/) === true) {
//   return inStr =  inStr.replace(/^#/, convert('#')) }//h1

    

//     inStr = inStr.replace(/$/, convertEndStr()); //
//     return inStr
//  }
 
//  else return inStr





//BS-DEL changing flag's dependent tags -- chnging only current tag
//editing from any place inserts flag's dependant tags, calculate tag's flags for the editing place by last tags   

// <b>adasdasd</b>dfsdf<b> 12323123</b> qqqwweeerr
//tt<b>kkkkkooookkooo</b>

// **adasdasd**dfsdf** 12323123** qqqwweeerr
//tt**kkkkkooookkooo**

//lists - level depends of spaces and tabs in the begin of a string



/// GBG ----------------

// const imgToTagReplace  = (txt) => {
//     //txt = '#zb#c**zd##fg**h##_iabcd[hereisLINK](http://yandex.ru) 123zxcv'
//     let regex  = /(?<txt1>.*)(?<!_)\!\[(?<altTxt>.*?)\]\((?<url>.*?)\)(?!_)(?<txt2>.*)/

//     let groups = txt.match(regex).groups
//     txt = txt.replace(regex, `${groups.txt1} <img src='${groups.url}' alt ='${groups.altTxt}'/> ${groups.txt2}`)
//     //txt = '<a href ="'+groups.url+'">'+groups.link+'</a>'
//     return txt
// }


// const regex = (type) => { switch (type) {
//     case 'link': return /\[(.*?)\]\((.*?)\)/g 
//     case 'img': return /\!\[(.*?)\]\((.*?)\)/g
//     default: return /©/
// }}

// const placeholder = (type) =>{switch (type) {
//     case 'link': return '©©©'
//     case 'img': return '©~©'
//     default: return ''
// }}


// const placeholdBrackets = (txt, typeOfData) => {
//     let storage = []
//     //log(typeOfData, 'regex', regex(typeOfData), 'txt', txt)
//      const matching = txt.match(regex(typeOfData)) // match ()[]
 
//      storage = matching !==null // collect links
//         ? matching.reduce((acc,elem)=>{return [...acc, elem]},[]) 
//      : [] 
 
//      txt = txt.replace(regex(typeOfData),placeholder(typeOfData)) // replace all links  
//     // log('placehold Brackets', '\n txt: ',  txt , '\n storage: ',  storage,  '\n placeholder: ', placeholder(typeOfData) )
//      return [txt, storage, placeholder(typeOfData)] // ATTENTION! array returned
//   }


// const makeLinks = (txt, store, typeOf) => 
// store.length > 0 
// ? store.forEach(elem => {  // Invert Links Conversion + adding Links as Tags
//     const regexInvert = (type) =>{switch (type) {
//         case 'link': return /©©©/
//         case 'img': return /©~©/
//         default: return ''
//     }}
//     let matchCPR = txt.match(regexInvert(typeOf)) 

//     if (matchCPR!==null) 

//         { txt = txt.replace(regexInvert(typeOf), elem)
//             log('repl w elem',txt );
            
//             txt = linkToTagReplace(typeOf)

//         return txt}
//     else return txt
// } ) 
// : store

// const linkToTagReplace = (txt, type) => {                // LInk Invert conversion   
        
//     const regexToTag = (type) => {

//         switch(type) {
//             case 'link': return /(?<txt1>.*)\[(?<link>.*?)\]\((?<url>.*?)\)(?<txt2>.*)/
//             case 'img': return /(?<txt1>.*)\!\[(?<link>.*?)\]\((?<url>.*?)\)(?<txt2>.*)/
//             case 'code': return /(.*)?\`\`\`(?<code>.*)\`\`\`(.*)?/ // CHECK for issues
//         }
//     }

//      const groups = txt.match(regexToTag).groups
//     const txtToTag = (type) => {
//         switch (type) {
//             case 'link': return `${groups.txt1} <a href='${groups.url}'/a> ${groups.link} </a>${groups.txt2}`
//             case 'img': return  `${groups.txt1} <img src='${groups.url}' alt ='${groups.altTxt}'/> ${groups.txt2}`
//             case 'code': return `<code>${groups.code}'/code>` // CHECK for issues
//         }

//     }
    
//      txt = txt.replace(regexToTag(type),txtToTag(type))
//      //txt = '<a href ="'+groups.url+'">'+groups.link+'</a>'
//      return txt
//  }

// let tag = '####' --------------how to transform string in regex and automate grid conversion foo
// let regexGridMatch = `^${tag}.*$`
// let regexGridReplace = `/^${tag}`
// log('regex', regexGridMatch)
// inStr = inStr.match(/${regexGridMatch}/) ? inStr.replace(regexGridReplace, convert(tag)) : inStr


//    const temp2Test = () => {
//         const regex = /\!\[(.*?)\]\((.*?)\)/g;

//             // Alternative syntax using RegExp constructor
//             // const regex = new RegExp('\\!\\[(.*?)\\]\\((.*?)\\)', 'gm')

//             const str = `#z_#c_**[i_g**en](http://g_p**e.ru/8_.j)zd##![google.com](http://goo_**x.com)fg_**h##_id![li_nk](http://ya_**x.ru) 12v_**`;
//             const subst = `&&&`;

//             // The substituted value will be contained in the result variable
//             const result = str.replace(regex, subst);

//             console.log('Substitution result: ', result);
//         return
//     }

