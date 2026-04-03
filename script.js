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
const toast = document.getElementById("toast")
const toastMsg = document.getElementById("toast-msg")



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
    } else if (taskInput, taskCategory, taskDueDate) {
        showToast("New Task Added.!", "success")
        return
    }

    // CLASS OBJECT CONVERSION
    const taskFlowData = new TaskFlow(taskInput, taskDesc, taskPriority, taskCategory, taskDueDate)

    // DESTRUCTURING
    const { title, description, priority, category, dueDate
    } = taskFlowData


}


function showToast(message, type) {

    toastMsg.textContent = message;

    toast.classList.add("show");

    if (type.includes("success")) {
        toast.classList.add("success")
        toast.classList.remove("error")
        toast.classList.remove("warn")
        return

    } else if (type.includes("error")) {
        toast.classList.add("error")
        toast.classList.remove("success")
        toast.classList.remove("warn")
        return

    } else if (type.includes("warn")) {
        toast.classList.add("warn")
        toast.classList.remove("success")
        toast.classList.remove("error")
        return

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


