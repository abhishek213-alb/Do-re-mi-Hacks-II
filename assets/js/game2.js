var cardContainer = document.getElementById("card-container");
var card = document.getElementsByClassName("card");
var container = document.getElementById("container");
var instrumentImage = document.getElementById("instrument-img");
var completedBtn = document.getElementById("completed-btn");
var completed = document.getElementById("completed");

var optn1 = document.getElementById("optn1");
var optn2 = document.getElementById("optn2");
var optn3 = document.getElementById("optn3");
var optn4 = document.getElementById("optn4");

var opt = document.getElementsByName("ans");

const img = ['1', '2', '3', '4', '5'];
const ans = ['3', '4', '2', '3', '2']; //correct options
const options = [['Guitar', 'Violin', 'Sitar', 'Mandollin'], ['Flute', 'French Horn', 'Bagpipe', 'Trumpet'], ['Gong', 'French Horn', 'Saxophone', 'Bagpipe'], ['Bongo Drum', 'Snare Drum', 'Gong', 'Conga Drums'], ['Piano', 'Harpsichord', 'Organ', 'Chimes']];

const size = 5;

var imgIdx = 0;
var optIdx = 0;
let score = 0;

completed.style.visibility = "hidden";

function loadImg(imgIdx){
    instrumentImage.src = `/img/${img[imgIdx]}.jpg`;
}

function clickedNext(input){

    if(input == ans[imgIdx]){
        score++;
    }

    if(imgIdx == size-1){
        cardContainer.style.visibility = "hidden";
        completed.style.visibility = "visible";
        completedBtn.value = score;
    }

    imgIdx++;
    optIdx++;

    optn1.innerText = options[optIdx][0];
    optn2.innerText = options[optIdx][1];
    optn3.innerText = options[optIdx][2];
    optn4.innerText = options[optIdx][3];

    for(i=0; i<opt.length; i++){
        opt[i].checked = false;
    }
    
    loadImg(imgIdx);
}