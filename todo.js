let todoItemsContainer = document.getElementById("listContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveButton = document.getElementById("saveButton");
let todoList;
saveButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

function getItemsInLocalStorage() {
    let string = localStorage.getItem("todoList");
    let parseValue = JSON.parse(string);
    if (parseValue === null) {
        return [];
    } else {
        return parseValue;
    }
}
todoList = getItemsInLocalStorage();
let todoCount = todoList.length;

function addText() {
    let userInput = document.getElementById("userInput");
    let userInputValue = userInput.value.trim();
    if (userInputValue === "") {
        alert("Enter valid text");
        return;
    }
    userInput.value = "";
    todoCount = todoCount + 1;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todoCount,
        isChecked: false
    };
    todoList.push(newTodo);
    createAppendTodo(newTodo);
}

addTodoButton.onclick = function() {
    addText();
}

function todoStatus(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");
    let indexOfTodo = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[indexOfTodo];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function todoDelete(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    let deletedTodoItem = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(deletedTodoItem, 1);
}

function createAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;
    let todoElement = document.createElement("li");
    todoElement.classList.add("list-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);
    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox");
    todoElement.appendChild(inputElement);
    inputElement.onclick = function() {
        todoStatus(checkboxId, labelId, todoId);
    }
    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);
    let labelElement = document.createElement("label");
    labelElement.setAttribute('for', checkboxId);
    labelElement.textContent = todo.text;
    labelElement.classList.add("checkbox-label");
    labelElement.id = labelId;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);
    let deleteContainer = document.createElement('div');
    deleteContainer.classList.add("delete-icon");
    labelContainer.appendChild(deleteContainer);
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add('far', 'fa-trash-alt', 'delete-icon');
    deleteIcon.onclick = function() {
        todoDelete(todoId);
    }
    deleteContainer.appendChild(deleteIcon);
}
for (let todo of todoList) {
    createAppendTodo(todo);
}