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
const selectPriority = document.getElementById("priority-select")
const currentDate = new Date().getDate()
const currentYear = new Date().getFullYear()
const currentMonth = new Date().toLocaleString('default', { month: 'short' })
const modalOverlay = document.getElementById("modal-overlay")
const modalActions = document.getElementById("modal-actions")
const filterBar = document.getElementById("filter-bar")
const emptyState = document.getElementById("empty-state")
let objStorage = JSON.parse(localStorage.getItem("User-Data")) || []
let selectedIndex = null



// INITIAL EMPTY STATE
emptyState.style.display = `block`


// DATA IN OBJECTS
class TaskFlow {
    constructor({ title, description, priority, category, dateDue }) {
        this.title = title
        this.description = description
        this.priority = priority
        this.category = category
        this.dateDue = dateDue
        this.dataStatus = false
        this.datePassed = new Date(this.dateDue) < new Date() ? "Passed" : "Not Passed"

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

    objStorage = JSON.parse(localStorage.getItem("User-Data")) || []

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
    const taskFlowData = new TaskFlow({ title: taskInput, description: taskDesc, priority: taskPriority, category: taskCategory, dateDue: taskDueDate })

    // LOCAL-STORAGE
    objStorage = [...objStorage, taskFlowData]
    console.log(objStorage)
    localStorage.setItem("User-Data", JSON.stringify(objStorage))

    // taskInputid.value = ''
    // taskDescid.value = ''2
    // taskCategoryid.value = ''
    // taskDueDateid.value = ''

    addTaskList()
}

function addTaskList() {

    let getElement = localStorage.getItem("User-Data")
    getElement = JSON.parse(getElement)

    if (getElement === null) {
        taskList.innerHTML = ``
        emptyState.style.display = `block`
        return

    } else if (getElement.length === 0) {
        taskList.innerHTML = ``
        emptyState.style.display = `block `
        return
    }
    emptyState.style.display = `none`

    taskList.innerHTML = ''
    getElement.forEach((element, idx) => {
        taskList.innerHTML += ` <li data-index=${idx} class="task-card" data-priority="${element.priority}" >
                <span class="task-check" ></span>
                <div class="task-body">
                    <p class="task-title">${element._title}</p>
                    <p class="task-desc-text">${element.description}</p>
                    <div class="task-meta">
                        <span class="priority-badge ${element.priority}"  >${element.priority}</span>
                        <span class="task-due ">📅 ${element.dateDue}</span>
                        <span class="task-cat">${element.category}</span>
                        <span class="task-created">${`${currentDate}-${currentMonth}-${currentYear}`}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="icon-btn edit-btn " >
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

}

// Check Box Element
taskList.addEventListener("click", (e) => {
    if (!e.target.classList.contains('checked')) {
        e.target.classList.add("checked")
        const selectParent = e.target.closest('li')
        selectParent.classList.add('done')
        const indexValue = selectParent.dataset.index
        objStorage[indexValue] = { ...objStorage[indexValue], dataStatus: true }
        console.log(objStorage)

    } else {
        e.target.classList.remove("checked")
        const selectParent = e.target.closest('li')
        selectParent.classList.remove('done')
        const indexValue = selectParent.dataset.index
        objStorage[indexValue] = { ...objStorage[indexValue], dataStatus: false }
        console.log(objStorage)
    }

    if (e.target.closest('.del-btn')) {
        const listItems = e.target.closest('li')
        selectedIndex = listItems.dataset.index
        modalOverlay.classList.add('open')
    }
})

modalActions.addEventListener('click', (e) => {

    if (e.target.id === "modal-cancel") {
        modalOverlay.classList.remove("open")
        selectedIndex = null
        return
    }

    if (e.target.id === "modal-confirm") {
        objStorage.splice(selectedIndex, 1)
        localStorage.setItem("User-Data", JSON.stringify(objStorage))
        modalOverlay.classList.remove("open")
        selectedIndex = null
        addTaskList()
        showToast("List Deleted & LocalStorage Updated.!", "success")
    }
})

filterBar.addEventListener('click', (e) => {
    const { id } = e.target
    switch (id) {
        case "clear-done-btn":
            localStorage.clear("User-Data")
            showToast('List Deleted & LocalStorage Updated.!', 'success')
            addTaskList()
            break
    }
})

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
        insertElement.innerHTML = `<button class="error-btn" id="offline">AWAITING INPUT...</button>`
    }
})

addTaskList()