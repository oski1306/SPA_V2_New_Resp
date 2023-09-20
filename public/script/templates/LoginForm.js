import AbstractView from "./AbstractView.js";
export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle('Log In')
    }
    async getPage(){
        return `
        <a href='/' class="backBtn" data-link> ← </a>
        <form>
          <label for="uname">Username:</label><br>
          <input type="text" id="uname" name="fname"><br>
          <label for="password">Password:</label><br>
          <input type="text" id="password" name="lname">
        </form>
    `;
     }
}