
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