const inputbox = document.getElementById("input-box");
const priority = document.getElementById("priority");
const duedate = document.getElementById("duedate");
const label = document.getElementById("label");
const tasklist = document.getElementById("list-container");
const search = document.getElementById("search");


const tasks = [];



function addTask(){
    if(inputbox.value && !isNaN(priority.value) && duedate.value && label.value){
       const newtask = {
        Task: inputbox.value,
        priority: priority.value,
        duedate: duedate.value,
        label: label.value
       }

       tasks.push(newtask);
       tasks.sort((a, b) => {
        const dueDate = new Date(a.duedate) - new Date(b.duedate);
        return dueDate !== 0 ? dueDate: a.priority - b.priority;
       });

       displayTasks();
    }
    else {
        alert("Please fill it properly!");
    }

    inputbox.value = "";
    priority.value = "";
    duedate.value= "";
    label.value = "";
}

function displayTasks() {
    tasklist.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = `Task: ${task.Task}, Priority: ${task.priority}, Due date: ${task.duedate}, Label: ${task.label}`;
        tasklist.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    });
    saveData();
   
}

function searchTasks() {
    const searchlabel = search.value.toLowerCase();


        // If there's a search input, filter tasks and display them
        const filteredtasks = tasks.filter(task => task.label.toLowerCase().includes(searchlabel));
        displayTasksFiltered(filteredtasks);
    
   

}

function displayTasksFiltered(filteredtasks) {
    tasklist.innerHTML = "";

    filteredtasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = `Task: ${task.Task}, Priority: ${task.priority}, Due date: ${task.duedate}, Label: ${task.label}`;
        tasklist.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    });

}


       
tasklist.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", tasklist.innerHTML); 
}

function showTask(){
    tasklist.innerHTML = localStorage.getItem("data");
}
showTask();