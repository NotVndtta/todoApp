const form = document.querySelector('#form');
const input = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

checkEmptyList();

form.addEventListener('submit', addTask);

tasksList.addEventListener('click', deleteTask)

tasksList.addEventListener('click', doneTask)



function addTask(event) {
    event.preventDefault();

    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    tasks.push(newTask);
    
    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title'; 

    const taskHTML = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${newTask.text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
</li>`;

    tasksList.insertAdjacentHTML('beforeend', taskHTML);
    
    taskInput.value = ""
    taskInput.focus()

    checkEmptyList();
    

    
}

function deleteTask(event){
    
    if (event.target.dataset.action !== 'delete') return;

    const parentNode = event.target.closest('.list-group-item');

    const id = parentNode.id;

    // // Поиск индекса
    const index = tasks.findIndex((task) => task.id == id);
 
    // // Удаление с массива (номер элемента, количество)
    tasks.splice(index, 1) 

    // // Фильтр массива (2 способ)
    // tasks - tasks.filter((task) => task.id !== id);

    parentNode.remove();

    checkEmptyList();

    
}

function doneTask(event) {
    if (event.target.dataset.action !== 'done') return;


    const parentNode = event.target.closest('.list-group-item');

    const id = parentNode.id;
    const task = tasks.find( (task) => task.id == id);
    task.done = !task.done;

    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done')

    
}

function checkEmptyList() {

    if (tasks.length == 0) {
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Tasks list is empty</div>
    </li>`;

        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }

    if (tasks.length > 0){
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}



 