const canvas = document.querySelector("canvas");
const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
//array로 주지않기때문에 배열을 생성해줘야한다.

const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraseBtn = document.getElementById("eraser-btn");
const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");
const saveBtn = document.getElementById("save");
const fontWidth = document.getElementById("font-width");

//conxtext 붓(브러쉬)
const ctx = canvas.getContext("2d");

//js에도 컨버스의 크기를 알려줘야함
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = lineWidth.value;
ctx.font = `${fontWidth.value}px sans-serif`;
ctx.lineCap = "round";

let isPainting = false;
let isFilling = false;

function onMove(event) {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting() {
  isPainting = true;
}
function cancelPainting() {
  isPainting = false;
}

function onLineWidthChange(event) {
  ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
  ctx.strokeStyle = event.target.value;
  ctx.fillStyle = event.target.value;
}

function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  ctx.strokeStyle = colorValue;
  ctx.fillStyle = colorValue;
  color.value = colorValue;
}

function onModeClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "Fill";
  } else {
    isFilling = true;
    modeBtn.innerText = "Draw";
  }
}

function onCanvasClick() {
  if (isFilling) {
    ctx.fillRect(0, 0, 800, 800);
  }
}

function onDestroy() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, 800, 800);
}

function onEraser() {
  ctx.strokeStyle = "white";
  isFilling = false;
  modeBtn.innerText = "Fill";
}

function onFileChange(event) {
  const file = event.target.files[0];

  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = function () {
    ctx.drawImage(image, 0, 0, 800, 800);
    fileInput.value = null;
  };
}

function onFontChange(event) {
  ctx.font = `${event.target.value}px sans-serif`;
}
function onDoubleClick(event) {
  const text = textInput.value;
  ctx.lineWidth = 1;
  if (text !== "") {
    ctx.fillText(text, event.offsetX, event.offsetY);
  }
}

function onSaveClick() {
  const url = canvas.toDataURL();
  const a = document.createElement("a");
  a.href = url;
  a.download = "myDrawing.png";
  a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroy);
eraseBtn.addEventListener("click", onEraser);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
fontWidth.addEventListener("change", onFontChange);

//----------------------------------------------------
// ctx.lineWidth = 2;

// const colors = [
//   "#ff3838",
//   "#ffb8b8",
//   "#c56cf0",
//   "#ff9f1a",
//   "#fff200",
//   "#32ff7e",
//   "#7efff5",
//   "#18dcff",
//   "#7d5fff",
// ];

// function onClick(event) {
//   ctx.beginPath();
//   ctx.moveTo(Math.floor(Math.random() * 800), Math.floor(Math.random() * 800));
//   const color = colors[Math.floor(Math.random() * colors.length)];
//   ctx.strokeStyle = color;
//   ctx.lineTo(event.offsetX, event.offsetY);
//   ctx.stroke();
// }

// canvas.addEventListener("click", onClick);

//setTimeout(()=> { ctx.fill()'},5000);

{
  /* <div
class="color-option"
style="background-color: #27ae60"
data-potato="#1abc9c"
></div> */
}
// data- 를 사용하면 안에 무슨 데이터든 넣을수 있다.
//dataset: DOMStringMap
// potator: "#1abc9c"   >> 이런식으로
