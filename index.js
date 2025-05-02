async function fetchTodos() {
  const allTodos = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos = await allTodos.json();
  const slicedTodos = todos.slice(0, 10);
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
window.addEventListener('DOMContentLoaded', async (event) => {
  //   await fetchTodos();
  const addTodo = document.querySelector('#add-todo');
  const todoList = document.querySelector('#todo-list');
  const todoInput = document.querySelector('#todo-input');
  const todos = loadTodos();
  todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      saveTodo(todoInput.value);
    }
  });
  addTodo.addEventListener('click', () => {
    saveTodo(todoInput.value);
  });
});
//
