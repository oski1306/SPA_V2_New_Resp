import AbstractView from "./AbstractView.js";
export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle('MyToDoList')
    }
    async getPage(){
        return `
        <h2 class="LoginTitle"> Log In Or Register New User</h2>
        <br>
        <div class="Login">
          <a href='/loginForm' class="loginBtn" data-link> Log In </a>
          <br>
          <br>
          <a href='/registerForm' class="registerBtn" data-link> Register </a>
        </div>
    `;
    }
}