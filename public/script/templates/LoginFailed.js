import AbstractView from "./AbstractView.js";
export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle('MyToDoList')
    }
    async getPage(){
        return `
        <p class="loginFail" translateKey= "LogInFail">Username or Password Incorrect!</p>
        <br>
        <h2 class="LoginTitle" translateKey= "LogInFail2"> Log In Or Register New User</h2>
        <br>
        <div class="Login">
          <a href='/loginform' class="loginBtn" data-link translateKey= "LogInFail3"> Log In </a>
          <br>
          <br>
          <a href='/registerform' class="registerBtn" data-link translateKey= "LogInFail4"> Register </a>
        </div>
    `;
    }
}