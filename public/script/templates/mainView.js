import AbstractView from "./AbstractView.js";
export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle('My To Do List');
    }
    async getPage(){
        return `
           <div class="container">
              <h1> Your To Do Lists </h1>
              <button id="btn">Click Me</button>
            </div>
    `;
    }
}



