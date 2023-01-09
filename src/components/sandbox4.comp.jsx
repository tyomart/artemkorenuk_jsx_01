import { useState, useReducer } from "react";


const reducer =() => {
}

const Sandbox4 = (props) => { //{ tSklad }

    
    const [tSklad, setTSklad] = useState([]);
    const [obJ, setObJ] = useState({});
   
  
    const handleClick = () => {
      console.log('obJ', obJ)
      setTSklad([...tSklad, obJ])
      console.log('tSklad', tSklad)
    

      
    }
  
    const handleChange = (event) => {
      
      setObJ({...obJ, [event.target.name]:event.target.value});
    }

    // const tempDat = [
    //   {name:'10', b:2, c:3}, 
    //   {name:'20', b:'dfg', c:'wer'}, 
    //   {name:'30', b:5, c:8},
    //   {name:'40', b:7, c:9, g:'40'}
    // ]
    //console.log('tempDat check', tempDat[3].g)

    const listFoo = (item) => {
      return <div>{Object.values(item).map((el) => <span>  {el}  </span>)}</div>
    }
 
  // HOW TO RE-NULL VALUES IN INPUT?
    return (
      <div>
        <input name='name' onChange={handleChange} placeholder="name" />
        <input name='surname' onChange={handleChange}  placeholder="surname" />
        <input name='descr' onChange={handleChange}  placeholder="descr" />

        <button type='button' onClick={handleClick} > BUBUT
        </button>
      
      <div className="list-of-tasks">

{tSklad.map((elem) => {return <div>

  {listFoo(elem)}</div>})
}


</div>
      </div>


    )
  

}



export default Sandbox4



