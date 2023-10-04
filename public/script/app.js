import Login from "./templates/Login.js";
import LoginForm from "./templates/LoginForm.js";
import RegisterForm from "./templates/RegisterForm.js";
import mainView from "./templates/mainView.js";
import RegisterFailed from "./templates/RegisterFailed.js";
import LoginFailed from "./templates/LoginFailed.js";

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
        },
        {
            path:'/registerfailed',
            view: RegisterFailed
        },
        {
            path: '/loginfailed',
            view: LoginFailed
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
    if (location.pathname === '/mainview') {
        await viewTasks();
    }

};

async function viewTasks() {
    const response = await fetch('/api/gettasks');
    if (response.ok) {
        const toDoTasks = await response.json();
        const taskDiv = document.querySelector('#taskDiv');
        taskDiv.innerHTML = '';

        toDoTasks.forEach((task) => {
            const taskContainer = document.createElement('div');
            taskContainer.textContent = task.tasks;
            taskDiv.appendChild(taskContainer);
        });
    } else {
        console.error('Failed to fetch tasks!');
    };
};

window.addEventListener('DOMContentLoaded', ()=>{
    document.body.addEventListener('click', e =>{
        if(e.target.matches('[data-link]')){
            e.preventDefault();
            redirect(e.target.href);
        }
    });

document.querySelector('#app').addEventListener('click', async (e)  => {
    if (e.target.id === 'addTaskButton'){
        e.preventDefault();
        const taskInp = document.querySelector('#toDoInp');
        const taskTxt = taskInp.value.trim();

        if (taskTxt !== '') {
            const response = await fetch('/api/addtask', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({taskTxt}),
            });
            if (response.ok) {
                console.log('Task Added Successfully!');
                window.location.reload();
            } else {
                console.error('Failed to add task!');
            };
            taskInp.value = '';
        };
    };
});
    router();
})
