import { useState, useEffect, useReducer } from "react";




const Sandbox4 = ( {daty} ) => { //{ tSklad }

 let datyP = '2023-02-15 '+daty
const arrE = ['a','b','c','d']  
  
    
const objE = [{'a':'1'},
              {'b':'2'},
              {'c':'3'},
              {'d':'4'}]

const objA = {'a':'1', 'b':'2', 'c':'3', 'd':'4'}
    return (
      <div>
  
            {/* {Object.keys(objA).map((elem) => elem !== 'a' && objA[elem])} */}


           daty {datyP}
   
      </div> // end tag
    )
  

}



export default Sandbox4

// SHOW elem if key of ObjE !== 'b'
// !'b' && elem 

// const objE = [{'a':'1',
//               'a1':'11',
//               'a2':'12',
//               },
//               {'b':'2'},
//               {'c':'3'},
//               {'d':'4'}]



