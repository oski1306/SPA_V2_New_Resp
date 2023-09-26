const express = require('express');
const server = express();
const path = require('path');
const {dbConnect, registerUser, loginUser} = require('./usersDB.js');

server.use(express.urlencoded({extended : true}));

server.use('/script', express.static(path.resolve(__dirname, 'public', 'script')));

server.get('/*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'public' , 'index.html'));
});

server.post('/api/registerform', async (req,res) =>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    await dbConnect();

    await registerUser(username, email, password);

    res.redirect('/loginform')
});

server.post('/api/loginform', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await dbConnect();

    const loginSuccess = await loginUser(username, password);

    if (loginSuccess){
        res.redirect('/mainview');
    } else {
        res.redirect('/');
    };
});

server.listen(8080, ()  => {
    console.log('Server is running on port 8080');
});

