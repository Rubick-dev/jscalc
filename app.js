// Variables
var calcArray = []; //Array used to store the numerals pressed on the calc
var val = null; // the value of the current total
var val2 = 0; // the value of the user defined value to be calculated with val
var display = 0; // to display the main calc value
var display2; //
var buttons = document.querySelector('#wrapper'); //store the clcik event variable
var prevOp; // to remember the previous op for calculation on chained calcs

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
  document.getElementById("result").innerHTML = display;
  document.getElementById("miniResult").innerHTML = "";
  
};


// Numbers [0 - 9] button function
function showNumbers(num){
  calcArray.push(num);
  console.log(calcArray);
  if (calcArray.length > 12){
    display = "Max 12 Digits";
    document.getElementById("result").innerHTML = display;
    calcArray = [];
  } else if (calcArray.length == 2 && calcArray[0] == 0 && calcArray[1] == 0) {
    console.log(calcArray.length + " test a " + calcArray[0]);
    calcArray.pop();
    console.log("Removing the duplicate 0's at the start of calc array, only 1 permitted")
  } else if (calcArray[0] == 0 && calcArray.length > 1 && calcArray[1] != "."){
    calcArray.shift();
    display = calcArray.join("");
    console.log(calcArray.join(''));
    document.getElementById("result").innerHTML = display;
  } else {
    display = calcArray.join("");
    console.log(calcArray.join(''));
    document.getElementById("result").innerHTML = display;
  }
};

// Point "." button function
function insertPoint(point) {
  // console.log(calcArray.indexOf("."));
  if(calcArray.indexOf(".") == -1) {
    calcArray.push(point);
    display = calcArray.join("");
    document.getElementById("result").innerHTML = display;
    console.log(calcArray.join(''));
  }
};

// Run Arithmatic logic upon arithmatic operatror button press
function runFraction(op){
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
    document.getElementById("miniResult").innerHTML = "(" + op + ") " + val;
    prevOp = op;
    console.log("D if statement");
  }
};

// Carry out Arithmatic calculation based on user entries
function conductArithmatic(op) {
  switch (op) {
    case "+":
      let arithVal = (+val + +val2);
      if (arithVal.toString().length > 12) {
        displayError();
        break;
      } else 
      return arithVal;

    case "/":
      return (+val / +val2);

    case "*":
      return (+val * +val2);

    case "-":
      return (+val - +val2);
  }
};

function calculateResult(op) {
  if (val && calcArray.length > 0) {
    val2 = calcArray.join('');
    display = conductArithmatic(prevOp);
    document.getElementById("result").innerHTML = display;

    calcArray = [];
    val = display;
    document.getElementById("miniResult").innerHTML = "";
    console.log("= sign statement logic ha just run");
  }
}


function displayError(){
  display = "Calc Broke!";
  document.getElementById("result").innerHTML = display;
  document.getElementById("miniResult").innerHTML = "";
  calcArray = [];
  val = null;
  val2 = 0;
  display = 0;
}