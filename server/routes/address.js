/**
 * Created by aronthomas on 11/16/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/address_order_db'

router.get('/names', function(req,res){
    pg.connect(connectionString, function(err,client){
        client.query("SELECT * FROM users", function(err,result){
            res.send(result.rows);
        })
    })
});

router.get('/addresses', function(req,res){
   console.log(req.query);
    pg.connect(connectionString, function(err,client){
        client.query("SELECT * FROM addresses WHERE addresses.user_id = $1", [req.query.id], function(err,result){
            if(err){
                console.log(err)
            }
            console.log(result);
            res.send(result.rows);
        })
    })
});

router.get('/order', function(req,res){
    var user = req.query;
    pg.connect(connectionString, function(err,client){
        client.query("SELECT users.name, addresses.*, orders.* " +
            "FROM orders " +
            "JOIN addresses " +
            "ON addresses.address_id = orders.ship_address_id " +
            "JOIN users " +
            "ON users.id = orders.user_id " +
            "WHERE orders.user_id = $1 " +
            "AND orders.order_date > $2 " +
            "AND orders.order_date < $3",
            [user.id, user.startDate.slice(0,10),user.endDate.slice(0,10)]
            , function(err,result){
            if(err){
                console.log(err)
            }
            //console.log(result);
            res.send(result.rows);
        })
    })
});

module.exports = router;