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
};

//Setup event listeners
const setupEventListeners = () => {
    
    //Submission of Add Project Form

};

export default {
    init,
};
