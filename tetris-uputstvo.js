document.addEventListener("DOMContentLoaded", function(){
    function drawBlock(block, canvas, color){
        let context = canvas.getContext("2d");
        context.clearRect(0, 0, canvas.width, canvas.height);
        for(let row = 0; row < block.length; row++){
            for(let col = 0; col < block[row].length; col++){
                if(block[row][col]){
                    context.fillStyle = color;
                    context.fillRect(col * 20, row * 20, 20, 20);
                }
            }
        }
    }

    drawBlock([[1,1,1,1]], document.getElementById("I"), "lightblue");
    drawBlock([[1,0,0],[1,1,1]], document.getElementById("J"), "blue");
    drawBlock([[0,0,1],[1,1,1]], document.getElementById("L"), "orange");
    drawBlock([[1,1],[1,1]], document.getElementById("O"), "yellow");
    drawBlock([[0,1,1],[1,1,0]], document.getElementById("S"), "lightgreen");
    drawBlock([[0,1,0],[1,1,1]], document.getElementById("T"), "purple");
    drawBlock([[1,1,0],[0,1,1]], document.getElementById("Z"), "red");
});

function play(){
    let level = document.getElementById("hardness").value;
    let blocks = "";
    if(document.getElementsByName("I")[0].checked){
        blocks += "I";
    }
    if(document.getElementsByName("J")[0].checked){
        blocks += "J";
    }
    if(document.getElementsByName("L")[0].checked){
        blocks += "L";
    }
    if(document.getElementsByName("O")[0].checked){
        blocks += "O";
    }
    if(document.getElementsByName("S")[0].checked){
        blocks += "S";
    }
    if(document.getElementsByName("T")[0].checked){
        blocks += "T";
    }
    if(document.getElementsByName("Z")[0].checked){
        blocks += "Z";
    }
    if(blocks.length <= 2){
        alert("At least three blocks must be selected!");
    }
    else{
        sessionStorage.setItem("level", level);
        sessionStorage.setItem("blocks", blocks);
        window.location.href = "tetris-igra.html";
    }
}