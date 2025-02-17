// On Click On the Toggle Menu
let toggleMenu = document.querySelector(".toggle-menu");
let menu = document.querySelector("header .links .menu");
let link = document.querySelectorAll("header .links .menu li a");
let toggleLines = document.querySelectorAll("header .toggle-menu .line");

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
let startBtn = document.querySelector(".home .control-buttons .start-btn");
let editBtn = document.querySelector(".home .control-buttons .edit-btn");
let prograssPar = document.querySelector("#progress");
let workStatus = document.querySelector(".home .circle .status");
let selectTimeEditBtn = document.querySelector(".home .control-buttons .edit-btn");
let selectTimeBox = document.querySelector(".home .control-buttons .edit-box");
let selectTimeIn = document.querySelector("#minutes-number");
let selectTimeSubmitButton = document.querySelector(".home .control-buttons .edit-box .submit");
let selectTimeExitButton = document.querySelector(".home .control-buttons .edit-box form .exit");

let defaultTimeMin = localStorage.getItem("timeM");
let defaultTimeSec = localStorage.getItem("timeS");

let timerMinutes = 30;
let timerSeconds = 0;
let timerStart = false;
let breakTime = true;

if (defaultTimeMin) {
    timerMinutes = parseInt(defaultTimeMin);
    timerSeconds = parseInt(defaultTimeSec);
    updateTimerText();
} else {
    timerMinutes = 30;
    timerSeconds = 0;
}

let allTime = timerMinutes * 60 + timerSeconds;
let allTimeNow = allTime;

