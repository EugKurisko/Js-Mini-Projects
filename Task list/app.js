let addTask = document.querySelector('.btn').addEventListener('click', pushToList);
let clear = document.querySelector('.clear-tasks').addEventListener('click', clearTasks);
var deleteTask = Array.from(document.querySelectorAll('.delete-item'));
let taskInput = document.querySelector('#task');
var tasks = JSON.parse(localStorage.getItem("tasks"));
let filter = document.querySelector('#filter').addEventListener('keyup', findTask);

var list = document.querySelector('.collection');

if (tasks) {
  for (task of tasks) {
    list.appendChild(pushToUl(task));
  }
}

for (let task of deleteTask) {
  task.addEventListener('click', popFromList);
}

function pushToUl(task) {
  console.log(task);
  if (task.value === '') {
    alert('Add task');
  }
  //let task = document.getElementById('task');
  //create i tag inside a
  let iTag = document.createElement('i');
  iTag.setAttribute('class', 'fa fa-remove');
  //create link - inner element of li element
  let link = document.createElement('a');
  link.appendChild(iTag);
  link.setAttribute('class', 'delete-item secondary-content');
  link.addEventListener('click', popFromList);
  //create li - inner element of ul
  let listItem = document.createElement('li');
  listItem.appendChild(document.createTextNode(task));
  listItem.appendChild(link);
  listItem.setAttribute('class', 'collection-item');
  list.appendChild(listItem);
  deleteTask.push(link);
  return listItem;
}

function pushToList(e) {
  let task = document.getElementById('task');
  e.preventDefault();
  pushToUl(task.value);
  addToLocalStorage(task.value);
  task.value = '';
}

function popFromList() {
  deleteOneFromLocalStorage(this);
  this.parentNode.remove();
}

function addToLocalStorage(task) {
  if (!tasks) {
    tasks = [];
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteOneFromLocalStorage(task) {
  tasks.splice(tasks.indexOf(task), 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(e) {
  e.preventDefault();
  list.innerHTML = '';
  localStorage.clear();
}

function findTask(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
    (function (task) {
      const item = task.firstChild.textContent.toLocaleLowerCase();
      if (item.indexOf(text) != -1) {
        task.style.display = 'block';
      }
      else {
        task.style.display = 'none';
      }
    });
}