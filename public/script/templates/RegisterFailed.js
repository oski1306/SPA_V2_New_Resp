import AbstractView from "./AbstractView.js";
export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle('MyToDoList')
    }
    async getPage(){
        return `
        <p class="regFail" translateKey= "Regfail">Username or Password Already in Use!</p>
        <br>
        <h2 class="LoginTitle" translateKey ="Regfail2"> Log In Or Register New User</h2>
        <br>
        <div class="Login">
          <a href='/loginform' translateKey= "Regfail3" class="loginBtn" data-link> Log In </a>
          <br>
          <br>
          <a href='/registerform' translateKey= "Regfail4" class="registerBtn" data-link> Register </a>
        </div>
    `;
    }
}