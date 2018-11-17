/* Aaron Santucci
 * CS 336
 * Homework 3
 * server.js is the javascript server and contains the Person object
 */

// Server stuff
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var http_status = require('http-status-codes');
var app = express();
var MongoClient = require('mongodb').MongoClient
// https://www.w3schools.com/nodejs/ref_assert.asp
var assert = require('assert');
var db;

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //for req.body... and in ajax form.serialize()
app.use(express.static('public'));

// global array and ID count for Person objects
var IDCount = 0;

function getIDCount(){
	IDCount++;
	return IDCount - 1;
}

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// given in homework1:	http://jsfiddle.net/codeandcloud/n33RJ/
function calcAge(dateString) {
	var today = new Date();
	var birthDate = new Date(dateString);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
};

// get all people from db
app.get('/people', function(req, res) {
	db.collection("people").find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		res.json(docs);
	});
});

app.post('/people', function (req, res) {
	var newPerson = {
		id: 		Date.now(),
		firstName: 	req.body.firstName,
		lastName: 	req.body.lastName,
		startDate: 	req.body.startDate,
	};
	db.collection("people").insertOne(newPerson, function(err,result){
		assert.equal(err, null);
		var newID = result.id;
		db.collection("people").find({_id: newID}).next(function(err, doc) {
			res.json(doc);
		});
	});
});

// get a person with an ID
app.get('/person/:id', function(req,res){
	var tempID = parseInt(req.params.id);
	db.collection("people").findOne({"id":tempID},function(err, docs) {
		assert.equal(err, null);
		res.json(docs);
	});
});

// edit person with an ID
app.put('/person/:id', function(req,res){
	var tempID = parseInt(req.params.id);
	db.collection("people").updateOne({"id":tempID},{
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		startDate: Date.now(),
	},
	function(err, result) {
		assert.equal(err, null);
		var newID = result.id;
		db.collection("people").find({_id: newID}).next(function(err, doc) {
			res.json(doc);
		});
	});
});

// delete person with ID
app.delete('/person/:id', function(req,res){
	var tempID = parseInt(req.params.id);
	db.collection("people").remove({"id":tempID},function(err, docs) {
		assert.equal(err, null);
		res.send('Person ID ' + req.params.id + ' deleted');
	});
});

// find person by years
app.get('/person/:id/years', function(req,res){
	var tempID = parseInt(req.params.id);
	db.collection("people").findOne({"id":tempID},function(err, docs) {
		assert.equal(err, null);
		res.json(calcAge(docs.startDate));
	});
});

// find person by lastName
app.get('/person/:id/name', function(req,res){
	var tempName = parseInt(req.params.lastName);
	db.collection("people").findOne({"lastName":tempName},function(err, docs) {
		assert.equal(err, null);
		res.send('Person ID ' + req.params.id + ' accessed through person/id/name!');
	});
});

app.all('*', function (req, res) {
	res.sendStatus(http_status.NOT_FOUND);
});

var mongoURL = 'mongodb://cs336:' + process.env.MONGO_PASSWORD + '@ds255253.mlab.com:55253/cs336';
MongoClient.connect(mongoURL, function(err, dbConnection) {
	if (err) {
		throw err;
	}
	db = dbConnection;
	
	app.listen(app.get('port'), function() {
    	console.log('Server started: http://localhost:' + app.get('port') + '/');
	});
});