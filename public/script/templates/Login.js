import AbstractView from "./AbstractView.js";
export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle('MyToDoList')
    }
    async getPage(){
        return `
        <h2 class="LoginTitle" translateKey= "Homepage"> Log In Or Register New User</h2>
        <br>
        <div class="Login">
          <a href='/loginform' class="loginBtn" data-link translateKey= "HomepageLogin"> Log In </a>
          <br>
          <br>
          <a href='/registerform' class="registerBtn" data-link translateKey= "HomepageRegister"> Register </a>
        </div>
    `;
    }
}