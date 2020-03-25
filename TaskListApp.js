// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// load all event listeners
loadEventListeners();

function loadEventListeners(){
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event 
    form.addEventListener('submit',addTask);
    // Remove task event
    taskList.addEventListener('click',removeTask);
    //Clear task event
    clearBtn.addEventListener('click',clearTasks);
    // Filter tasks event
    filter.addEventListener('keyup',filterTasks);
    
}

// addTask
function addTask(Event){
    if(taskInput.value === ''){
         alert('please enter a task');
    }

    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    //Create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new delete link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>'
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = '';
    Event.preventDefault();
}

// Get tasks from LS
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];   
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    console.log(tasks)
    tasks.forEach(task => {
                // Create li element
                const li = document.createElement('li');
                // Add class
                li.className = 'collection-item';
                //Create text node and append to the li
                li.appendChild(document.createTextNode(task));
                // Create new delete link element
                const link = document.createElement('a');
                // Add class
                link.className = 'delete-item secondary-content';
                // Add icon html
                link.innerHTML = '<i class = "fa fa-remove"></i>'
                // Append link to li
                li.appendChild(link);
                // Append li to ul
                taskList.appendChild(li);
            }
        
    );
}

// Store task in local storage
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];   
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
// Remove task
function removeTask(Event){
    if(Event.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
          Event.target.parentElement.parentElement.remove() ;
          
          // Remove from LS
          removeTaskFromLocalStorage(Event.target.parentElement.parentElement);
        }
    }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];   
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(){
    // taskList.innerHTML = '';

    // Faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    // Clear from LS
    clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();
}
// Filter tasks
function filterTasks(){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            }else{
                task.style.display = 'none';
            }
        }
    );
}
