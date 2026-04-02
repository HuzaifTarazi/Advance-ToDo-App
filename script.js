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




// DATA IN OBJECTS
class TaskFlow {
    constructor(title, description, priority, category, dateDue) {
        this.title = title
        this.description = description
        this.priority = priority
        this.category = category
        this.dateDue = dateDue
    }

    warningAlert() {
       insertElement.innerHTML = '<button class="error-btn"  id="error-message">Insert Data</button>'
    }

    runningProgram(){
        insertElement.innerHTML = '<button class="error-btn"  id="initial-message">No Error Found..!</button>'
    }

    get title() {
        return this._title
    }

    set title(titleValue) {

        if (!titleValue) {
            this.warningAlert()
            return
        } else {

            this.runningProgram()
            this._title = titleValue
        }

    }





}




















// PROGRAM RUN ON CLICK
addTask.onclick = () => {

    const taskInput = taskInputid.value
    const taskDesc = taskDescid.value
    const taskPriority = taskPriorityid.value
    const taskCategory = taskCategoryid.value
    const taskDueDate = taskDueDateid.value


    // CLASS OBJECT CONVERSION
    const taskFlowData = new TaskFlow(taskInput, taskDesc, taskPriority, taskCategory, taskDueDate)

    // DESTRUCTURING
    const { title, description, priority, category, dueDate
    } = taskFlowData








    // const newElement = document.createElement('li')
    // newElement.innerHTML = `<div class="task-card">${_taskInput}</div>`
    // taskList.append(newElement)
}


