// Variables
var calcArray = [];
var display = 0;
var buttons = document.querySelector('#wrapper');


// Click on buttons will make that number appear in the display area and store it in memory for later calculation
buttons.addEventListener("click", function(e){
  
  console.log("registering " + e.target.value);
  e.stopPropagation();
});

// Hit a button to add an operation to the equation

// Hit equals to calculate and display the calculator.

// Hit clear to reset the calculator