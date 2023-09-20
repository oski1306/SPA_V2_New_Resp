import AbstractView from "./AbstractView.js";
export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle('Register')
    }
    async getPage(){
        return `
        <a href='/' class="backBtn" data-link> ← </a>
        <h2 class="registerTxt">Register New User:</h2>
        <br>
        <form action="/registerForm" method="POST">
          <label for="email"> Email: </label>
          <input type="email" id="email" name="email" required>
          <br>
          <label for="username"> Username </label>
          <input type="text" id="username" name="username" required>
          <br>
          <label for="password"> Password: </label>
          <input type="password" id="password" name="password" required>
          <br>
          <input type="submit" value="Register">        
        </form>
    `;
    }
}