let blocks = {
    "I": [[1,1,1,1]], 
    "J": [[1,0,0],[1,1,1]], 
    "L": [[0,0,1],[1,1,1]], 
    "O": [[1,1],[1,1]], 
    "S": [[0,1,1],[1,1,0]], 
    "T": [[0,1,0],[1,1,1]], 
    "Z": [[1,1,0],[0,1,1]]
}
let colors = {
    "I": "lightblue", 
    "J": "blue", 
    "L": "orange", 
    "O": "yellow", 
    "S": "lightgreen", 
    "T": "purple", 
    "Z": "red"
}

let results = [
    {
        ime: "AVucic", 
        score: "100"
    }
];

let options = sessionStorage.getItem("blocks").split("");
let canvas;
let context;
let canvasNext;
let contextNext;
let currentBlock;
let nextBlock;
let currentColor;
let nextColor;
let x = 140;
let y = 0;
let gameArea;
let score = 0;
let gameInterval;
let time = 0;

function randomBlock(){
    let randomKey = options[Math.floor(Math.random() * options.length)];
    currentColor = colors[randomKey];
    return blocks[randomKey];
}

function randomBlock2(){
    let randomKey = options[Math.floor(Math.random() * options.length)];
    nextColor = colors[randomKey];
    return blocks[randomKey];
}

function createGameArea(){
    let area = [];
    for(let i = 0; i < canvas.height / 20; i++){
        area.push(new Array(canvas.width / 20).fill(null));
    }
    return area;
}

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawGameArea();
    drawBlock();
}

function drawBlock(){
    for(let row = 0; row < currentBlock.length; row++){
        for(let col = 0; col < currentBlock[row].length; col++){
            if(currentBlock[row][col]){
                context.fillStyle = currentColor;
                context.fillRect(x + col * 20, y + row * 20, 20, 20);
            }
        }
    }
}

function drawGameArea(){
    for(let row = 0; row < gameArea.length; row++){
        for(let col = 0; col < gameArea[row].length; col++){
            if(gameArea[row][col]){
                context.fillStyle = gameArea[row][col];
                context.fillRect(col * 20, row * 20, 20, 20);
            }
        }
    }
}

function drawNextBlock(){
    contextNext.clearRect(0, 0, canvasNext.width, canvasNext.height);
    for(let row = 0; row < nextBlock.length; row++){
        for(let col = 0; col < nextBlock[row].length; col++){
            if(nextBlock[row][col]){
                contextNext.fillStyle = nextColor;
                contextNext.fillRect(20 + col * 20, 40 + row * 20, 20, 20)
            }
        }
    }
}

function mergeBlock(){
    for(let row = 0; row < currentBlock.length; row++){
        for(let col = 0; col < currentBlock[row].length; col++){
            if(currentBlock[row][col]){
                let areaRow = y / 20 + row;
                let areaCol = x / 20 + col;
                gameArea[areaRow][areaCol] = currentColor;
            }
        }
    }
}

function drawGrid(){
    for(let row = 0; row < canvas.height / 20; row++) {
        for(let col = 0; col < canvas.width / 20; col++) {
            context.strokeRect(col * 20, row * 20, 20, 20);
        }
    }
}

function drawNextGrid(){
    for(let row = 0; row < canvasNext.height / 20; row++) {
        for(let col = 0; col < canvasNext.width / 20; col++) {
            contextNext.strokeRect(col * 20, row * 20, 20, 20);
        }
    }
}

function canMoveDown(){
    for(let row = 0; row < currentBlock.length; row++){
        for(let col = 0; col < currentBlock[row].length; col++){
            if(currentBlock[row][col]){
                const areaRow = y / 20 + row + 1;
                const areaCol = x / 20 + col;
                if(areaRow >= gameArea.length || gameArea[areaRow][areaCol]){
                    return false;
                }
            }
        }
    }
    return true;
}

