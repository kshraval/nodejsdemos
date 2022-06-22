'use strict'

//const vm = require('vm');     // This is using vm
const {VM} = require('vm2');    // This is using vm2
const express = require('express');
const router = express.Router();
const _isEmpty = require('lodash.isempty');
var _get = require('lodash.get');
var _isundefined = require('lodash.isundefined');
var _isnull = require('lodash.isnull');

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Entry /parseFormula');
  next();
})

// POST gets json bodies
router.post('/', express.json(), (req, res) => {

  //check request json is sent
  if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
    let response = {
      result: -9.9999,
      status: "failure",
      description: "Bad Request: Missing JSON Request Object"
    }
    console.log('Exit /parseFormula with error: Bad Request: Object missing');
    res.send(response);
  }else if(_isundefined(req.body.pricing_formula) || _isEmpty(req.body.pricing_formula) || _isnull(req.body.pricing_formula)) {
    let response = {
      result: -9.9999,
      status: "failure",
      description: "Bad Request: Required request parameter is null, undefined or empty"
    }
    console.log('Exit /parseFormula with error: pricing_formula is null, undefined or empty');
    res.send(response);
  }else{
    let pricingFormula = _get(req,"body.pricing_formula",{});

    // To Do: Express.js Logging
    let result = -9.999;
    try{
      //result = vm.runInNewContext(pricingFormula, {}, {timeout: 20});           // This is using vm
      result = new VM({timeout: 20}).run(pricingFormula);                         // This is using vm2
      let response = {
        result: result,
        status: "success"
      }
      console.log('Exit /parseFormula with success');
      res.send(response);  
    }catch (err){
      let response = {
        result: -9.9999,
        status: "failure",
        description: "Error in processing expression"
      }
      console.log('Exit /parseFormula with error in processing expression', err);
      res.send(response);
    }
  }
})

module.exports = router