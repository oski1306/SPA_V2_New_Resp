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

            const delBtn = document.createElement('button');
            delBtn.textContent = '✔';
            delBtn.className = 'delete-task-button';
            delBtn.dataset.taskListId = task.task_list_id;

            taskContainer.appendChild(delBtn);
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
    if (e.target.classList.contains('delete-task-button')) {
        const taskListId = e.target.dataset.taskListId;
        const response = await fetch(`/api/deletetask/${taskListId}`, {
            method : 'DELETE',
        });
        if (response.ok) {
            console.log('Task Deleted!');
            window.location.reload();
        } else {
            console.error('Failed to delete task!')
        }
    }
});
    router();
})

//// Translate Module\\\\

const defLocalization = "en";


let localization;

let translate = {};

document.addEventListener("DOMContentLoaded", ()=>{
    setLocale(defLocalization);
    langSwitcher(defLocalization);
});

function langSwitcher(initialValue){
    const switcher = 
    document.querySelector("[changeLanguage]");
    switcher.value = initialValue;
    switcher.onchange = (e) => {
        setLocale(e.target.value);
    }
}

async function setLocale(newLocalization){
    if (newLocalization=== localization) return;
    const newTranslate =
     await fetchTranslateFor(newLocalization);
    localization = newLocalization;
    translate = newTranslate;
    translatePage();
}

async function fetchTranslateFor(newLocalization){
    const response = await fetch("./script/lang/" + newLocalization + ".json");
    return await response.json();
}

function translatePage(){
    document
    .querySelectorAll("[translateKey]")
    .forEach(translateTxt);
}

function translateTxt(word){
    const key = word.getAttribute("translateKey");
    const translation = translate[key];
    word.innerText = translation;
};
