import AbstractView from "./AbstractView.js";
export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle('Register')
    }
    async getPage(){
        return `
        <a href='/' class="backBtn" data-link> ← </a>
        <form>
          <label for="email">E-Mail:</label><br>
          <input type="text" id="email" name="email"><br>
          <label for="uname">Username:</label><br>
          <input type="text" id="uname" name="uname"><br>
          <label for="password">Password:</label><br>
          <input type="text" id="password" name="password">
        </form>
    `;
    }
}