// On Click On Start Button
startBtn.addEventListener("click", function() {
    if(timerStart){
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
        updateTimerText();
        updateLSV(30);
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
    startBtn.textContent = "Start";
    timerStart = false;
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
    updateLSV(30);
    if(breakTime) {
        workStatus.textContent = "Break Time";
        if(allTime / 60 >= 50) {
            updateTime(10);
        }else {
            updateTime(5);
        }
        
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
    timerText.textContent = `${timerMinutes}:00`;
}
// Editing The Time
selectTimeEditBtn.onclick = () => {
    if(selectTimeBox.classList.contains("display-block")) {
        selectTimeBox.classList.remove("display-block");
    }else {
        selectTimeBox.classList.add("display-block");
    }
    
};
selectTimeExitButton.onclick = () => {
    if (selectTimeBox.classList.contains("display-block")) {
        selectTimeBox.classList.remove("display-block");
    };
};
selectTimeSubmitButton.onclick = function() {
    if (selectTimeIn.value < 5 || selectTimeIn.textContent > 1200) {
        let textWarning = document.createElement('div');
        textWarning.textContent = "It Must be bigger than 5 minutes"
        textWarning.style.cssText = "color: red; font-size: 14; wrap-content: wrap; margin-top: 10px;";
        selectTimeIn.style.color = "red";
        selectTimeBox.append(textWarning);
    }else {
        timerSeconds = 0;
        if(timerStart){
            stopTimer();
        }
        updateTime(selectTimeIn.value);
        selectTimeBox.classList.remove("display-block");
    }
}
// Task List
let taskForm = document.querySelector(".tasks .task-form")
let taskNameIn = document.querySelector("#task-name");
let taskDurationIn = document.querySelector("#task-duration");
let submitTaskButton = document.querySelector("#submit-task");
let taskListHolder = document.querySelector(".tasks .tasks-list");
let clearAllBtn = document.querySelector(".home .tasks .clear-all");

let tasksArray = [];
let localStorageValue = localStorage.getItem("taskList");


getTasksFromLocal();
// Getting the tasks from the local storage


submitTaskButton.addEventListener("click", function() {
    if (taskNameIn.value.length > 45 || taskNameIn.value.length < 2 || taskDurationIn.value < 5 || taskDurationIn > 1200) {
        if (taskDurationIn.value < 5 || taskDurationIn > 1200) {
            let textWarning = document.createElement('div');
            textWarning.textContent = "the task duration should be between 5 - 1600 minutes"
            textWarning.style.cssText = "text-align:center;color: red; font-size: 14; wrap-content: wrap; margin-top: 10px;";
            taskDurationIn.style.color = "red";
            taskForm.append(textWarning);
        }
        if (taskNameIn.value.length > 45 || taskNameIn.value.length < 2) {
            let textWarning = document.createElement('div');
            textWarning.textContent = "the task name should be between 2 - 45 character"
            textWarning.style.cssText = "text-align:center; color: red; font-size: 14; wrap-content: wrap; margin-top: 10px;";
            taskNameIn.style.color = "red";
            taskForm.append(textWarning);
        }
    }else {
        addTasksToLocal();
        LoadTasks();
        // Clear Task Inputs 
        taskNameIn.value = "";
        taskDurationIn.value = "";
    }
});

function getTasksFromLocal() {
    if (localStorageValue) {
        tasksArray = JSON.parse(localStorage.getItem("taskList"));
        LoadTasks();
    }
}

function LoadTasks() { 
        removeTaskListChilds();
        for(i in tasksArray) {
            let taskDiv = document.createElement("div");
            let taskNameDiv = document.createElement("div");
            let clearTaskBtn = document.createElement("div");
            let startTaskBtn = document.createElement("div");
            let duration = tasksArray[i].taskDuration;
            let index = i;

            taskDiv.id = "task-div";;
            taskNameDiv.id = "task-name-div";
            clearTaskBtn.id = "clear-task-btn";
            startTaskBtn.id = "start-task-btn";

            taskNameDiv.textContent = tasksArray[i].taskName;
            clearTaskBtn.textContent = "Clear";
            startTaskBtn.textContent = "Start";

            taskDiv.append(taskNameDiv, clearTaskBtn, startTaskBtn);
            taskListHolder.append(taskDiv);

            // When The user click on the clear or start button
            startTaskBtn.addEventListener("click", function (event) {
                onClickStart(duration, index);
            });
            clearTaskBtn.addEventListener("click", function (event) {
                removeTaskFromLocal(index);
            });
        }
};

function removeTaskListChilds() {
    while (taskListHolder.firstChild) {
        taskListHolder.removeChild(taskListHolder.firstChild);
    }
};

function addTasksToLocal() {
    tasksArray.push({
        taskName: taskNameIn.value,
        taskDuration: taskDurationIn.value
    });
    updateLSV();
};
function removeTaskFromLocal(index,duration) {
    tasksArray.splice(index,1);
    updateLSV(duration);
    LoadTasks();
}
function onClickStart(duration,index) {
    updateTime(duration);
    removeTaskFromLocal(index,duration);
}

function updateLSV(timeM,TimeS = 0) {
    if(timeM) {
        localStorage.setItem("timeM", timeM);
        localStorage.setItem("timeS", TimeS);
    }
    localStorage.setItem("taskList", JSON.stringify(tasksArray));
}

// When Click On Clear All Button
clearAllBtn.onclick = function() {
    removeTaskListChilds();
    clearLocalStorage();
};

function clearLocalStorage() {
    localStorage.clear();
    tasksArray = [];
}

// Dark Mode
let darkMode = localStorage.getItem("darkMode");
let modeBtn = document.querySelector("header .links .dark-mode-div");
let sunBtn = document.querySelector("header .dark-mode-div .sun");
let moonBtn = document.querySelector("header .dark-mode-div .moon");

if (darkMode) {
    document.body.classList.add("dark-mode");
    sunBtn.style.display = "none";
    moonBtn.style.display = "block"
};

modeBtn.onclick = function () {
    if (darkMode) {
        document.body.classList.remove("dark-mode");
        localStorage.removeItem("darkMode");
        moonBtn.style.display = "none";
        sunBtn.style.display = "block";
    } else {
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", true);
        sunBtn.style.display = "none";
        moonBtn.style.display = "block";
    };
    darkMode = localStorage.getItem("darkMode");

};