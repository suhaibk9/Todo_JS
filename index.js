async function fetchTodos() {
  const allTodos = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos = await allTodos.json();
  const slicedTodos = todos.slice(0, 5).map((todo) => todo.title);

  window.localStorage.setItem('todos', JSON.stringify(slicedTodos));
}
function loadTodos() {
  const todos = window.localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}
function saveTodo(todo) {
  const allTodos = JSON.parse(window.localStorage.getItem('todos')) || [];
  allTodos.push(todo);
  window.localStorage.setItem('todos', JSON.stringify(allTodos));
}
function appendToList(todo) {
  const todoList = document.querySelector('#todo-list');
  const li = document.createElement('li');
  li.innerText = todo;
  li.classList.add('todo-item');
  todoList.appendChild(li);
}
async function renderList() {
  await fetchTodos();
  const todos = loadTodos();
  todos.forEach((todo) => {
    appendToList(todo);
  });
}
window.addEventListener('DOMContentLoaded', async (event) => {
  await renderList();
  const addTodo = document.querySelector('#add-todo');
  const todoInput = document.querySelector('#todo-input');
  todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      saveTodo(todoInput.value);
      appendToList(todoInput.value);
      todoInput.value = '';
    }
  });
  addTodo.addEventListener('click', () => {
    saveTodo(todoInput.value);
    appendToList(todoInput.value);
    todoInput.value = '';
  });
});
