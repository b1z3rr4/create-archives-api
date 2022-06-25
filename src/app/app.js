const express = require('express');
const cors = require('cors');
const app = express();

const {
    createArchive
} = require('../services/index');

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET');
    app.use(cors());
    next();
});

app.post('/:name', (req, res)=>{
    const { name } = req.params;
    const { content } = req.body;

    const archive = {
        name: name,
        content: content
    }
    createArchive(archive);
    res.send('<html><head><title>POST</title></head><body><h1>Sucesso!</h1></body></html>');
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});
