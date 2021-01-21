var express = require('express');
var router = express.Router();
var generate = require('./../public/javascripts/generator');
var userState = require('./../public/javascripts/state');
var userState1 = new userState();

router.get('/', function (req, res, next) {
    res.send(userState1.getState())
})

router.post('/', function(req, res, next) {
    console.log("POST INVOKED")
    var newState = userState1.checkNote(req.body.note)
    res.send(newState)
})

module.exports=router;