// Define UI element
let form = document.querySelector('#task_form');
let tasklist = document.querySelector('ol');
let clearbtn = document.querySelector("#Clear_task_btn");
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

// Define event listeners
form.addEventListener('submit', addtask);
tasklist.addEventListener('click', removetask);
clearbtn.addEventListener('click' , cleartask);
filter.addEventListener('keyup' ,filtertask);
document.addEventListener('DOMContentLoaded' , getasks );
// Define funtions
// Add task

function addtask(e) {
    if(taskInput.value === '') {
        alert('Add a task!');
    } else {
        // create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML ='x';
        li.appendChild(link);
        tasklist.appendChild(li);

        storetaskinlocalstorage(taskInput.value);

        taskInput.value = '';

    }
    e.preventDefault() 
}
// remove task
function removetask(e){
    if(e.target.hasAttribute("href")){
        if(confirm('Are you sure?')) {
           let ele = e.target.parentElement;  
           ele.remove();         
           //console.log(ele);
           removefromls(ele);
        } 
    }
}

// clear task
function cleartask(e){
    // tasklist.innerHTML ="";

    //  Faster way 

    while(tasklist.firstChild){
            tasklist.removeChild(tasklist.firstChild);
    }
    localStorage.clear();
}

// filter task
function filtertask (e){
    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task => {
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display = 'block';
        } else {
            task.style.display ='none';
        }
    })
}
// store in local storage
function storetaskinlocalstorage(task){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks =[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } 
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks =[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } 
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML ='x';
        li.appendChild(link);
        tasklist.appendChild(li);
       
    });
}

function removefromls(taskitem){
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks =[];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    } 

    let li = taskitem ;
    li.removeChild(li.lastChild); // <a>x</a>

    tasks.forEach((task, index) => {
        if(li.textContent.trim() === task){
            tasks.splice(index ,1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
