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
let startBtn = document.querySelector(".home .control-buttons .start-btn");
let editBtn = document.querySelector(".home .control-buttons .edit-btn");
let prograssPar = document.querySelector("#progress");
let workStatus = document.querySelector(".home .circle .status");
let selectTimeEditBtn = document.querySelector(".home .control-buttons .edit-btn");
let selectTimeBox = document.querySelector(".home .control-buttons .edit-box");
let selectTimeIn = document.querySelector("#minutes-number");
let selectTimeSubmitButton = document.querySelector(".home .control-buttons .edit-box .submit");
let selectTimeExitButton = document.querySelector(".home .control-buttons .edit-box form .exit");


let timerMinutes = 1;
let timerSeconds = 0;
let allTime = timerMinutes * 60 + timerSeconds;
let allTimeNow = allTime;
let timerStart = false;
let breakTime = true;

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
        console.log("added");
    }
    
};
selectTimeExitButton.onclick = () => {
    if (selectTimeBox.classList.contains("display-block")) {
        selectTimeBox.classList.remove("display-block");
        console.log("removed");
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

let tasksArray = [];
let localStorageValue = localStorage.getItem("taskList");


if(localStorageValue) {
    tasksArray = JSON.parse(localStorage.getItem("taskList"));
}


// Getting the tasks from the local storage
for(i in tasksArray) {
    let taskDiv = document.createElement("div");
    let taskNameDiv = document.createElement("div");
    let clearTaskBtn = document.createElement("div");
    let startTaskBtn = document.createElement("div");
    let duration = tasksArray[i].taskDuration;
    taskNameDiv.textContent = tasksArray[i].taskName;

    clearTaskBtn.textContent = "Clear";
    startTaskBtn.textContent = "Start";


    taskDiv.id = "task-div";;
    taskNameDiv.id = "task-name-div";
    clearTaskBtn.id = "clear-task-btn";
    startTaskBtn.id = "start-task-btn";

    taskDiv.append(taskNameDiv, clearTaskBtn, startTaskBtn);
    taskListHolder.append(taskDiv);

    // When The user click on the clear or start button
    startTaskBtn.addEventListener("click", function (event) {
        if (event.currentTarget.id === "start-task-btn") {
            updateTime(duration);
        };
    });
    clearTaskBtn.addEventListener("click", function (event) {
        for(i in tasksArray){
            if(tasksArray[i].taskName = taskNameDiv.textContent) {
                tasksArray.pop(i);
                localStorage.setItem("taskList",JSON.stringify(tasksArray));
            };
        }
    });
}

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
        // Adding the tasks to the local storage
        tasksArray.push({
            taskName: taskNameIn.value,
            taskDuration: taskDurationIn.value
        });
        localStorage.setItem("taskList",JSON.stringify(tasksArray));
        // adding the task elements to the task list
        let taskDiv = document.createElement("div");
        let taskNameDiv = document.createElement("div");
        let clearTaskBtn = document.createElement("div");
        let startTaskBtn = document.createElement("div");

        taskNameDiv.textContent = tasksArray[tasksArray.length-1].taskName;
        clearTaskBtn.textContent = "Clear";
        startTaskBtn.textContent = "Start";


        taskDiv.id ="task-div";;
        taskNameDiv.id = "task-name-div";
        clearTaskBtn.id = "clear-task-btn";
        startTaskBtn.id = "start-task-btn";

        taskDiv.append(taskNameDiv,clearTaskBtn,startTaskBtn);
        taskListHolder.append(taskDiv);

        // Clear Task Inputs 
        taskNameIn.value = "";
        taskDurationIn.value = "";
    }
});