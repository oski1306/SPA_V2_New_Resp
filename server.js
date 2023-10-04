const express = require('express');
const server = express();
const path = require('path');
const {dbConnect, registerUser, loginUser, addTask, displayTasks} = require('./public/script/usersDB.js');
const {authorization, authorizedUser} = require('./public/script/authorization.js');

server.use(express.urlencoded({extended : true}));
server.use(express.json());

server.use('/script', express.static(path.resolve(__dirname, 'public', 'script')));

server.get('/mainview', authorization, (req,res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

server.get('/api/gettasks', authorization, async (req, res) => {
    const sessionID = req.sessionID;
    const username = authorizedUser[sessionID].username;

    try {
        const tasks = await displayTasks(username);
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Failed to fetch tasks:', error.message);
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

server.get('/*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'public' , 'index.html'));
});

server.post('/api/registerform', async (req,res) =>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    await dbConnect();

    const regSuccess = await registerUser(username, email, password);

    if(regSuccess){
        res.redirect('/loginform')
    } else {
        res.redirect('/registerfailed')
    }

    
});

server.post('/api/loginform', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await dbConnect();

    const loginSuccess = await loginUser(username, password);

    if (loginSuccess){
        const sessionID = req.sessionID;
        authorizedUser[sessionID] = {username : username};
        res.redirect('/mainview');
    } else {
        res.redirect('/loginfailed');
    };
});

server.post('/api/logout', (req,res) => {
    const sessionID = req.sessionID;
    delete authorizedUser[sessionID];
    res.redirect('/');
})

server.post('/api/addtask', authorization, async (req, res) => {
    const sessionID = req.sessionID;
    const username = authorizedUser[sessionID].username; 

    const taskTxt = req.body.taskTxt;

    try {
        await addTask(username, taskTxt);

        res.status(200).json({ message: 'Task added successfully' });
    } catch (error) {
        console.error('Failed to add task:', error.message);
        
        res.status(500).json({ error: 'Failed to add task' });
    }
});

server.listen(8080, ()  => {
    console.log('Server is running on port 8080');
});

