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

    
let tasks = [];
let doneTasks = [];

const addWithKey = (event) => {
  if (event.key === 'Enter') {
    renderTask();
  }
};

const writeTask = () => {
    overlay.style.display = 'flex';
    body.style.border = '1px solid rgba(0, 0, 0, 0.7)';
    body.style.borderBottom = '14px solid  rgba(0, 0, 0, 0.7)';
    textarea.focus();
    document.addEventListener('keydown', addWithKey);
};

const taskToDel = () => {
    overlay.style.display = '';
    body.style.border = '';
    body.style.borderBottom = '';
    document.removeEventListener('keydown', addWithKey);
};

const setCookie = (name, value, expires) => {

    options = {
      path: '/',
      expires: expires
    };
  
    if (options.expires.toUTCString) {
      options.expires = options.expires.toUTCString();
    }
  
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
  
    for (let optionKey in options) {
      updatedCookie += "; " + optionKey;
      let optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += "=" + optionValue;
      }
    }
  
    document.cookie = updatedCookie;
  };

const renderTask = (event) => {
    let value = textarea.value.trim();

    if (value !== '') {
        let li = document.createElement('li');
        li.classList.add('list__item');
        li.textContent = value;
        tasks.push(value);
        list.append(li);

        taskToDel();

        textarea.value = '';
    }
};

const getCookie = (name) => {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const showTask = () => {
    if (getCookie('savedTasks')) {
      let receivedTasks = JSON.parse(getCookie('savedTasks'));
  
      receivedTasks.forEach(item => {
        let li = document.createElement('li');
        li.classList.add('list__item');
        li.textContent = item;
        list.append(li);
    });
    }
};

showTask();

const saveTask = () => {
    let date = new Date(Date.now() + 86400e6);

    if (!(getCookie('savedTasks'))) {
        setCookie('savedTasks', JSON.stringify(tasks), date);
        return;
    } else {
      let prevTasks = JSON.parse(getCookie('savedTasks')); // берём значения из cookie
      
      let summedTasks = prevTasks.concat(tasks); // объединяем только что добавленные задачи с прежними из cookie

      let summedTaksStr = JSON.stringify(summedTasks);
      setCookie('savedTasks', summedTaksStr, date); // сохраняем все в cookie
    }
};

const deleteCookie = (name) => {
  setCookie(name, "", {
    'max-age': -1
  })
};

const toCleanAllTasks = () => {
    list.innerHTML = '';
    deleteCookie('savedTasks');
    deleteCookie('doneTasks');
};

const removeTask = (elem) => {
  let date = new Date(Date.now() + 86400e6);
  if (getCookie('savedTasks')) {
    let taskList = JSON.parse(getCookie('savedTasks'));

    if (taskList.includes(elem)) {
      taskList.splice(taskList.indexOf(elem), 1);
      setCookie('savedTasks', JSON.stringify(taskList), date);
    } else {
        tasks.splice(tasks.indexOf(elem), 1);
      }
  }
};

const removeDone = (elem) => {
  let date = new Date(Date.now() + 86400e6);
  if (getCookie('doneTasks')) {
    let taskListDone = JSON.parse(getCookie('doneTasks'));
    
    if (taskListDone.includes(elem)) {
      taskListDone.splice(taskListDone.indexOf(elem), 1);
      setCookie('doneTasks', JSON.stringify(taskListDone), date);
    }  else {
      doneTasks.splice(doneTasks.indexOf(elem), 1);
    }
  }
};

const toDoneTask = (elem) => {
  let date = new Date(Date.now() + 86400e6);
  removeTask(elem);
    if (!(getCookie('doneTasks'))) {
      doneTasks.push(elem);
      setCookie('doneTasks', JSON.stringify(doneTasks), date);
      return;
    } else {
    
      doneTasks.push(elem);

      let prevDone = JSON.parse(getCookie('doneTasks'));
      let summedDone = prevDone.concat(doneTasks);

      let summedDoneStr = JSON.stringify(summedDone);
      setCookie('doneTasks', summedDoneStr, date);
    }

};

const showDone = () => {
  if (getCookie('doneTasks')) {
    let receivedDones = JSON.parse(getCookie('doneTasks'));

    receivedDones.forEach(item => {
      let li = document.createElement('li');
      li.style.color = '#37DD31';
      li.classList.add('list__item');
      li.textContent = item;
      list.append(li);
  });
  }
};

showDone();

const listItemManager = (event) => {
    let target = event.target;

    if (target.classList.contains('list__item')) {

        taskDone.style.display = 'block';
        delTask.style.display = 'block';

        taskDone.addEventListener('click', () => {
            toDoneTask(target.textContent)
            target.style.color = '#37DD31';
            taskDone.style.display = '';
            delTask.style.display = '';
        });

        delTask.addEventListener('click', () => {
            removeTask(target.textContent);
            removeDone(target.textContent)
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
    window.addEventListener('beforeunload', saveTask);
    
    
   