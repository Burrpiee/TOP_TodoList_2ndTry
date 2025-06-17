import Project from "./project";
import Todo from "./todo";
import todoManager from "./todoManager";
import TodoManager from "./todoManager";
//DOM manager

//Private variable for dom elements
const dom = {};

//Caching DOM elements
const cacheDomElements = () => {
    dom.addProjectForm = document.getElementById("add-project-form");
    dom.projectsList = document.getElementById("projects-list");
    dom.addTodoForm = document.getElementById("add-todo-form");
    dom.todosList = document.getElementById("todo-list");
    dom.projectTitle = document.getElementById("current-project-title");
}


//Initialize the DOM
const init = () => {
    cacheDomElements();
    TodoManager.initialize();
    renderProjects();
};

//Setup event listeners
const setupEventListeners = () => {
    
    //Submission of Add Project Form
    dom.addProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const projectName = document.getElementById("project_name").value.trim();
        const projectDesc = document.getElementById("project_descs").value.trim();

        if (projectName !== '') {
            TodoManager.addProject();
        }
    });

    //Submission of Add Todo Form
    dom.addTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById("todo-title").value.trim();
        const description = document.getElementById("todo-desc").value.trim();
        const dueDate = document.getElementById("todo-due-date").value;
        const priority = document.getElementById("todo-priority").value;
        const notes = document.getElementById("todo-notes").value.trim();
        const projectId = document.getElementById("todo-project").value;

        //If values are not empty, add todo to project

        if (title && dueDate !== '') {
          //add todo to proj   
        }
    });
};

//Rendering of projects in projects list
const renderProjects = () => {
    const projects = todoManager.getAllProjects();

    dom.projectsList.innerHTML = ''; //Clear current list

    projects.forEach(project => {
        const projectItem = document.createElement('li');

        //Create html item
        projectItem.innerHTML = `
        <div>${project.name}</div>
        <button>x</button>`

        projectItem.classList.add('project-list-item');
        dom.projectsList.appendChild(projectItem);
    });
}



export default {
    init,
    setupEventListeners,
    renderProjects,
};
