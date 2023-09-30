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
           <div class="container">
              <h1> Your To Do Lists </h1>
              <button id="btn">Click Me</button>
            </div>
    `;
    }
}



