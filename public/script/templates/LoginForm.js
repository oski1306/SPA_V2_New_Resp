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
          <input type="text" id="uname" name="fname" required><br>
          <label for="password">Password:</label><br>
          <input type="password" id="password" name="lname" required><br>
          <br>
          <input type="submit" value="Log In">
        </form>
    `;
     }
}