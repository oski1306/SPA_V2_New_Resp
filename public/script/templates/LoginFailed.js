import AbstractView from "./AbstractView.js";
export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle('MyToDoList')
    }
    async getPage(){
        return `
        <p class="loginFail">Username or Password Incorrect!</p>
        <br>
        <h2 class="LoginTitle"> Log In Or Register New User</h2>
        <br>
        <div class="Login">
          <a href='/loginform' class="loginBtn" data-link> Log In </a>
          <br>
          <br>
          <a href='/registerform' class="registerBtn" data-link> Register </a>
        </div>
    `;
    }
}