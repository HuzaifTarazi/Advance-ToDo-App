// <-- ADVANCE TO-DO APPLICATION -->
/*  ID'S OF ELEMENTS  */

const taskInputid = document.getElementById("task-input")
const taskDescid = document.getElementById("task-desc")
const taskPriorityid = document.getElementById("priority-select")
const taskCategoryid = document.getElementById("category-select")
const taskDueDateid = document.getElementById("due-date-input")
const formElements = document.getElementById("form-btns")
const insertElement = document.getElementById("insert-element")
const addTask = document.getElementById("add-task")
const taskList = document.getElementById("task-list")
const toast = document.getElementById("toast")
const toastMsg = document.getElementById("toast-msg")
let objStorage = []

// DATA IN OBJECTS
class TaskFlow {
    constructor(title, description, priority, category, dateDue) {
        this.title = title
        this.description = description
        this.priority = priority
        this.category = category
        this.dateDue = dateDue
    }

    get title() {
        return this._title
    }

    set title(titleValue) {
        if (titleValue === "") {
            console.log("error")
            return
        }

        this._title = titleValue
    }
}



// PROGRAM RUN ON CLICK
addTask.onclick = () => {

    const taskInput = taskInputid.value
    const taskDesc = taskDescid.value
    const taskPriority = taskPriorityid.value
    const taskCategory = taskCategoryid.value
    const taskDueDate = taskDueDateid.value

    if (!taskInput) {
        showToast("Please Enter Task Title.!", "warn")
        return
    } else if (!taskCategory) {
        showToast("Please Enter Task Category.!", "warn")
        return
    } else if (!taskDueDate) {
        showToast("Please Enter Task Due Date.!", "warn")
        return
    } else if (taskInput || taskCategory || taskDueDate) {
        showToast("New Task Added.!", "success")
    }

    // CLASS OBJECT CONVERSION
    const taskFlowData = new TaskFlow(taskInput, taskDesc, taskPriority, taskCategory, taskDueDate)

    // DESTRUCTURING

    // taskInputid.value = ''
    // taskDescid.value = ''
    // taskCategoryid.value = ''
    // taskDueDateid.value = ''


    addTaskList(taskFlowData)

}


function addTaskList(taskFlowData) {
    taskList.innerHTML = ''
    objStorage = [...objStorage, taskFlowData]

    objStorage.forEach((element, idx) => {

        taskList.innerHTML += ` <li class="task-card">
                <span class="task-check"></span>
                <div class="task-body">
                    <p class="task-title">${element.title}</p>
                    <p class="task-desc-text">${element.description}</p>
                    <div class="task-meta">
                        <span class="priority-badge">${element.priority}</span>
                        <span class="task-due ">📅 ${element.dateDue}</span>
                        <span class="task-cat">${element.category}</span>
                        <span class="task-created">${Date.now()}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="icon-btn edit-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button class="icon-btn del-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6l-1 14H6L5 6"></path>
                            <path d="M10 11v6"></path>
                            <path d="M14 11v6"></path>
                            <path d="M9 6V4h6v2"></path>
                        </svg>
                    </button>
                </div>
            </li>`
    })
    const taskCheck = document.querySelector(".task-check")
    taskCheck.addEventListener("click", () => {

        if(!taskCheck.classList.contains("checked")){
           taskCheck.classList.add("checked")
            return
        } else{
            taskCheck.classList.remove("checked")
        }



    })
}






// TOAST NOTIFICATION 
function showToast(message, type) {

    toastMsg.textContent = message;
    toast.classList.add("show");

    if (type.includes("success")) {
        toast.classList.add("success")
        toast.classList.remove("error")
        toast.classList.remove("warn")

    } else if (type.includes("error")) {
        toast.classList.add("error")
        toast.classList.remove("success")
        toast.classList.remove("warn")

    } else if (type.includes("warn")) {
        toast.classList.add("warn")
        toast.classList.remove("success")
        toast.classList.remove("error")

    }
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// ONLINE - OFFLINE LIVE STATUS 
taskInputid.addEventListener("keyup", (e) => {
    if (e.target.value !== "") {
        insertElement.innerHTML = `<button class="error-btn" id="online">ONLINE...</button>`
    } else {
        insertElement.innerHTML = `<button class="error-btn" id="offline">OFFLINE...</button>`
    }
})


