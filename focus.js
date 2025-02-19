// On Click On the Toggle Menu
let toggleMenu = document.querySelector(".toggle-menu");
let menu = document.querySelector("header .links .menu");
let link = document.querySelectorAll("header .links .menu li a");
let toggleLines = document.querySelectorAll("header .toggle-menu .line");

let click = true;

toggleMenu.addEventListener("click", toggleMenuclick);
function toggleMenuclick() {
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
// Change Settings
let audioStatus = localStorage.getItem("audioOff");
const settingsBtn = document.getElementById("settings");
const settingsPopup = document.getElementById("settingsPopup");
const closePopupBtn = document.getElementById("closePopup");
const audioToggle = document.getElementById("audioToggle");

if (!audioStatus) {
    audioToggle.checked = true;
};
settingsBtn.onclick = function() {
    settingsPopup.style.display = "block";
}
audioToggle.onchange = function () {
    if (this.checked == true) {
        localStorage.removeItem("audioOff");
        audioStatus = false;
    } else {
        localStorage.setItem("audioOff", true);
        audioStatus = localStorage.getItem("audioOff");
    };

};
closePopupBtn.addEventListener("click", () => {
    settingsPopup.style.display = "none";
});

// Hide the Menu On Click
menu.addEventListener("click", HideTheMenu);
function HideTheMenu() {
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
let fullBtn = document.querySelector(".main .time-holder .full-btn")
let timerText = document.querySelector(".main .time-holder .time-text");
let startBtn = document.querySelector(".main .control-buttons .start-btn");
let editBtn = document.querySelector(".min .control-buttons .edit-btn");
let selectTimeEditBtn = document.querySelector(".main .control-buttons .edit-btn");
let selectTimeBox = document.querySelector(".main .control-buttons .edit-box");
let selectTimeIn = document.querySelector("#minutes-number");
let selectTimeSubmitButton = document.querySelector(".main .control-buttons .edit-box .submit");
let selectTimeExitButton = document.querySelector(".main .control-buttons .edit-box form .exit");
let headerSection = document.querySelector("header");
let footerSection = document.querySelector("footer");
let controlBtnSection = document.querySelector(".control-buttons");

let defaultTimeMin = localStorage.getItem("timeM");
let defaultTimeSec = localStorage.getItem("timeS");

let timerMinutes = 30;
let timerSeconds = 0;
let timerStart = false;
let breakTime = true;
let coundDwonAudio = new Audio('audio/countDown.mp3');
let coundDwonMAudio = new Audio('audio/countDownM.mp3');
let clickAudio = new Audio('audio/click.mp3');
let completedAudio = new Audio('audio/completed.mp3');


let allTime = timerMinutes * 60 + timerSeconds;

// On Click On Start Button
startBtn.addEventListener("click", function () {
    playClick();
    if (timerStart) {
        stopTimer();
    } else {
        hideAll();
        document.documentElement.requestFullscreen();
        startTimer();
        startBtn.textContent = "Stop";
        timerStart = true;
    }
});

// On The Time Start
function startTimer(stop) {
    if (stop) {
        clearInterval(timerInterval);
    } else {
        timerInterval = setInterval(() => {
            countTime();
            updateTimerText();
        }, 1000);
    };

};


function updateTimerText() {
    if (timerMinutes < 10 && timerSeconds < 10) {
        timerText.textContent = `0${timerMinutes}:0${timerSeconds}`;
    } else if (timerMinutes < 10) {
        timerText.textContent = `0${timerMinutes}:${timerSeconds}`;
    } else if (timerSeconds < 10) {
        timerText.textContent = `${timerMinutes}:0${timerSeconds}`;
    } else {
        timerText.textContent = `${timerMinutes}:${timerSeconds}`;
    }
}

// Count The Time
function countTime() {
    if (timerMinutes < 1 && timerSeconds < 1) {
        if (breakTime) {
            timerCompleted();
            breakTime = false;
        } else {
            timerCompleted();
            breakTime = true;
        }
    } else if (timerSeconds < 1) {
        timerMinutes -= 1;
        timerSeconds = 59;
        playCountM();
    } else {
        playCount();
        timerSeconds -= 1;
    };
    let timeout;
    document.addEventListener("mousemove", showMouse);
    function showMouse(){
        document.body.style.cursor = "default";
        controlBtnSection.style.display = "flex";
        fullBtn.style.display = "block";

        clearTimeout(timeout);
        timeout = setInterval(hideMouse, 2000);
    };

    function hideMouse() {
        document.body.style.cursor = "none";
        controlBtnSection.style.display = "none";
        fullBtn.style.display = "none";
    };
};
// Stop The Timer
function stopTimer() {
    startBtn.textContent = "Start";
    timerStart = false;
    startTimer(true);
};
// When The Time is Completed
function timerCompleted() {
    startTimer(true);
    startBtn.textContent = "Start";
    timerStart = false;
    if (breakTime) {
        if (allTime / 60 >= 50) {
            updateTime(10);
        } else {
            updateTime(5);
        }

    } else {
        document.body.classList.remove("break-time");
        workStatus.textContent = "Work Time";
        updateTime(30);
    }
    playCompleted();
}
// Updating the time
function updateTime(minutes) {
    timerMinutes = minutes;
    allTime = timerMinutes * 60 + timerSeconds;
    updateTimerText();
}
// Editing The Time
selectTimeEditBtn.onclick = () => {
    if (selectTimeBox.classList.contains("display-block")) {
        selectTimeBox.classList.remove("display-block");
    } else {
        selectTimeBox.classList.add("display-block");
    }
    playClick();
};
selectTimeExitButton.onclick = () => {
    if (selectTimeBox.classList.contains("display-block")) {
        selectTimeBox.classList.remove("display-block");
    };
    playClick();
};
selectTimeSubmitButton.onclick = function () {
    if (selectTimeIn.value < 5 || selectTimeIn.textContent > 1200) {
        let textWarning = document.createElement('div');
        textWarning.textContent = "It Must be bigger than 5 minutes"
        textWarning.style.cssText = "color: red; font-size: 14; wrap-content: wrap; margin-top: 10px;";
        selectTimeIn.style.color = "red";
        selectTimeBox.append(textWarning);
    } else {
        timerSeconds = 0;
        if (timerStart) {
            stopTimer();
        }
        updateTime(selectTimeIn.value);
        selectTimeBox.classList.remove("display-block");
    }
    playClick();
}


// Audio Functions
function playCount() {
    if (!audioStatus) {
    coundDwonAudio.play();
    }
};
function playCountM() {
    if (!audioStatus) {
    coundDwonMAudio.play();
    }
};
function playClick() {
    if(!audioStatus){
        clickAudio.play();
    }
    
};
function playCompleted() {
    completedAudio.play();
    
};

// Full Screen
function FullScreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
        showAll();
        // Change Screen Orientation
        if (window.innerWidth < 992) {
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock("portrait");
            };
        }
    } else {
        document.documentElement.requestFullscreen();
        hideElements();
        // Change Screen Orientation
        if (window.innerWidth < 992) {
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock("landscape");
            };
    };
}
};
fullBtn.addEventListener("click", FullScreen);

function hideElements() {
    headerSection.style.display = "none";
}

function displayElements() {
    headerSection.style.display = "flex";
}
function hideAll(){
    headerSection.style.display = "none";
    document.body.style.cursor = "none";
    controlBtnSection.style.display = "none";
    fullBtn.style.display = "none";
}
function showAll(){
    headerSection.style.display = "flex";
    document.body.style.cursor = "default";
    controlBtnSection.style.display = "flex";
    fullBtn.style.display = "block";
}