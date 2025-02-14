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
let workStatus = document.querySelector(".home .circle .status");
let breakTime = true;

// On Click On Start Button
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

// On The Time Start
function startTimer(stop) {
    if (stop) {
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

// Count The Time
function countTime() {
    if(timerMinutes < 1 && timerSeconds < 1) {
        if(breakTime) {
            timerCompleted();
            breakTime = false;
        } else {
            timerCompleted();
            breakTime = true;
        }
        
    }
    if(timerSeconds < 1) {
        timerMinutes -= 1;
        timerSeconds = 59;
    }else {
        timerSeconds -= 1;
    };
    prograssPrecentege();
};
// Stop The Timer
function stopTimer() { 
    startTimer(true);
};
// Calculate the progress precentege
function prograssPrecentege() {
    allTimeNow = timerMinutes * 60 + timerSeconds;;
    let precentege = allTimeNow / allTime;
    let prograssPos = precentege * 280;
    prograssPar.style.strokeDashoffset = prograssPos;
};
// When The Time is Completed
function timerCompleted() {
    startTimer(true);
    startBtn.textContent = "Start";
    timerStart = false;
    if(breakTime) {
        workStatus.textContent = "Break Time";
        updateTime(5);
    }else {
        workStatus.textContent = "Work Time";
        updateTime(30);
    }
    
}
// Updating the time
function updateTime(minutes) {
    timerMinutes = minutes;
    allTime = timerMinutes * 60 + timerSeconds;
    allTimeNow = allTime;
    timerText.textContent = `${timerMinutes}:${timerSeconds}`;
}