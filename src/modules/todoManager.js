import Project from "./project";
import Todo from "./todo";

//Background logic for the todo list

let projects = [];

//Default project
const initialize = () => {
    if (projects.length === 0) {
        addProject('Default', 'Default project for todos');
    }
    return projects;
}

//Add project function
const addProject = (name, description) => {
    const project = new Project(name, description);
    projects.push(project);

    return project; 
};

//Delete project from project array
const deleteProject = (projectId) => {
    projects = projects.filter(project => project.id !== projectId);
};

//Return all projects in project array
const getAllProjects = () => {
    return projects;
};





export default {
    initialize,
    addProject,
    getAllProjects,
    deleteProject,

};