let results = [];
let resultsMatrix = [];
let ime;

function sort(matrix){
    for(let i = 0; i < matrix.length - 1; i++){
        for(let j = i + 1; j < matrix.length; j++){
            if(matrix[i][1] < matrix[j][1]){
                let temp = matrix[i];
                matrix[i] = matrix[j];
                matrix[j] = temp;
            }
        }
    }
}

function fillAllResults(matrix){
    if(matrix.length >= 1){
        document.getElementById("name1").innerHTML = matrix[0][0];
        document.getElementById("score1").innerHTML = matrix[0][1];
    }
    else{
        document.getElementById("name1").innerHTML = "";
        document.getElementById("score1").innerHTML = "";
    }
    if(matrix.length >= 2){
        document.getElementById("name2").innerHTML = matrix[1][0];
        document.getElementById("score2").innerHTML = matrix[1][1];
    }
    else{
        document.getElementById("name2").innerHTML = "";
        document.getElementById("score2").innerHTML = "";
    }
    if(matrix.length >= 3){
        document.getElementById("name3").innerHTML = matrix[2][0];
        document.getElementById("score3").innerHTML = matrix[2][1];
    }
    else{
        document.getElementById("name3").innerHTML = "";
        document.getElementById("score3").innerHTML = "";
    }
    if(matrix.length >= 4){
        document.getElementById("name4").innerHTML = matrix[3][0];
        document.getElementById("score4").innerHTML = matrix[3][1];
    }
    else{
        document.getElementById("name4").innerHTML = "";
        document.getElementById("score4").innerHTML = "";
    }
    if(matrix.length >= 5){
        document.getElementById("name5").innerHTML = matrix[4][0];
        document.getElementById("score5").innerHTML = matrix[4][1];
    }
    else{
        document.getElementById("name5").innerHTML = "";
        document.getElementById("score5").innerHTML = "";
    }
}

document.addEventListener("DOMContentLoaded", function(){
    if(localStorage.getItem("results") == null){
        results = [];
    }
    else{
        results = JSON.parse(localStorage.getItem("results"));
    }
    ime = results[results.length - 1].ime;
    score = results[results.length - 1].score;

    for(let i = 0; i < results.length; i++){
        let newRow = [results[i].ime, parseInt(results[i].score)];
        resultsMatrix.push(newRow);
    }

    sort(resultsMatrix);
    fillAllResults(resultsMatrix);
    document.getElementById("name").innerHTML += ime;
    document.getElementById("score").innerHTML += score;
})