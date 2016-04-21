// Client-side code                                                             
/* jshint browser: true, jquery: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing    : true */
// Server-side code                                                             
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */
"use strict";


var bodyParser = require("body-parser");
var express = require("express");
var mongoose = require("mongoose");
var app = express();

// Mongoose Schema definition                                                   
var Schema = mongoose.Schema;
var LinkSchema = new Schema({
    title: String,
    link: String,
    clicks: {
        type: Number,
        default: 0
    },
    __v: {
        type: Number,
        select: false
    }
});

// Mongoose Model definition                                                    
var Link = mongoose.model("Link", LinkSchema);

app.use(bodyParser.json());

app.get("/links", function(req, res) {
    Link.find({}, "-_id", function(err, data) {
        if (err !== null) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

// Respond to /click/:title and redirect                                        

app.get("/click/:title", function(req, res) {
    var link;
    Link.findOne({
        title: req.params.title
    }, function(err, body) {
        if (err !== null) {
            res.send(err);
        } else if (body === null) {
            res.send("value not found");
        } else {
            link = body.link;
            console.log(body);
            console.log("LINK is: " + link);
            // Increment the counter by 1                                           
            Link.update({
                title: req.params.title
            }, {
                $inc: {
                    clicks: 1
                }
            }, function(err, data) {
                console.log(data);
                if (err !== null) {
                    res.send(err);
                }
            });
            res.redirect(link);
        }
    });
});

// Respond to /links and display that exists in db                              

app.post("/links", function(req, res) {

    var newLink = new Link({
        "title": req.body.title,
        "link": req.body.link
    });
    newLink.save(function(error, result) {
        if (error !== null) {
            console.log(error);
            res.send(error);
        } else {
            res.json(result);
        }
    });
});


var port = 3000;
app.listen(port, function() {
    console.log("listening on http://localhost:", port);
    // Connection to Mongodb                                                       
    var mongoURI = "mongodb://localhost/mydb";
    var MongoDB = mongoose.connect(mongoURI).connection;
    MongoDB.on("error", function(err) {
        console.log(err.message);
    });
    MongoDB.once("open", function() {
        console.log("mongodb connection open");
    });
});
