const addTask = document.querySelector('.add__tasks'),
    cleanAll = document.querySelector('.clean__all'),
    list = document.querySelector('.list'),
    delelteTask = document.querySelector('.del'),
    add = document.querySelector('.add__task'),
    overlay = document.querySelector('.overlay'),
    body = document.querySelector('body'),
    textarea = document.querySelector('textarea'),
    toolBar = document.querySelector('.toolbar'),
    taskDone = document.querySelector('.task__done'),
    delTask = document.querySelector('.del__task'),
    workSpace = document.querySelector('.work__space');

const tasks = {};

const writeTask = () => {
    overlay.style.display = 'flex';
    body.style.border = '1px solid  rgba(0, 0, 0, 0.7)';
    body.style.borderBottom = '14px solid  rgba(0, 0, 0, 0.7)';
};

const taskToDel = () => {
    overlay.style.display = '';
    body.style.border = '';
    body.style.borderBottom = '';
};

const renderTask = (event) => {
    let value = textarea.value.trim();

    if (value !== '') {
        let li = document.createElement('li');
        li.classList.add('list__item');
        li.textContent = value;
       
        list.append(li);

        taskToDel();

        textarea.value = '';
    }
};

const toCleanAllTasks = () => {
    list.innerHTML = '';
};

const listItemManager = (event) => {
    let target = event.target;

    if (target.classList.contains('list__item')) {

        taskDone.style.display = 'block';
        delTask.style.display = 'block';

        taskDone.addEventListener('click', () => {
            target.style.color = '#37DD31';
            taskDone.style.display = '';
            delTask.style.display = '';
        });

        delTask.addEventListener('click', () => {
            target.remove();
            taskDone.style.display = '';
            delTask.style.display = '';
        });

    }
};

const unshowOptions = () => {
    taskDone.style.display = '';
    delTask.style.display = '';
};


    addTask.addEventListener('click', writeTask);
    delelteTask.addEventListener('click', taskToDel);
    add.addEventListener('click', renderTask);
    cleanAll.addEventListener('click', toCleanAllTasks);
    list.addEventListener('click', listItemManager);
    toolBar.addEventListener('click', unshowOptions);
   
    
   