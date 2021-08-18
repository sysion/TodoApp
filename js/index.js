//You MUST only use const variables after initialization

const submitForm = (event) => {
    event.preventDefault();

    let input = document.querySelector('input');
    if (input.value != '') {
        newTodo(input.value);
    }
    
    input.value = '';
}

const newTodo = (task) => {
    let ul = document.querySelector('ul');
    let li = document.createElement('li');
    li.innerHTML = `<div class="list-item-wrap">
                    <div class="line-wrap">
                    <span class="todo-item">${task}</span>
                    <span id="line"></span>
                    </div>
                    <div class="todo-item-button">
                    <button class="done-button"><i class="fas fa-check-square"></i></button>
                    <button class="delete-button"><i class="fas fa-times-circle"></i></button>
                    </div>
                    </div>`;

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

    if (childSpan.classList.contains('line')) {
        childSpan.classList.remove('line');
    }
    else {
        childSpan.classList.add('line');
    }
}

const deleteTask = (event) => {
    let taskLi = event.target.parentNode.parentNode.parentNode.parentNode;
    let ul = taskLi.parentNode;
    ul.removeChild(taskLi);
}

const clearTodos = (event) => {
    document.querySelector('ul').innerHTML = '';
}

document.querySelector('form').addEventListener('submit', submitForm);
document.querySelector('ul').addEventListener('click', taskStatus);
document.querySelector('.delete-all-todo').addEventListener('click', clearTodos);