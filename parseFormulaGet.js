'use strict'

const vm = require('vm');

var formula = '(50 / ( 1 - 32 / 100))';

const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time of /parseFormulaGet api called: ', Date.now())
  next()
})
// parse the formula and return
router.get('/', (req, res) => {
  let result = vm.runInNewContext(formula);
  console.log("result: ", result);
  let response = {
    result: result,
    status: "success"
  }
  res.send(response);
})

module.exports = router