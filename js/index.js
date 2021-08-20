let tasks = [];
let isLocalStorage = false;

if (typeof Storage !== 'undefined') {
  isLocalStorage = true;
} else {
  alert('No storage support');
}

//You MUST only use const variables after initialization
const submitForm = (event) => {
    event.preventDefault();

    let input = document.querySelector('input');
    if (input.value != '') {

        const task = {
            id: new Date().getTime(),
            name: input.value,
            isCompleted: false
        };

        newTodo(task);
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
    
    input.value = '';
    input.focus();
}

const newTodo = (task) => {
    let taskId = task.id;
    let taskName = task.name;
    let ul = document.querySelector('ul');
    let li = document.createElement('li');

    li.innerHTML = `<div class="list-item-wrap">
                    <div class="line-wrap">
                    <span class="todo-item">${taskName}</span>
                    <span id="line" class=${task.isCompleted ? 'line' : ''}></span>
                    </div>
                    <div class="todo-item-button">
                    <button class="done-button"><i class="fas fa-check-square" data-id=${taskId}></i></button>
                    <button class="delete-button"><i class="fas fa-times-circle" data-id=${taskId}></i></button>
                    </div>
                    </div>`;

    li.setAttribute('data-id', taskId);
    li.classList.add('todo-list-item');

    ul.appendChild(li);
}


const taskStatus = (event) => {
    if (event.target.classList.contains('fa-check-square')) {
        taskDone(event);
    }
    else if (event.target.classList.contains('fa-times-circle')) {
        deleteTask(event);
    }
}

const taskDone = (event) => {
    let divParent = event.target.parentNode.parentNode.parentNode;
    let childSpan = divParent.querySelector('#line');
    let taskId = event.target.getAttribute('data-id');

    if (childSpan.classList.contains('line')) {
        childSpan.classList.remove('line');
        editTask(taskId, false);
    }
    else {
        childSpan.classList.add('line');
        editTask(taskId, true);
    }
}

const deleteTask = (event) => {
    let taskLi = event.target.parentNode.parentNode.parentNode.parentNode;
    let taskId = event.target.getAttribute('data-id');
    let ul = taskLi.parentNode;
    ul.removeChild(taskLi);

    removeTask(taskId);
}

const clearTodos = (event) => {
    document.querySelector('ul').innerHTML = '';
    tasks = [];
    localStorage.clear();
}

const getTaskFromStorage = () => {
    let allTasks;

    if (isLocalStorage) {
      allTasks = JSON.parse(localStorage.getItem("tasks")) || [];  //results in an array of task objects.
    }

    return allTasks;
}

const loadTaskFromStorage = () => {
    tasks = getTaskFromStorage();
    console.log(tasks);
    if (tasks) {
        tasks.map(task => {  //take each task one at a time
            newTodo(task);
        }).join('\n');
    }
}

let editTask = (taskId, status) => {
    if (tasks) {
        let doneTask = tasks.find(task => {
            return task.id === parseInt(taskId);
        });

        doneTask.isCompleted = status;    //assign new status

        //save tasks to storage after new status assignment
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
}

let removeTask = (taskId) => {
    
    if (tasks) {
        //remove task from tasks array - first method
        tasks = tasks.filter((task) => task.id !== parseInt(taskId));

        //save tasks to storage after removing deleted task
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
}

document.querySelector('form').addEventListener('submit', submitForm);
document.querySelector('ul').addEventListener('click', taskStatus);
document.querySelector('.delete-all-todo').addEventListener('click', clearTodos);
window.addEventListener('load', loadTaskFromStorage);