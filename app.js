'use strict'

//var vm2Formula = require('./vm2Formula');
var post = require('./post');

const birds = require('./birds')
const parseFormulaGet = require('./parseFormulaGet')
const parseFormula = require('./parseFormula')

// Requiring module
const express = require('express');

// Creating express object
const app = express();
app.use(express.json());

// Handling GET request
app.get('/', (req, res) => {
    res.send('A simple Node App is '
        + 'running on this server')
    res.end()
})
 
// Port Number
const PORT = process.env.PORT ||5000;
 
// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));

// Simple Example of Get Rest API
app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});

// Simple vm2 example
// const vm = require('vm');
// let result = vm.runInNewContext('a + 3', {a: 2});
// console.log(result);

// Parse pricing formula
//  (cost / (1 - margin / 100))
app.get("/parseFormulaSimple", (req, res, next) => {
    let result = vm.runInNewContext('(50 / ( 1 - 32 / 100))');
    res.json(result);
});

//app.get('/vm2Formula', vm2Formula.parse);
//app.get('/posts', post.list);

app.use('/birds', birds);

app.use('/parseFormulaGet', parseFormulaGet);

app.use('/parseFormula', parseFormula);
