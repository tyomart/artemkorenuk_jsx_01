class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        input: '',
        result: '0',
        decimalAllowed: true
      };
      this.handleClear = this.handleClear.bind(this);
      this.handleEquals = this.handleEquals.bind(this);
      this.handleDecimals = this.handleDecimals.bind(this);
      this.handleOperators = this.handleOperators.bind(this);
      this.handleNumbers = this.handleNumbers.bind(this);
    }
    
    handleClear() {
      this.setState({
        input: '',
        result: '0',
        decimalAllowed: true
      });
    }
    
    handleEquals() {
      //if last char is a decimal point or an operator - remove it
      let input = this.state.input.replace(/(\.|[+\-*/]|[+\-*/]\.)$/, "");
      
      const evaluateResult = () => {
        return eval(input);
      };
      
      const roundIfDecimal = (number) => {
        return Number.isInteger(number) ? number : parseFloat(number.toFixed(4));
      };
      
      /* Fix */
      const result = roundIfDecimal(evaluateResult())
      this.setState({
        input: input + '=' + result,
        result: result
      });
      
      // What is this hackery?
     // setTimeout(() => {this.setState({input: this.state.input + "=" + this.state.result})}, 10); //dealing with asynchrony
    }
    
    handleDecimals() {
      //start new expession
      if(this.state.input.includes("=")) {
        this.setState({
          input: '0.',
          result: '0.',
          decimalAllowed: false
        }); 
      }
      //add decimal point
      else if(this.state.decimalAllowed) {
        let result = this.state.result.replace(/[+\-*/]/, "") + '.';
        this.setState({
          input: this.state.result === '0' ? 0 + '.' : this.state.input + '.',
          result: result,
          decimalAllowed: false
        });
      }
    }
    
    handleOperators(e) {
      const getLastChar = () => {
        return this.state.input[this.state.input.length - 1];
      };
      
      const lastCharIsOperator = () => {
        return /[+\-*/]/.test(getLastChar());
      };
          
      const lastCharIsDecimalPoint = () => {
        return /[\.]/.test(getLastChar());
      };
      
      const removeLastChar = () => {
        return this.state.input.split("").slice(0, this.state.input.length - 1).join("");
      };
      
      let operator = e.target.value;
      let input;
      
      // an expression can not start with an operator
      if(this.state.result === '0') {
        input = 0 + operator;   
      }
      
      // an expression can not have two operators or decimal point and operator in a row
      else if(lastCharIsOperator() || lastCharIsDecimalPoint()) {
        input = removeLastChar() + operator;
      } 
      
      // pressing an operator immediately following = should start a new calculation that operates on the result of the previous evaluation
      else if(this.state.input.includes("=")) {
        input = this.state.input.match(/[^=]+$/)[0] + operator;
      }
      
      else {
        input = this.state.input + operator;
      }
      
      this.setState({
        input: input,
        result: operator,
        decimalAllowed: true
      });
    }
    
    handleNumbers(e) {
      let digit = e.target.value;
      let result;
      let input;
      
      // integers shouldn't start with 0
      if(this.state.result === '0') {
        input = digit.toString();
        result = input;
        this.setState({input: input, result: result});
      } 
      
      //add digit
      else if(this.state.result.length < 10) {
        input = this.state.input + digit.toString();
        result = this.state.result.replace(/[+\-*/]/, "") + digit.toString();
        this.setState({input: input, result: result});
      }
      
      //limit digit count
      else {
        result = this.state.result;
        this.setState({
          result: 'DIGIT LIMIT'
        });
        setTimeout(() =>{this.setState({result: result});}, 500);
      }
    }
    
    render() {
      return(
        <div id="calculator">
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
          <div id="screen">
            <Clear handleClear={this.handleClear}/>
            <div id="displays">
              <InputDisplay input={this.state.input}/>
              <ResultDisplay result={this.state.result}/>
            </div>
          </div>
          <div id="buttons">
            <MainButtons handleNumbers={this.handleNumbers} handleDecimals={this.handleDecimals} handleEquals={this.handleEquals}/>
            <OperatorsButtons handleOperators={this.handleOperators}/>
          </div>
        </div>
      );
    }
  }
  
  const Clear = (props) => {
    return(
      <button id="clear" onClick={props.handleClear}>AC</button>
    );
  };
  
  const InputDisplay = (props) => {
    return(
      <div id="input">{props.input}</div>
    );
  };
  
  const ResultDisplay = (props) => {
    return(
      <div id="display">{props.result}</div>
    );
  };
  
  const MainButtons = (props) => {
    const ids = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const buttons = ids.map((id, pos) => <button id={id} onClick={props.handleNumbers} value={pos}>{pos}</button>);
    return(
      <div id="buttonsGroup">{buttons.reverse()}<button id="decimal" onClick={props.handleDecimals}>.</button><button id="equals" onClick={props.handleEquals}>=</button></div>
    );   
  };
  
  const OperatorsButtons = (props) => {
    const  operators = [
      {name: "add", sign: "+"},
      {name: "subtract", sign: "-"},
      {name: "multiply", sign: "*"},
      {name: "divide", sign: "/"}
    ];
    const buttons = operators.map(operator => <button id={operator.name} onClick={props.handleOperators} value={operator.sign}>{operator.sign}</button>);
    return(
      <div id="operators">{buttons}</div>
    );
  };
  
  ReactDOM.render(<App/>, document.getElementById("root"));