// On Click On the Toggle Menu
let toggleMenu = document.querySelector(".toggle-menu");
let menu = document.querySelector("header .links .menu");
let link = document.querySelectorAll("header .links .menu li a");
let toggleLines = document.querySelectorAll("header .toggle-menu .line");

console.log(link);
let click = true;

toggleMenu.onclick = function (e) {
    if (click) {
        click = false;
        for (let i = 0; i < toggleLines.length; i++) {
            toggleLines[i].classList.add("line-move");
        }
        toggleLines[0].classList.add("line12-rotate");
        toggleLines[1].classList.add("line12-rotate");
        toggleLines[2].classList.add("line3-rotate");
        menu.classList.add("menu-clicked");
    } else {
        click = true;
        for (let i = 0; i < toggleLines.length; i++) {
            toggleLines[i].classList.remove("line-move");
        }
        toggleLines[0].classList.remove("line12-rotate");
        toggleLines[1].classList.remove("line12-rotate");
        toggleLines[2].classList.remove("line3-rotate");
        menu.classList.remove("menu-clicked");
    }
};

// Hide the Menu On Click
menu.onclick = function () {
    setTimeout(() => {
        menu.classList.remove("menu-clicked");
    }, 200);
    for (let i = 0; i < toggleLines.length; i++) {
        toggleLines[i].classList.remove("line-move");
    }
    toggleLines[0].classList.remove("line12-rotate");
    toggleLines[1].classList.remove("line12-rotate");
    toggleLines[2].classList.remove("line3-rotate");
    click = true;
}

// Start Timer Functionality

let timerText = document.querySelector(".home .circle .time");
let timerMinutes = 30;
let timerSeconds = 0;
let allTime = timerMinutes * 60 + timerSeconds;
let allTimeNow = allTime;
let startBtn = document.querySelector(".home .control-buttons .start-btn");
let editBtn = document.querySelector(".home .control-buttons .edit-btn");
let prograssPar = document.querySelector("#progress");
let timerStart = false;

startBtn.addEventListener("click", function() {
    if(timerStart){
        startBtn.textContent = "Start";
        timerStart = false;
        stopTimer();
    }else {
        startTimer();
        startBtn.textContent = "Stop";
        timerStart = true;
    }
});

function startTimer(stop) {
    if (stop) {
        console.log("stoped");
        clearInterval(timerInterval);
    }else {
        timerInterval = setInterval(() => {
        countTime();
        if(timerMinutes < 10 && timerSeconds < 10) {
            timerText.textContent = `0${timerMinutes}:0${timerSeconds}`;
        } else if (timerMinutes < 10) {
            timerText.textContent = `0${timerMinutes}:${timerSeconds}`;
        } else if (timerSeconds < 10) {
            timerText.textContent = `${timerMinutes}:0${timerSeconds}`;
        } else {
            timerText.textContent = `${timerMinutes}:${timerSeconds}`;
        }
        
    }, 1000);
    };
    
};

function countTime() {
    if(timerMinutes < 1 && timerSeconds < 1) {
        timerCompleted();
    }
    if(timerSeconds < 1) {
        timerMinutes -= 1;
        timerSeconds = 59;
    }else {
        timerSeconds -= 1;
    };
    prograssPrecentege();
};
function stopTimer() { 
    startTimer(true);
};
function prograssPrecentege() {
    allTimeNow = timerMinutes * 60 + timerSeconds;;
    let precentege = allTimeNow / allTime;
    let prograssPos = precentege * 280;
    prograssPar.style.strokeDashoffset = prograssPos;
}