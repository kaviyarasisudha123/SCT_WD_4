let tasks=[];
window.onload=function(){
    const saveTasks=this.localStorage.getItem("tasks");
    if(saveTasks){
        tasks=JSON.parse(saveTasks);
        displayTasks("all");
    }
};

function addTask(){
    const taskInput=
    document.getElementById("taskInput");
    const taskTime=
    document.getElementById("taskTime");

    if(taskInput.value === ""){
        alert("Please enter a task");
        return;
    }
    const task = {
        text:taskInput.value,
        time:taskTime.value,
        completed:false
    };
    
    tasks.push(task);
    saveTasks();
    displayTasks("all");

    taskInput.value="";
    taskTime.value="";
}
function displayTasks(filter){
    const taskList=
    document.getElementById("taskList");
    taskList.innerHTML="";

    for(let i=0;i<tasks.length;i++){
        if(
            filter === "completed" && ! tasks[i].completed ||
             filter === "pending" && ! tasks[i].completed
        ) {
            continue;
        }
        const li =document.createElement("li");
        if(tasks[i].completed){
            li.className="completed";
        }
        const text=document.createElement("span");
        text.innerText=tasks[i].text;
      
        const time=document.createElement("div");
        text.innerText=tasks[i].time;
        time.style.fontSize="12px";

        const completeBtn=document.createElement("button");
        completeBtn.innerText=""
        completeBtn.onclick=function(){
            tasks[i].completed=!tasks[i].completed;
            saveTasks();
            displayTasks(filter);
        };
        const editBtn=document.createElement("button");
        editBtn.innerText="Edit";
        editBtn.onclick=function(){
            const newText=prompt("Edit task",tasks[i].text);
            if(newText !== null && newText !== ""){
                tasks[i].text=newText;
                saveTasks();
                displayTasks(filter);
            }
        };
        const deleteBtn=document.createElement("button");
        deleteBtn.innerText="Delete";
        deleteBtn.onclick=function(){
            tasks.splice(i, 1);
            saveTasks();
            displayTasks(filter);
        };
        li.appendChild(text);
        li.appendChild(time);
        li.appendChild(completeBtn);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    
    }

}
function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
function showAll(){
    displayTasks("all");
}
function showCompleted(){
    displayTasks("completed");
}
function showPending(){
    displayTasks("pending");
}