import AbstractView from "./AbstractView.js";
export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle('My To Do List');
    }
    async getPage(){
        return `
        <form class="logOut" action="/api/logout" method="post">
              <button type="submit" translateKey= "LogOut">Logout</button>
        </form>
        <div id="taskInpDiv">
              <p id="add" translateKey= "AddTask">Add Task</p>
              <br>
              <input type="text" id="toDoInp" name="task" required>
              <button id="addTaskButton" translateKey ="AddTask">Add Task</button>
        </div>
        <br>
        <div id="taskDiv"></div>
    `;
    }
}



