import Project from "./project";
import Todo from "./todo";
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
    dom.projectSelect = document.getElementById("todo-project");
}


//Initialize the DOM
const init = () => {
    cacheDomElements();
    setupEventListeners();
    TodoManager.initialize();
    renderProjects();
};

//Setup event listeners
const setupEventListeners = () => {
    
    //Submission of Add Project Form
    dom.addProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const projectName = document.getElementById("project_name").value.trim();
        const projectDesc = document.getElementById("project_desc").value.trim();

        if (projectName !== '') {
            TodoManager.addProject(projectName, projectDesc);
            renderProjects();
            dom.addProjectForm.reset();
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
            TodoManager.addTodo(title, description, dueDate, priority, notes, projectId);
            renderTodos(projectId);
            dom.addProjectForm.reset();
            document.getElementById('add-todo-container').classList.add('hidden');
        }
    });
};

//Rendering of projects in projects list
const renderProjects = () => {
    const projects = TodoManager.getAllProjects();

    dom.projectsList.innerHTML = ''; //Clear current list

    projects.forEach(project => {
        const projectItem = document.createElement('li');
        projectItem.classList.add('project-list-item');
        projectItem.dataset.projectId = project.id;

        //Create project items
        projectItem.innerHTML = `
        <div>${project.name}</div>
        <button class = "project-delete-button">x</button>`;

        dom.projectsList.appendChild(projectItem);

        projectItem.addEventListener('click', (e) => {
            if (e.target.classList.contains('project-delete-button')) {
                if (confirm("Delete this project and all it's todos?")) {
                    TodoManager.deleteProject(project.id);
                    renderProjects();
                }
            }

            else {
                renderTodos(project.id);

                //Add active class to show active list item
                document.querySelectorAll('.project-list-item').forEach(item => {
                    item.classList.remove('active');
                });
                projectItem.classList.add('active');
            }
        });

        //Add project to add todo form's dropdown list
        const option = document.createElement('option');
        option.value = project.id;
        option.textContent = project.name;
        dom.projectSelect.appendChild(option);
        //Choose the first project if no projects were previosly selected

    });
};

//Rendering todos for specific project
const renderTodos = (projectId) => {
    const project = TodoManager.getProject(projectId);

    if (!project) return;

    dom.projectTitle.textContent = project.name;

    //Clear todos list
    dom.todosList.innerHTML = '';

    if (project.todos.length === 0) {
        //Placeholder to state there is no todos
        dom.todosList.innerHTML = `
        <div class = "empty-todo-list">
            <div>There are currently no todos.</div>
            <div>Click the '+' button on top to add one!</div>
        </div>`;

        return;
    }

    project.todos.forEach (todo => {
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoItem.dataset.id = todo.id;


        todoItem.innerHTML = `
        <label></label>
        <div>${todo.title}</div>
        <div class = "todo-actions">
            <button>Edit</button>
            <button>Delete</button>
        </div>`

        dom.todosList.appendChild(todoItem);
    });


};



export default {
    init,
    setupEventListeners,
    renderProjects,
    renderTodos,

};
