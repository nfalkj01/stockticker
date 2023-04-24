const express = require("express");

const app  = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/", (req, res) => {
    const input = req.body.input;
    console.log(input);
    
});