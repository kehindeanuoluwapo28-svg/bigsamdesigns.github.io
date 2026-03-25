// todo-script.js

// Select DOM elements
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const clearCompletedButton = document.getElementById('clear-completed');
const themeToggleButton = document.getElementById('theme-toggle');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks to the DOM
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<input type='checkbox' ${task.completed ? 'checked' : ''} onchange='toggleTask(${index})'> ${task.text} <button onclick='deleteTask(${index})'>Delete</button>`;
        taskList.appendChild(li);
    });
}

// Add new task
function addTask() {
    const taskText = taskInput.value;
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks();
    }
}

// Delete task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Toggle task completion
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Clear completed tasks
function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Manage theme toggle
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load theme from local storage on startup
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// Event listeners
document.getElementById('add-task').addEventListener('click', addTask);
clearCompletedButton.addEventListener('click', clearCompletedTasks);
themeToggleButton.addEventListener('click', toggleTheme);

// Initial rendering of tasks
renderTasks();