function removeRows(){
    for(let row = gameArea.length - 1; row >= 0; row--){
        if(!gameArea[row].includes(null)){
            gameArea.splice(row, 1);
            gameArea.unshift(new Array(canvas.width / 20).fill(null));
            row++;
            if(document.getElementById("level").innerHTML == "EASY"){
                score += 10 * options.length;
            }
            if(document.getElementById("level").innerHTML == "INTERMEDIATE"){
                score += 20 * options.length;
            }
            if(document.getElementById("level").innerHTML == "HARD"){
                score += 30 * options.length;
            }
            document.getElementById("score").innerHTML = score;
        }
    }
}

function fallDown(){
    if(canMoveDown()){
        y += 20;
        draw();
    }
    else{
        mergeBlock();
        removeRows();
        currentBlock = nextBlock;
        currentColor = nextColor;
        nextBlock = randomBlock2();
        x = 140;
        y = 0;
        if(gameArea[1][7] || gameArea[1][8] || gameArea[1][9]){
            let name = prompt("Game over! Your score is " + document.getElementById("score").innerHTML + ". Please enter your name. ");
            results.push({ime: name, score: document.getElementById("score").innerHTML});
            localStorage.setItem("results", JSON.stringify(results));
            clearInterval(gameInterval);
            window.location.href = "tetris-rezultati.html";
        }
        else{
            if(time >= 110){
                time -= 10;
                clearInterval(gameInterval);
                gameInterval = setInterval(fallDown, time);
            }
            draw();
            drawNextBlock();
            drawNextGrid();
        }
    }
}

function moveLeft(){
    if(x >= 20){
        x -= 20;
        draw();
    }
}

function moveRight(){
    if(x + 20 * currentBlock[0].length <= 300){
        x += 20;
        draw();
    }
}

function moveDown(){
    if(canMoveDown()){
        y += 20;
        draw();
    }
}

function rotateCounterclockwise(){
    let rotatedBlock = [];
    for(let col = currentBlock[0].length - 1; col >= 0; col--){
        let newRow = [];
        for(let row = 0; row < currentBlock.length; row++){
            newRow.push(currentBlock[row][col]);
        }
        rotatedBlock.push(newRow);
    }
    currentBlock = rotatedBlock;
    draw();
}

function rotateClockwise(){
    let rotatedBlock = [];
    for(let col = 0; col < currentBlock[0].length; col++){
        let newRow = [];
        for(let row = currentBlock.length - 1; row >= 0; row--){
            newRow.push(currentBlock[row][col]);
        }
        rotatedBlock.push(newRow);
    }
    currentBlock = rotatedBlock;
    draw();
}

function startGame(){
    if(localStorage.getItem("results")){
        results = JSON.parse(localStorage.getItem("results"));
    }
    else{
        localStorage.setItem("results", JSON.stringify(results));
    }
    document.getElementById("level").innerHTML = sessionStorage.getItem("level");
    draw();
    drawNextBlock();
    drawNextGrid();
    if(sessionStorage.getItem("level") == "EASY"){
        time = 500;
    }
    if(sessionStorage.getItem("level") == "INTERMEDIATE"){
        time = 350;
    }
    if(sessionStorage.getItem("level") == "HARD"){
        time = 150;
    }
    gameInterval = setInterval(fallDown, time);
}

document.addEventListener("DOMContentLoaded", function(){
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    canvasNext = document.getElementById("next");
    contextNext = canvasNext.getContext("2d");

    currentBlock = randomBlock();
    nextBlock = randomBlock2();
    gameArea = createGameArea();

    document.addEventListener("keydown", function(event){
        if(event.key == "ArrowLeft"){
            moveLeft();
        }
        if(event.key == "ArrowRight"){
            moveRight();
        }
        if(event.key == "ArrowDown"){
            moveDown();
        }
        if(event.key == "A" || event.key == "a"){
            rotateCounterclockwise();
        }
        if(event.key == "D" || event.key == "d"){
            rotateClockwise();
        }
    });

    startGame();
})