const express = require('express');
const server = express();
const path = require('path');
const client = require('./usersDB.js');

server.use('/script', express.static(path.resolve(__dirname, 'public', 'script')));

server.get('/*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'public' , 'index.html'));
});

server.post('/api/registerForm', (res,req) =>{

})

server.listen(8080)

client.connect();