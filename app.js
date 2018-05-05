// Variables
var calcArray = [];
var val = -1;
var val2 = 0;
var display = 0;
var display2;
var buttons = document.querySelector('#wrapper');
var prevOp;

// Event Listener to trigger a switch statement and fire the appropriate function logic.
buttons.addEventListener("click", calculate, false);

function calculate(e){
  if(e.target !== e.currentTarget){
    let testval = e.target.value;
  
    switch (testval) {
      case "clear":
        display = 0;
        calcArray = [];
        val = -1;
        resetDisplay(display);
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
        console.log("registered pressing a " + testval);
        break;
    }
  }
  e.stopPropagation();
};


// Clear Button Function
function resetDisplay(clear) {
  document.getElementById("result").innerHTML = clear;
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


function runFraction(op){
  if (val < 0) {
    val = calcArray.join('');
    calcArray = [];
    display = calcArray.join("");
    prevOp = op;
    document.getElementById("result").innerHTML = display;
    document.getElementById("miniResult").innerHTML = val + " (" + op + ")";
  } else if (calcArray.length == 0){
    document.getElementById("miniResult").innerHTML = val + " (" + op + ")";
    prevOp = op;
  } else {
    val2 = calcArray.join('');
    calcArray = [];
    display = 0;
    document.getElementById("result").innerHTML = display;
    val = conductArithmatic(prevOp);
    console.log("calculate now " + val + " " + op + " " + val2);
    document.getElementById("miniResult").innerHTML = val + " (" + op + ")";
    prevOp = op;
  }
};

// Carry out Arithmatic based on user entries
function conductArithmatic(op) {
  switch (op) {
    case "+":
      return (+val + +val2);

    case "/":
      return (+val / +val2);

    case "*":
      return (+val * +val2);

    case "-":
      return (+val - +val2);

  }
};


