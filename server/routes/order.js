/**
 * Created by aronthomas on 11/16/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/address_order_db'

router.get('/', function(req,res){
    res.send(true);
});

module.exports = router;