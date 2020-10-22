const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('#form-add');
const todoItemsList = document.querySelector('.todo-items');

let todos = [];

//eventListener for adding
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addTodo(todoInput.value);
});

//add item
function addTodo(item) {
  if (item !== '') {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };

    todos.push(todo);
    addToLocalStorage(todos);

    todoInput.value = '';
  }
  else{
    alert("Wpisz jakąś wartość");
  }
}

//making item
function renderTodos(todos) {
  todoItemsList.innerHTML = '';

  todos.forEach(function(item) {
    const checked = item.completed ? 'checked': null;

    const li = document.createElement('li');

    li.setAttribute('class', 'item');

    li.setAttribute('data-key', item.id);
    if (item.completed === true) {
      li.classList.add('checked');
    }

    li.innerHTML = `
    <button id="checker" class="btn btn-success" ${checked}>-</button>${item.name}
    <button id="delete-button" class="btn btn-danger">X</button>
    <input type="text" id="form-edit ${item.id}" class="form-control" style="width: 14vh; float: right; position: static;" placeholder="Edytuj tekst...">
    <button id="edit" class="btn btn-warning" style="float: right; position: static;">Edytuj</button>
    `;
    todoItemsList.append(li);
  });

}

//adding to local storage
function addToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos(todos);
}

//getting from Local Storage
function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  if (reference) {
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}

//editing item
function editTodo(id) {
    todos.forEach(function(item) {
      if (item.id == id) {
        const todoInputEdit = document.getElementById('form-edit '+id);
        item.name = todoInputEdit.value;
      }
    });

    addToLocalStorage(todos);
}

//checking the name of item task
function toggle(id) {
  todos.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });

  addToLocalStorage(todos);
}

//deleting item
function deleteTodo(id) {
  todos = todos.filter(function(item) {
    return item.id != id;
  });

  addToLocalStorage(todos);
}

//calling a function for trigger items from local storage
getFromLocalStorage();

//eventListener for checking, editing and deleting item
todoItemsList.addEventListener('click', function(event) {
  if (event.target.id === 'checker') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }

  if (event.target.id === 'edit') {
    editTodo(event.target.parentElement.getAttribute('data-key'));
  }

  if (event.target.id ==='delete-button') {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }

});