import AbstractView from "./AbstractView.js";
export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle('My To Do List');
    }
    async getPage(){
        return `
        <form class="logOut" action="/api/logout" method="post">
                <button type="submit">Logout</button>
            </form>
            <form id="taskForm">
                <label for="task">Add Task</label>
                <input type="text" id="task" name="task" required>
                <button id="addTaskBtn">Add Task</button>
            </form>
            <div id="taskOutput"></div>
    `;
    }
    async addEventListeners(){
        const taskForm = this.container.querySelector("#taskForm");
        const taskOutput = this.container.querySelector("#taskOutput");
        const addTaskBtn = this.container.querySelector("#addTaskBtn");

        addTaskBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const taskInput = taskForm.querySelector("#task");
            const taskValue = taskInput.value;

            taskOutput = `Task: ${taskValue}`;
            taskInput.value = '';
        } )
    }
}



