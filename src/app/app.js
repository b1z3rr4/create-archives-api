const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET');
    app.use(cors());
    next();
});

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});
