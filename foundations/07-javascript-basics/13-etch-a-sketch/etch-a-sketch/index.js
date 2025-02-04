const PAD_WIDTH = 960;
const DEFAULT_NUM_SQUARES_PER_SIDE = 4;
const MIN_NUM_SQUARES_PER_SIDE = 1;
const MAX_NUM_SQUARES_PER_SIDE = 100;
const NUM_RGB_VALUES = 16_777_215;
const BASE = 16;
const MAX_OPACITY = 1.0;
const OPACITY_STEP = 0.1;

function getRandomColour() {
  return Math.floor(Math.random() * NUM_RGB_VALUES).toString(BASE);
}

function clearPad(numSquaresPerSide=DEFAULT_NUM_SQUARES_PER_SIDE) {
  const pad = document.querySelector(".pad");
  pad.textContent = "";
  const totalNumSquares = numSquaresPerSide ** 2;
  for (let i = 0; i < totalNumSquares; i++) {
    const square = document.createElement("div");
    square.setAttribute("class", "square");
    const width = PAD_WIDTH / numSquaresPerSide;
    const height = width;
    square.style.height = `${height}px`;
    square.style.width = `${width}px`;

    square.addEventListener("mouseover", () => {
      square.style.backgroundColor = `#${getRandomColour()}`;
      const currentOpacity = Number(square.style.opacity);
      if (currentOpacity < MAX_OPACITY) {
        square.style.opacity = currentOpacity + OPACITY_STEP;
      }
    });

    pad.appendChild(square);
  }
}

function initialisePad() {
  const clear = document.querySelector(".clear");
  clear.addEventListener("click", () => {
    let numSquaresPerSide;
    do {
      numSquaresPerSide = Number(prompt("Number of squares per side: "));
    } while(Number.isNaN(numSquaresPerSide) || 
    (numSquaresPerSide < MIN_NUM_SQUARES_PER_SIDE || 
      numSquaresPerSide > MAX_NUM_SQUARES_PER_SIDE));

    clearPad(numSquaresPerSide);
  })

  clearPad();
}

initialisePad();