//TO DO double zeros after coma in result

//      #14 - usage of last result(*) and number-ops-Eq error, (*) - entering number after resultsucces
//      useEffect - dMem changed -> dInp = dMem
//      if pressed sign 

//      spaces between signs and numbers
//      space after number entering the sign
//     
//      Inversion button and op
//      ops with negative numbers
//      
import './calculator_style.less'
import { useState, } from 'react' // useReducer, useEffect
import { createContext,useContext } from 'react'


const InpContext = createContext(null);

const Display = ({switchD}) => {
   //const dInp = +dInpString
const inpusContext = useContext(InpContext) //Context

    console.log('inpContex', inpusContext,' ', typeof inpusContext)
    
    const showData = (inpus,switchD) => {
      const regexFZero = /^0([1-9]+)/ // first zero fixing
      const regexSignComa = /(?<sign>\+|\-|\x|\/)\./g

      const twoZeroCut = (val) => {     // PROBLEM OF NaN is here
        console.log('val', val, typeof val)

        const stringRes = (val === undefined || val === NaN) ? 0 // 'kuk'

            : (typeof val ==='string') ? val: val// (+val).toFixed(2) 
            
            // typeof val ==='number' 
            //     ?  (+val).toFixed(2) // .toString() 
            //         : (+val).toFixed(2) //.toString() IF val is STRING

        // const lastDig = stringRes.charAt(stringRes.length-1)
        // const last2Dig = stringRes.charAt(stringRes.length-2)
        console.log('stringRes',stringRes)
        return stringRes
        
        // stringRes === undefined 
        //     ? 0 : lastDig === '0' && last2Dig ==='0'
        //         ?  parseInt(stringRes,10) 
        //             : lastDig ==='0' && last2Dig !=='0' 
        //                 ? (+stringRes).toFixed(1)
        //                 : (+stringRes)
      }
          return switchD ?
                 inpus.length === 0 ? 
                 0                            
                     :  twoZeroCut(inpus)  // 00 after coma is HERE //inpus.toFixed(2) 
 
                        : regexFZero.test(inpus) // clean first null
                                ? inpus.replace(/^0/,'') 
                                    : 
                                    (regexSignComa.test(inpus) 
                                     ? inpus.replace(regexSignComa, " $<sign> 0.") 
                                     : inpus);
                     
    
     // const rrr = (a === 0) ? (b===1 ? 1 : 33) : (c===4 ? 44 : 14)

    }
return <span>
        {  

        <div className='display'>
           
            { 
            showData(inpusContext, switchD)
        }</div>

        }
    <div className='service'>service:
   
        {/* <div>dInp {dInp} tp {typeof dInp}</div> */}
        <div>inpusContext {inpusContext} tp{typeof inpusContext}</div>
    </div>
</span>
}

