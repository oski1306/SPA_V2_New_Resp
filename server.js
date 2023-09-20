const express = require('express');
const server = express();
const path = require('path');

server.use('/script', express.static(path.resolve(__dirname, 'public', 'script')));

server.get('/*', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'public' , 'index.html'));
});

server.listen(8080)