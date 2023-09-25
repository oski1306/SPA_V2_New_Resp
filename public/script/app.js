import Login from "./templates/Login.js";
import LoginForm from "./templates/LoginForm.js";
import RegisterForm from "./templates/RegisterForm.js";
import mainView from "./templates/mainView.js";

const redirect = url =>{
    history.pushState(null,null,url);
    router();
}
const router = async()=>{
    const routes = [
        {
            path: '/',
            view: Login
        },
        {
            path: '/loginform',
            view: LoginForm
        },
        {
            path: '/registerform',
            view: RegisterForm
        },
        {
            path:'/mainview',
            view: mainView
        }

    ];
    const potentialMatches = routes.map(route =>{
        return{
            route: route,
            isMatch: location.pathname === route.path
        }
    });
    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)

    if(!match){
         match = {
            route : routes[0]
         }
    }

    const view = new match.route.view();
    document.querySelector('#app').innerHTML = await view.getPage();

};

window.addEventListener('DOMContentLoaded', ()=>{
    document.body.addEventListener('click', e =>{
        if(e.target.matches('[data-link]')){
            e.preventDefault();
            redirect(e.target.href);
        }
    })
    router();
})