const Calculator = () => {

    const [inp,setInp] = useState('0') //

    const [eqPressed,setEqPressed] = useState(false)
    const [switchD, setSwitchD] = useState(false)
    const [comaIsOff, setcomaIsOff] = useState(false)
    const [isString, setIsString] = useState(true)

    const handleChange =(e) => {  
     
       const hndlChngAux = () => {
       
            return  (inp==='0' && e.target.value ==='0') 
            ? setInp(inp) 
                :  setInp([...inp,  comaIsOff && e.target.value ==='.' ? ''  // double coma solved
                    : e.target.value].join('') )
        }
       
        return hndlChngAux(e)
                // TO DO -- make iterable inp          
    }

    const handleComa =(e) => {
        setcomaIsOff(true)

        return handleChange(e)
    }
    const handleOps =(e) => {
        setcomaIsOff(false)

       return  handleChange(e) 
    }

    const handleChangeC =() => {
        setEqPressed(false)
        setInp('0')
        setSwitchD(false)
        setcomaIsOff(false)
     }

const handleInv = (e,inpusContext) => {
    console.log('inpus Here', inp, inpusContext)
    //setInp([inpusContext])
   
    return setInp(inp.toString())
    
    //setSwitchD(!switchD)
}


const handleEq= (e) => {
    
    setSwitchD(true)
    setcomaIsOff(false); // console.log('set coma OFF - false', comaIsOff )
    setEqPressed(true)

    const oneSigny= (line) => {
        return line.replace(/(\+|\-|x|\/)+/g,'$1')
        .replace(/(\+|\-|x|\/)$/,'')
            .replace(/^0+|(?<=\/)0+|(?<=\-)0+|(?<=\+)0+|(?<=x)0+/g,'') //clean 0s before
                .split(/([\+|\-|x|\/])/).map((val)=>{return val==='' || val==='.0' || val ==='0.' || val ==='.' ? val=0 : val}) 
    }

    const testFoo = (testArr) =>
            { return testArr.reduce((acc,val, i)=>{
                return (val === 'x' || val === '/') ?  [...acc, i] : acc}, [])
        }

    const standardFoo = (array) => { 
        const result = ()=> { 
            switch (array[1]){
                case '+': return (+array[0])+(+array[2])
                case '-': return (+array[0])-(+array[2])                
                }
            }
       return array.length === 1 ? array[0] : standardFoo([result(), ...array.slice(3)]) 
    }

    const priorFoo = (array) => { 
         const result = ()=> { 
            switch (array[i]){
                case 'x': return array[i-1]*array[i+1]
                case '/': return  array[i+1] ==='0' ? Infinity : array[i-1]/array[i+1] // try-catch division by zero             
                }
            }
            const testFooHard = testFoo(array); // console.log('testFoo', testFooHard)
            let i = testFooHard[0]
            return testFooHard.length === 0 ? standardFoo(array) : priorFoo([...array.slice(0,i-1),result(i), ...array.slice(i+2)]) //
    }

    const result = () => { 
        let tempVar =  priorFoo(oneSigny(inp))
        let  tempVar2 = tempVar.toString()   
        return   setInp(tempVar2)  
    }
    
        console.log('inp before result', inp, typeof inp)
        
    return  setInp(result) 
}
    //.toString() HOW TO CONVERT SAFELY TO STRING?? TO USE IN DISPLAY WITHOUT ERRORS

    // SOMEHOW ADD VALUE TO inp INSTEAD OF NaN and WHY NaN
   
 //handleEq end

return (

<InpContext.Provider value={inp}>
<div className ='block'>
<h4 className='app-title'>Calculator (mvp ver.1.0)</h4>

    <Display dInp={inp} switchD ={switchD} eqPressed = {eqPressed}/>  
    {/* dMem={mem} */}

    <div className="inputs-plate">
        <div className="num-block">

            <button onClick={handleChange} value='1' className="button">1</button>
            <button  onClick={handleChange} value='2' className="button">2</button>
            <button  onClick={handleChange} value='3' className="button">3</button>
            <button  onClick={handleChange} value='4' className="button">4</button>
            <button  onClick={handleChange} value='5' className="button">5</button>
            <button  onClick={handleChange} value='6' className="button">6</button>
            <button onClick={handleChange} value='7'  className="button">7</button>
            <button  onClick={handleChange} value='8' className="button">8</button>
            <button  onClick={handleChange} value='9' className="button">9</button>
            <button  onClick={handleChange} value='0' className="button">0</button>
            <button  onClick={handleComa} value='.' className="button">.</button>
            <button onClick={handleEq} className="button">=</button>
            <button onClick={handleChangeC} className="button">C</button>
            <button onClick={handleInv} className="button">Inv</button>
            {/* <button onClick={handleTest2} className="button">T2</button> */}
        </div>

        <div className='ops-block'>
            <button onClick={handleOps} value='+' className="button">+</button>
            <button onClick={handleOps} value='-'  className="button">-</button>
            <button onClick={handleOps} value='x'  className="button">x</button>
            <button onClick={handleOps} value='/'  className="button">/</button>
        </div>

        <div className='serv-block'></div>

        </div>

  </div>
  </InpContext.Provider>
 )
}

export default Calculator;
