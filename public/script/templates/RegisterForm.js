import AbstractView from "./AbstractView.js";
export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle('Register')
    }
    async getPage(){
        return `
        <a href='/' class="backBtn" data-link> ← </a>
        <h2 class="registerTxt" translateKey = "Register" >Register New User:</h2>
        <br>
        <form action="/api/registerForm" method="POST">
          <label for="username" translateKey= "RegisterUname" > Username: </label>
          <input type="text" id="username" name="username" required>
          <br>
          <br>
          <label for="email" translateKey="RegisterEmail" > Email: </label>
          <input type="email" id="email" name="email" required>
          <br>
          <br>
          <label for="password" translateKey= "RegisterPassword"> Password: </label>
          <input type="password" id="password" name="password" required>
          <br>
          <br>
          <input type="submit" value="Register">        
        </form>
    `;
    }
}