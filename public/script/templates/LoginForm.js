import AbstractView from "./AbstractView.js";
export default class extends AbstractView{
    constructor(){
        super();
        this.setTitle('Log In')
    }
    async getPage(){
        return `
        <a href='/' class="backBtn" data-link> ← </a>
        <br>
        <br>
        <br>
        <form action="/api/loginform" method="post">
        <label for="uname" translateKey="uName">Username:</label><br>
        <input type="text" id="uname" name="username" required><br>
        <label for="password" translateKey="Password">Password:</label><br>
        <input type="password" id="password" name="password" required><br>
        <br>
        <input type="submit" value="Log In">
    </form>
    `;
     }
}