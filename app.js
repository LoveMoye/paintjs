// canvas tag in html
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_STYLE = "2c2c2c";
const CANVAS_SIZE = 700;

// define pixel modifier
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.strokeStyle = INITIAL_STYLE;;
ctx.fillStyle = INITIAL_STYLE;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    if(!filling) {
        const x = event.offsetX;
        const y = event.offsetY;
        if(!painting) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
    }
}


function handleColorChange(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.valueAsNumber;
    ctx.lineWidth = size;
}

function handleModeClick(event) {
    if(filling) {
        filling = false;
        mode.textContent = "Fill"
    } else {
        filling = true;
        mode.textContent = "Paint";
    }
}

function handleCanvasColor(event) {
    if(filling) {ctx.fillRect(0,0,canvas.width,canvas.height);}
}

function handleSaveImg(event) {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "image";
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasColor);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorChange));

if(range) {
    range.addEventListener("input", handleRangeChange)
}

if(mode) {
    mode.addEventListener("click", handleModeClick)
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveImg)
}