
const SandboxIn = (props) => {
  const {testObj, fontsize} = props
  // const { testProp } = testP
  const { keyName, keySurname } = testObj

  console.log('testobj',testObj, 'fontsize', fontsize)
  
  console.log(props)


  //const [ name,surname ] = testProp

 


 

return  <div>
          
  <div style={{fontSize:`${fontsize}`}}>
    <h5>Name: {keyName}</h5>
    <h5>Surname: {keySurname}</h5>
    <h1>fontsize={fontsize}</h1></div>
          <br/> 
          <br/> 
       </div>
}

export default SandboxIn


