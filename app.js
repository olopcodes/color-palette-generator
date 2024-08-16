// variables ========================
const generatePaletteButton = document.querySelector(".color-btn");
const colorAlertEl = document.querySelector(".color-alert");
const colorAlertCopiedColor = document.querySelector(".color-alert span");
const colorItems = document.querySelectorAll(".color-item");
let colorPalette = [];

// functions ==========================
function generateRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateColorPalette() {
  // clear palette every time to run again
  colorPalette = [];

  // add new color to palette array
  while (colorPalette.length < 5) {
    const newColor = generateRandomColor();
    // check for duplicates
    const notDuplicateColor = checkForDuplicateColors(newColor);
    // if no duplicates add color to array
    if (notDuplicateColor) colorPalette.push(newColor);
  }

  //   console.log(colorPalette);
}

function checkForDuplicateColors(color) {
  const index = colorPalette.findIndex((oldColor) => oldColor === color);
  return index === -1 ? true : false;
}

function displayColorPalette() {
  colorItems.forEach((colorItem, index) => {
    colorItem.querySelector(".color-bg").style.backgroundColor =
      colorPalette[index];
    colorItem.querySelector(".color-title").textContent = colorPalette[index];
    colorItem.dataset.color = `${colorPalette[index]}`;
  });
}

function handleColorItemClick(e) {
  // going up dom to get li of what is clicked and getting color
  const copiedColor = e.target.closest("li").dataset.color;
  //   copy color to clipboard
  navigator.clipboard.writeText(copiedColor);

  //   change the text in color copied alert
  colorAlertCopiedColor.textContent = copiedColor;

  // show user the alert and remove
  colorAlertEl.classList.add("show");
  setTimeout(() => colorAlertEl.classList.remove("show"), 1500);
}

function handleKeyPress(e) {
  if (e.key === " ") app();

  if (e.key === "c") {
    navigator.clipboard.writeText(colorPalette.join(" , "));
  }
}

function app() {
  generateColorPalette();
  displayColorPalette();
}

app();

// event listener ===============================
generatePaletteButton.addEventListener("click", app);

colorItems.forEach((colorItem) => {
  colorItem.addEventListener("click", handleColorItemClick);
});

window.addEventListener("keypress", handleKeyPress);
