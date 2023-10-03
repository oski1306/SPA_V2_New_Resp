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
        <div>
              <p id="add">Add Task</p>
              <input type="text" id="toDoInp" name="task" required>
              <button id="addTaskButton">Add Task</button>
        </div>
        <div id="taskDiv"></div>
    `;
    }
}



