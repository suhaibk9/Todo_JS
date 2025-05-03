// async function fetchTodos() {
//   const allTodos = await fetch('https://jsonplaceholder.typicode.com/todos');
//   const todos = await allTodos.json();

//   const slicedTodos = todos.slice(0, 5).map((todo) => {
//     return {
//       text: todo.title,
//       isCompleted: todo.completed,
//     };
//   });
//   console.log(slicedTodos);
//   window.localStorage.setItem('todos', JSON.stringify(slicedTodos));
// }
function loadTodos() {
  const todos = window.localStorage.getItem('todos');
  try {
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error('Invalid todos in localStorage. Resetting...', error);
    window.localStorage.setItem('todos', JSON.stringify([]));
    return [];
  }
}

function saveTodo(todo) {
  const allTodos = loadTodos();
  allTodos.push({
    ...todo,
    id: allTodos.length + 1,
  });
  window.localStorage.setItem('todos', JSON.stringify(allTodos));
}
function executeFilterAction(btn) {
  const todoList = document.querySelector('#todo-list');
  todoList.innerHTML = ''; // Clear the list first!

  const filterData = btn.dataset.filter;
  const allTodos = loadTodos();

  if (filterData === 'all') {
    allTodos.forEach((todo) => {
      appendToList(todo);
    });
  }
  if (filterData === 'completed') {
    allTodos
      .filter((todo) => todo.isCompleted)
      .forEach((todo) => {
        appendToList(todo);
      });
  }
  if (filterData === 'pending') {
    allTodos
      .filter((todo) => !todo.isCompleted)
      .forEach((todo) => {
        appendToList(todo);
      });
  }
}

function appendToList(todo) {
  if (!todo) return;
  const todoList = document.querySelector('#todo-list');
  const li = document.createElement('li');
  li.setAttribute('data-id', todo.id);

  const textDiv = document.createElement('div');
  if (todo.isCompleted) {
    textDiv.classList.add('completed');
  }
  textDiv.innerText = todo.text;
  //wrapper buttons
  const wrapperButtons = document.createElement('div');
  wrapperButtons.classList.add('wrapperBtn');
  //Edit Button
  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.classList.add('editBtn');
  //Delete Button
  const deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.classList.add('deleteBtn');
  deleteButton.addEventListener('click', (e) => {
    console.log('delete');
    deleteTodo(e);
  });
  //Completed Button
  const completedButton = document.createElement('button');
  completedButton.innerText = 'Complete';
  completedButton.classList.add('completeBtn');
  completedButton.addEventListener('click', (e) => {
    console.log('complete');
    completeTodo(e);
  });
  //Attaching to li tag
  wrapperButtons.appendChild(editButton);
  wrapperButtons.appendChild(deleteButton);
  wrapperButtons.appendChild(completedButton);
  //Adding Buttons to li
  li.appendChild(textDiv);
  li.appendChild(wrapperButtons);
  li.classList.add('todo-item');
  todoList.appendChild(li);
}

async function renderList() {
  const todos = loadTodos();
  todos.forEach((todo) => {
    appendToList(todo);
  });
}
window.addEventListener('DOMContentLoaded', async (event) => {
  await renderList();
  //   await fetchTodos();
  const addTodo = document.querySelector('#add-todo');
  const todoInput = document.querySelector('#todo-input');
  todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      saveTodo({ text: todoInput.value, isCompleted: false });
      refreshTodos(loadTodos());
      todoInput.value = '';
    }
  });
  addTodo.addEventListener('click', () => {
    saveTodo({ text: todoInput.value, isCompleted: false });
    refreshTodos(loadTodos());
    todoInput.value = '';
  });

  const filterBtns = [...document.getElementsByClassName('filterBtn')];
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      executeFilterAction(e.target);
    });
  });
});
function completeTodo(e) {
  const todoItem = e.target.parentElement.parentElement;
  const todoId = todoItem.getAttribute('data-id');
  const allTodos = loadTodos();
  const todoIndex = allTodos.findIndex((todo) => todo.id == todoId);
  allTodos[todoIndex].isCompleted = true;
  refreshTodos(allTodos); // refreshTodos already clears and re-renders
}

function refreshTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
  const todoList = document.querySelector('#todo-list');
  todoList.innerHTML = '';
  todos.forEach((todo) => {
    appendToList(todo);
  });
}
function deleteTodo(e) {
  const todoItem = e.target.parentElement.parentElement;
  const todoId = todoItem.getAttribute('data-id');
  let allTodos = loadTodos().filter((todo) => todo.id != todoId);
  refreshTodos(allTodos);
}
