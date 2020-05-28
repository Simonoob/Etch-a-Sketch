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
let paintMode="off";

//events
submitButton.addEventListener("click",InizializeGrid);
clearCanva.addEventListener("click",clearGrid);
randomColorButton.addEventListener("click",ToggleRandomColor);
paintModeButton.addEventListener("click",TogglePaintMode);
//functions

let mouseDown = 0;
document.body.onmousedown = function() { 
  mouseDown=+2;
  console.log(mouseDown);
}
document.body.onmouseup = function() {
  mouseDown-=2;
}


function InizializeGrid(e){
    //input validation
    e.preventDefault();
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
        e.target.style.backgroundColor=currentColor;
    }
    if (paintMode=="off"){
        e.target.style.backgroundColor=currentColor;
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
    if (paintMode==="off"){
        paintMode="on";
        paintModeButton.textContent="click-and-drag mode: on";
    }
    else{
        paintMode="off";
        paintModeButton.textContent="click-and-drag mode: off";
    }
}