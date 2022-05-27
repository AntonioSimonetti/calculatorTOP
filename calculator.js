const add = function(a, b) {
    return a + b;
  };
  
  const subtract = function(a, b) {
    return a - b;
  };
  
  const sum = function(array) {
    return array.reduce((total, current) => total + current, 0);
  };
  
  const multiply = function(array) {
      return array.length
        ? array.reduce((accumulator, nextItem) => accumulator * nextItem)
        : 0;
  };


const domEle = function () {
    let take = document.getElementById("btn").textContent;
    console.log(take);
    let display = document.getElementById("displayCalculator");
    display.innerHTML = take;
}

  
  /* const power = function(a, b) {
    return Math.pow(a, b);
  }; */