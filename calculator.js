/* This is the constructor function. It is called when a new instance of the Calculator class is
created. It also calls the clear() function because we need to have the calculator clear as soon as it is created*/
class Calculator {
  constructor(previousOperandTextElement,currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

/* The clear() function sets the currentOperand and previousOperand to an empty string and the operation to undefined */
  clear() {
    this.currentOperand = ``
    this.previousOperand = ``
    this.operation = undefined // No operation are selected if users clear the calculator
  }

  /* The delete() function deletes the last digit of the currentOperand */
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  /*Append number to the screen */
  appendNumber(number) {
    if (number === `.` && this.currentOperand.includes(`.`)) return          // Prevent user to push more than 1 "." , the function stop working with that return.
    this.currentOperand = this.currentOperand.toString()+ number.toString()  // we convert to string because if not JS 
  }                                                                          // will convert it as number and do 1+1 = 2 (add) instead of 1+1= 11(append)
 
  /*What happens when users click an operation button*/ 
  chooseOperation(operation) {
    if (this.currentOperand === ``) return    // prevent user to click more than 1 operand consecutively
    if (this.previousOperand !== ``) {        // compute the calculation if the user click another operand instead of the equal sign
      this.compute()                          //  and put the computed operation in the previoiusOperand with the operand selected 
    }
    this.operation = operation
    this.previousOperand = this.currentOperand  // When clicked the operand the number insde the currentOperand will be passed to previous operand and
    this.currentOperand = ``                    // the currentOperand is cleared and ready to receive the new number to do operation with
  }
  /* compute the operations in our calculator */
  compute() {
    let computation   // this is the result of the compute function
    const prev = parseFloat(this.previousOperand)      // convert string to number
    const current = parseFloat(this.currentOperand)       
    if(isNaN(prev) || isNaN(current)) return           // if the user click equal and there is nothing to compute, the function will not run
    switch (this.operation) {
      case `+` :
        computation = prev + current
        break
      case `-` :
        computation = prev - current
          break
      case `*` :
        computation = prev * current
        break
      case `÷` :
        computation = prev / current
        break
      default:                                           // if somehow invalid operations is selected, the function will not run
        return 
    }
    this.currentOperand = computation                    // pass the result of the computation to the currentOperand
    this.operation = undefined                           // after the computation is executed no operation is selected
    this.previousOperand = ``                            // clear the previous operand 
  }
  /* commas between values */
  getDisplayNumber(number) {
    const stringNumber = number.toString()          // convert the number to string, we need to split on the decimal character
    const integerDigits = parseFloat(stringNumber.split(`.`)[0])  // we take the integer number splitting the string into an array and taking the values before the "."
    const decimalDigits = stringNumber.split(`.`)[1]              // we take the decimal number splitting the string into an array and taking the values after the "."
    let integerDisplay                              // if integerDigit is NaN (if user input nothing or a decimal place) the integerDigit will be and empty string
    if (isNaN(integerDigits)) {
      integerDisplay = ``
    } else {
      integerDisplay = integerDigits.toLocaleString(`en`, {maximumFractionDigits: 0 }) // if interDigit is a number, will be converted to a string 
    }                                                                                  // and not decimalPlaces are allowed thanks to maximumFractionDigits 0
    if(decimalDigits != null) {                    // user input a period and have numbers after it
      return `${integerDisplay}.${decimalDigits}`  // we return the integerDisplay and the decimalDigits divided by a comma
    } else {
      return integerDisplay
    }
  }
  /* update the display in our calculator */
  updateDisplay () {
    this.currentOperandTextElement.innerText = 
     this.getDisplayNumber(this.currentOperand)
    if(this.operation != null) {                           // this show in the previousOperand the operator selected by the user
      this.previousOperandTextElement.innerText = 
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`            
      } else {
        this.previousOperandTextElement.innerText = ``      // clear the previousOperandTextElement when the calculations are done
      }
    }
 }

/* Selecting elements from the DOM. */ 
const numberButtons = document.querySelectorAll(`[data-number]`);
const operationButtons = document.querySelectorAll(`[data-operation]`);
const equalsButton = document.querySelector(`[data-equals]`);
const deleteButton = document.querySelector(`[data-delete]`);
const allClearButton = document.querySelector(`[data-all-clear]`);
const previousOperandTextElement = document.querySelector(`[data-previous-operand]`);
const currentOperandTextElement = document.querySelector(`[data-current-operand]`);

/* Creating a new instance of the Calculator class. */
const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

/* With this eventListner, every time a numberButton is clicked, the number inside the button will be passed to the appendNumber function
   and with updateDisplay, every time the user click, the display will be updated*/
numberButtons.forEach(button => {
  button.addEventListener(`click`, () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

/* With this eventListner, every time an  operationButton is clicked, the operation symbol inside the button will be passed to the chooseOperation function
   and with updateDisplay, every time the user click, the display will be updated*/
operationButtons.forEach(button => {
  button.addEventListener(`click`, () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
}) 

/* With this eventListner, every time the equal button is clicked, the compute function is called and the operations will be computed.
   after the computation, the display will be updated using the UpdateDisplay function*/
equalsButton.addEventListener(`click`, button => {
  calculator.compute()
  calculator.updateDisplay()
})

/* With this eventListner, every time the AC button is clicked, the clear function is executed  and the display will be updated using the UpdateDisplay function*/
allClearButton.addEventListener(`click`, button => {
  calculator.clear()
  calculator.updateDisplay()
})

/* With this eventListner, every time the DEL button is clicked, the delete function is executed and the display will be updated using the UpdateDisplay function*/
deleteButton.addEventListener(`click`, button => {
  calculator.delete()
  calculator.updateDisplay()
})

/* The function play() is called when the user clicks on the buttons. The function then finds the audio element in the HTML and plays it */
function play() {
  let audio = document.getElementById("audio");
  audio.play();
};
