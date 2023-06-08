
import './markdown-styles.less'
import { useState, useContext, useEffect, useReducer } from 'react'
import $ from 'jquery';

const log = console.log
const Test = () => {

    // const iReplace = (txt) => {
    //     log('b fired')
    //     if (txt.match(/_/)) { //(txt.match(/.*\*\*/))
          
    //         txt = txt.replace(/(?![^(]*\))(_)/, convert('**'))
            
    //     return bReplace(txt)
    //     }
    //     else {
    //         //log('txt else', txt)
    //         return txt}
    
    // }

    //   const iReplace0 = (txt) => {
    //     if (txt.match(/\_/)) {
    //         txt = txt.replace(/(?![^(]*\))(_)/, convert('_'))
    //         return iReplace(txt)
    //     }
    //     else {
    //         return txt
    //     }
    // }


    const testReplace = (txt) => {

    
       let hello = "   Hello, World!  ";
let wsRegex = /^\s+|\s+$/g; // Change this line
let result = hello.replace(wsRegex, 'AA');
return result

    }
const handleTest = () => {

    let cca = '789'
    const aTest = '01#23##45##67#89'

    log('proc2', '\n', testReplace(aTest) )
   
    return testReplace(aTest)
}


return <> 

{/* <div>TEST AREA</div> */}


<div> <button onClick ={handleTest}>TEST</button></div>
<hr/>
<div>OUT</div>
<br/>
<br/>
<div></div>
</>
}

export default Test;


     
// let regexToLinkMatch = ''
// let regexToHtml=  ''
// let  regexToSubstGroups = ""
// log('toHtml', type, txt)
// switch(type) {
//     case 'link': 
//         regexToLinkMatch = /\[(.*?)\]\((.*?)\)/g;
//         regexToHtml=  /(?<txt1>[^[]+)\[(?<link>[^\]]+)\]\((?<url>[^)]+)\)(?<txt2>[^[]+)/g ;
//         regexToSubstGroups = "$<txt1><a href='$<url>'>$<link></a>$<txt2>";
//         break;
//     case 'img': 
//         regexToLinkMatch = /\!\[(.*?)\]\((.*?)\)/g
//         regexToHtml=   /(?<txt1>[^[]+)\!\[(?<alt>[^\]]+)\]\((?<url>[^)]+)\)(?<txt2>[^[]+)/g   
//         regexToSubstGroups = `$<txt1><img src='$<url>' alt="$<alt>"/>$<txt2>`;
//         break;
// }
    
// if (txt.match(regexToLinkMatch) !== null) {

    
//     txt = txt.replace(regexToHtml,regexToSubstGroups)
// return makeHtmlLinks(txt)
// }
// else return txt 
// }

// const makeHtmlImg = (txt) => {                // LInk Invert conversion   
// log('imgTXT', txt)

// const regexToImgMatch = /\!\[(.*?)\]\((.*?)\)/g
// if (txt.match(regexToImgMatch) !== null) {

//     const regexToHtml=  /(?<txt1>[^[]+)\!\[(?<alt>[^\]]+)\]\((?<url>[^)]+)\)(?<txt2>[^[]+)/g     
//     txt = txt.replace(regexToHtml,`$<txt1><img src='$<url>' alt="$<alt>"/>$<txt2>`)
 
// return makeHtmlImg(txt)
// }
// else return txt 
// }

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

// const makeHtmlLinks = (txt) => {                // LInk Invert conversion   
//     const regexToHtml=  /(?<txt1>[^[]+)\[(?<link>[^\]]+)\]\((?<url>[^)]+)\)(?<txt2>[^[]+)/g 
//         const regexToMatch = /\[(.*?)\]\((.*?)\)/g //Link
//         let regexToSubstGroups = '$<txt1><a href="$<url>">$<link></a>$<txt2>'

//     if (txt.match(regexToMatch) !== null) {
//             txt = txt.replace(regexToHtml, regexToSubstGroups)
//         return makeHtmlLinks(txt)
//     }
//     else return txt 
// }
// const makeHtmlImg = (txt) => {                // LInk Invert conversion   

//     const regexToHtml=  /(?<txt1>[^[]+)\!\[(?<alt>[^\]]+)\]\((?<url>[^)]+)\)(?<txt2>[^[]+)/g 
//         const regexToMatch = /\!\[(.*?)\]\((.*?)\)/g //Img
//         let  regexToSubstGroups = `$<txt1><img src="$<url>" alt="$<alt>"/>$<txt2>`

//     if (txt.match(regexToMatch) !== null) { 
//             txt = txt.replace(regexToHtml,regexToSubstGroups)
//         return makeHtmlImg(txt)
//     }
//     else return txt 
// }

// const bReplace = (txt) => {
//     // log('b fired')
//     if (txt.match(/\*\*/)) { //(txt.match(/.*\*\*/))
        
//         txt = txt.replace(/\*\*/, convert('**'))
        
//     return bReplace(txt)
//     }
//     else {
//         //log('txt else', txt)
//         return txt}

// }

// const iReplace = (txt) => {
// if (txt.match(/\_/)) { //(txt.match(/.*\*\*/))
        
//     txt = txt.replace(/\_/, convert('_'))
    
// return iReplace(txt)
// }
// else {
//     //log('txt else', txt)
//     return txt}
//   }