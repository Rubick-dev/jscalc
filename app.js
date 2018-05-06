var calcArray = []; //Array used to store the numerals pressed on the calc
var val = null; // the value of the current total
var val2 = 0; // the value of the user defined value to be calculated with val
var display = 0; // to display the main calc value
const buttons = document.querySelector('#wrapper'); //store the clcik event variable
var prevOp = null; // to remember the previous op for calculation on chained calcs
var buttonEnabled = true; // Switch between button enabled and disabled
// Event Listener to trigger a switch statement and fire the appropriate function logic.
buttons.addEventListener("click", calculate, false);

function calculate(e){
  if(e.target !== e.currentTarget){
    let testval = e.target.value;
  
    switch (testval) {
      case "clear":
        resetDisplay();
        console.log("registered pressing the " + testval + " button");
        break;
  
      case "*":
      case "/":
      case "-":
      case "+":
      runFraction(testval);
      console.log("registered pressing a " + testval);
        break;

      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "0":
        console.log("registered pressing a " + testval);
        showNumbers(testval);
        break;

      case ".":
        insertPoint(testval);
        console.log("registered pressing a " + testval);
        break;

      case "=":
        calculateResult(testval);
        console.log("registered pressing a " + testval);
        break;
    }
  }
  e.stopPropagation();
};


// Clear Button Function
function resetDisplay() {
  display = 0;
  calcArray = [];
  val = null;
  prevOp = null;
  buttonEnabled = true;
  document.getElementById("result").innerHTML = display;
  document.getElementById("miniResult").innerHTML = "";
};


// Numbers [0 - 9] button function
function showNumbers(num){
 if (buttonEnabled) {
    calcArray.push(num);
    console.log(calcArray + " is the current calc array");
    if (calcArray.length > 12){
      display = "Max 12 Digits";
      document.getElementById("result").innerHTML = display;
      calcArray = [];
      val = null;
    } else if (calcArray.length == 2 && calcArray[0] == 0 && calcArray[1] == 0) {
      console.log(calcArray.length + " test a " + calcArray[0]);
      calcArray.pop();
      console.log("Removing the duplicate 0's at the start of calc array, only 1 permitted")
    } else if (calcArray[0] == 0 && calcArray.length > 1 && calcArray[1] != "."){
      calcArray.shift();
      display = calcArray.join("");
      console.log(calcArray.join('') + " dealing with adding numbers with decimals");
      document.getElementById("result").innerHTML = display;
    } else {
      display = calcArray.join("");
      console.log(calcArray.join('') + " adding number to calcArray");
      document.getElementById("result").innerHTML = display;
    }
  }
};

// Point "." button function
function insertPoint(point) {
  if (buttonEnabled) {
    if(calcArray.indexOf(".") == -1) {
    calcArray.push(point);
    display = calcArray.join("");
    document.getElementById("result").innerHTML = display;
    console.log(calcArray.join('') + " added a point to array");
    }
  }
};

// Run Arithmatic logic upon arithmatic operatror button press
function runFraction(op){
  buttonEnabled = true;
  if (val === null && calcArray.length > 0) {
    val = calcArray.join('');
    calcArray = [];
    display = 0;
    prevOp = op;
    document.getElementById("result").innerHTML = display;
    document.getElementById("miniResult").innerHTML = "(" + op + ") " + val;
    console.log("A if statement");
  } else if (val && calcArray.length == 0){
    document.getElementById("miniResult").innerHTML = "(" + op + ") " + val;
    display = 0;
    prevOp = op;
    document.getElementById("result").innerHTML = display;
    console.log("B if statement");
  } else if (val === null && calcArray.length == 0) {
    console.log("C if statement");
  } else {
    val2 = calcArray.join('');
    calcArray = [];
    display = 0;
    document.getElementById("result").innerHTML = display;
    val = conductArithmatic(prevOp);
    console.log("calculate now " + val + " " + op + " " + val2);
    if (val !== null) {
      document.getElementById("miniResult").innerHTML = "(" + op + ") " + val;
      prevOp = op;
      }
    console.log("D if statement");
  }
};

// Carry out Arithmatic calculation based on user entries
function conductArithmatic(op) {
  switch (op) {
    case "+":
      let addVal = (+val + +val2);
      if (addVal.toString().length > 12) {
        return displayError();
      } else 
      return addVal;

    case "/":
      let divVal = (+val / +val2);
      if (divVal.toString().length > 12) {
      return displayError();
      } else 
      return divVal;

    case "*":
      let mulVal = (+val * +val2);
      if (mulVal.toString().length > 12) {
        return displayError();
      } else 
      return mulVal;

    case "-":
      let minVal = (+val - +val2);
      if (minVal.toString().length > 12) {
        return displayError();
      } else 
      return minVal;
  }
};


// On pressing the = button
function calculateResult(op) {
  if (val && calcArray.length > 0) {
    val2 = calcArray.join('');
    console.log(val + " val1 <-- and val2 --> " + val2 + " being calculated now");
    display = conductArithmatic(prevOp);
    console.log(display + " this is the post arithmatic value after the equals button is pressed");
    if (val !== null) {
      document.getElementById("result").innerHTML = display;
      document.getElementById("miniResult").innerHTML = "";
      val = display;
      calcArray = [];
      display = 0;
      val2 = 0;
      prevOp = null;
      document.getElementById("miniResult").innerHTML = "";
      buttonEnabled = false;
    } else {
      console.log(" the value of val was null")
    }
  }
  console.log("= sign button logic has just run");
};

// Displays the broken calculator error when numbers exceed limits
function displayError(){
  display = "Calc Broke!";
  document.getElementById("result").innerHTML = display;
  document.getElementById("miniResult").innerHTML = "";
  calcArray = [];
  val2 = 0;
  display = 0;
  prevOp = null;
  return val = null;
};