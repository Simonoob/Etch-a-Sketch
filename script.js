//selectors
const input=document.querySelector("#grid-input");
const submitButton=document.querySelector("#submit");
const error=document.querySelector("#error");
const gridContainer=document.querySelector("#grid-container");
const body=document.querySelector("body");
const root=document.documentElement;
const clearCanva=document.querySelector("#clear-grid");
let color=document.querySelector("#color");
let currentColor=color.value;
const randomColorButton=document.querySelector("#random-color");
let randomColorMode="off";
const paintModeButton=document.querySelector("#paint-mode");
let clickDragMode="off";
const eraserButton=document.querySelector("#eraser");
let eraserMode="off";

//events
submitButton.addEventListener("click",InizializeGrid);
clearCanva.addEventListener("click",clearGrid);
randomColorButton.addEventListener("click",ToggleRandomColor);
paintModeButton.addEventListener("click",TogglePaintMode);
eraserButton.addEventListener("click",ToggleEraser);
//functions

let mouseDown = 0;
document.body.onmousedown = function() { 
  mouseDown=+1;
}
document.body.onmouseup = function() {
  mouseDown-=1;
}


function InizializeGrid(e){
    //input validation
    e.preventDefault();

    if (input.value>150){
        console.log(input.value);
        input.value=150;
        console.log(input.value);
    }
 
    root.style.setProperty("--input",input.value);

    input.value===""? (addError(), setTimeout(() => {
        removeError()
    }, 3000)) : createGrid(input.value);
    //adding events to the squares
    const squares=document.querySelectorAll(".square");
    squares.forEach(square => {
        square.addEventListener("mousedown",changeColor);
        square.addEventListener("mouseenter",changeColor);
    });
}

function createGrid(selection){
    ResetGrid();
    gridContainer.classList.add("grid-active");

    for (let index = 0; index < (selection*selection); index++) {
        const square=document.createElement("div");
        square.classList.add("square");
        if (input.value>100){
            square.style.border="none";
        }
        square.setAttribute("id", `${index}`);
        gridContainer.appendChild(square);
    }
}

function addError(){
    error.classList.remove("inactive");
    error.classList.add("active");
}

function removeError(){
    error.classList.remove("active");
    error.classList.add("inactive");
}

function ResetGrid(){
    const squares= document.querySelectorAll(".square");
    for (let index = 0; index < squares.length; index++) {
        const element = squares[index];
        element.remove();
    }
}

function changeColor(e){
    if (randomColorMode==="on"){getRandomColor();}
    else {currentColor=color.value;}
    if (mouseDown){
        if (eraserMode==="on"){
            e.target.style.backgroundColor="transparent";
        }
        else{
            e.target.style.backgroundColor=currentColor;
        }
    }
    if (clickDragMode=="off"){
        if (eraserMode==="on"){
            e.target.style.backgroundColor="transparent";
        }
        else{
            e.target.style.backgroundColor=currentColor;
        }
    }
    e.target.onmousedown = function(){
        if (eraserMode==="on"){
            e.target.style.backgroundColor="transparent";
        }
        else{
            e.target.style.backgroundColor=currentColor;
        }
        }
}

function clearGrid(e){
    e.preventDefault();
    const squares=document.querySelectorAll(".square");
    squares.forEach(square => {
        square.style.backgroundColor="transparent";
    });
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    currentColor=color;
    return color;
}


function ToggleRandomColor(e){
    e.preventDefault();
    if (randomColorMode==="off"){
        randomColorMode="on";
        randomColorButton.textContent="Random color mode: on";
        randomColorButton.style.backgroundColor=getRandomColor();
    }
    else{
        randomColorMode="off";
        randomColorButton.textContent="Random color mode: off";
        randomColorButton.style.backgroundColor="rgba(182, 243, 201, 0.5)";
    }
}
function TogglePaintMode(e){
    e.preventDefault();
    if (clickDragMode==="off"){
        clickDragMode="on";
        paintModeButton.textContent="click-and-drag mode: on";
    }
    else{
        clickDragMode="off";
        paintModeButton.textContent="click-and-drag mode: off";
    }
}

function ToggleEraser(e){
    e.preventDefault();
    if (eraserMode==="off"){
        eraserMode="on";
        eraserButton.textContent="eraser: on";
    }
    else{
        eraserMode="off";
        eraserButton.textContent="eraser: off";
    }
}