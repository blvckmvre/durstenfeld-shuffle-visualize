const carrier = document.getElementById("carrier");
const start = document.getElementById("start");
const reset = document.getElementById("reset");
const speedRange = document.getElementById("speed");
const speedDisplay = document.getElementById("speed-display");

let speed = 100;

function displayArray(array) {
  carrier.innerHTML = "";
  for(let i = 0; i < array.length; i++) {
    carrier.insertAdjacentHTML("beforeend", `
      <div id="block-${array[i]}"></div>
    `);
  };
};

function highlightCurrentPair(current, toSwap) {
  const toSwapNode = document.getElementById(
    "block-" + toSwap
  );
  const currentNode = document.getElementById(
    "block-" + current
  );
  currentNode.classList.add("highlight-yellow");
  toSwapNode.classList.add("highlight-green");
  setTimeout(
    () => {
      currentNode.classList.remove(
        "highlight-yellow"
      );
      toSwapNode.classList.remove(
        "highlight-green"
      );
    }, speed
  );
};

function steppedShuffle(array, startBtn) {
  startBtn.disabled = true;
  for(let i = array.length - 1; i > 0; i--) {
    setTimeout(() => {
      let k = Math.floor(Math.random() * (i + 1));
      [array[i], array[k]] = [array[k], array[i]];
      displayArray(array);
      highlightCurrentPair(array[i], array[k]);
      if(i === array.length - 1) 
        startBtn.disabled = false;
    }, speed + speed * i);
  };
};

function displayInitialState() {
  const array = Array.from(
    { length: 20 }, 
    (_, i) => i + 1 
  );
  displayArray(array);
  return array;
};

function sortInPlace(array) {
  array.sort((a, b) => a - b);
  displayArray(array);
};

function handleSpeedChange(e) {
  speed = 500 / e.target.value;
  speedDisplay.innerHTML = e.target.value;
};

window.onload = () => {
  const array = displayInitialState();
  start.addEventListener(
    "click", 
    () => steppedShuffle(array, start)
  );
  reset.addEventListener(
    "click",
    () => sortInPlace(array)
  );
  speedRange.addEventListener(
    "change",
    handleSpeedChange
  );
}; 

