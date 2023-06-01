
import './markdown-styles.less'
import { useState, useContext, useEffect, useReducer } from 'react'
import $ from 'jquery';

const log = console.log
const Markdown = () => {

//let cacheSpec = ''
let flags  = 
    {   
        h1: true,
        h2: true,
        h3: true,
        b: true,
        i: true,
        cacheSpec:'',
        
        test:false, //test flag
    } 

const special = (testedChar) => {
        
    const specialSet = ['*','\\','\`','#','i','[',']', '|']
   return  Boolean(specialSet.reduce((acc,elem) => { return acc=acc+(elem===testedChar)} ,false))
}


const convert = (char,cash) => {

   
    const proTag= cash.length >0 || cash === undefined ? cash + char : char
    const tagOpClos = (tag) => { // open/closed tag substitution
        
        //exclusion cases are expected here

       // log('outval fired')
       return !flags[`${tag}`]         //basic case
            ? `<${tag}>` : `</${tag}>`   
    }
   
    // tag cases
    if (proTag === '#')                     // <h1> tag
            {log('# fired')
            flags = {...flags, h1:!(flags.h1),  cacheSpec:''}
            return tagOpClos('h1',0);
            }
    if (proTag === '##')                     // <h1> tag
            {log('## fired')
                flags = {...flags, h2:!(flags.h2), cacheSpec:''}
            return tagOpClos('h2',0);
            }
    if (proTag === '###')                     // <h1> tag
            {log('# fired')
            flags = {...flags, h3:!(flags.h3), cacheSpec:''}
            return tagOpClos('h3',0);
            }
    if (proTag === '**')                     // <h1> tag
            {
                flags = {...flags, b:!(flags.b), cacheSpec:''}
            return tagOpClos('b',0);
            }
  
    else return proTag
}
const testTXT = (txt) => {
  
    return txt.split('').reduce((acc,char,i,txtArr) => {
        if (special(char) === true) {

            if (txtArr[i+1] === char) { // M-conversion
                
                flags.cacheSpec = flags.cacheSpec+ char
                return acc // 000-conversion
            }
         
           else {
                
            return acc = acc + convert(char, flags.cacheSpec) // 1-conversion
            }
        }
        else { ;return acc =  acc + char} //0-conversion

    },'')

}

const handleTest = () => {

    let cca = '789'
    const aTest = '01#23##45##67#89'

    log('proc2', '\n', testTXT(aTest) )
   
    return 
}
return <> 

<div>Markdown (under construct.)</div>


<div> <button onClick ={handleTest}>TEST</button></div>

</>
}

export default Markdown;


