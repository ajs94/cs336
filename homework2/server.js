/* Aaron Santucci
 * CS 336
 * Homework 2
 * server.js is the javascript server and contains the Person object
 */

// global array and ID count for Person objects
people = [];
var IDCount = 0;

function getIDCount(){
	IDCount++;
	return IDCount - 1;
}

//Person object
function Person(firstName, lastName, sDate) {
	this.firstName=firstName;
	this.lastName=lastName;
	this.id=getIDCount();
	this.startDate=sDate;
}

// Example data from my homework 1
people.push(new Person('Aaron', 'Santucci', "1996-5-10"));
people.push(new Person('Neil', 'Sutherland', "1998-10-7"));
people.push(new Person('David', 'Obrien', '1995-8-5'));

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


// Server stuff
const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser');
var http_status = require('http-status-codes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //for req.body... and in ajax form.serialize()
app.use(express.static('public'));

app.get('/', function(req, res) {
	res.send('Person Server Directories:' + '</br>' +
		'/people' + '</br>' +
		'/person/id' + '</br>' +
		'/person/id/years' + '</br>' +
		'/person/id/name' + '</br>' +
		'/getPerson.html' + '</br>' +
		'/addPerson.html');
});

app.get('/people', (req, res) => {
    res.json(people);
});

app.post('/people', function (req, res) {
	people.push(new Person(req.body.firstName, req.body.lastName, req.body.startdate));
	res.json(people[people.length-1]);
	console.log("Person posted on /people.");	
});

app.post('/addperson', function(req, res) {
	people.push(new Person(req.body.firstName, req.body.lastName, req.body.startDate));
	res.json(people[people.length-1]);
	console.log("Person added");
});

app.get('/person/:id', function(req,res){
	for (var i = 0; i < people.length; i++) {
		if (people[i].id == req.params.id) {
			res.json(people[i]);
			console.log('Person ID ' + req.params.id + ' accessed through person/id');
			return;
		}
	}
	res.sendStatus(404);
});

app.put('/person/:id', function(req,res){
	for (var i = 0; i < people.length; i++) {
		if (people[i].id == req.params.id) {
			people[i].firstName=req.body.firstName;
			people[i].lastName=req.body.lastName;
			people[i].startDate=req.body.startDate;
			res.json(people[i]);
			console.log('Person ID ' + req.params.id + ' put');
			return;
		}
	}
	res.sendStatus(404);
});

app.delete('/person/:id', function(req,res){
	for (var i = 0; i < people.length; i++) {
		if (people[i].id == req.params.id) {
			people.splice(i,i+1);
			console.log('Person ID ' + req.params.id + ' deleted');
			return;
		}
	}
	res.sendStatus(404);
});

app.get('/person/:id/years', function(req,res){
	for (var i = 0; i < people.length; i++) {
		if (people[i].id == req.params.id) {
			res.json(calcAge(people[i].startDate));
			console.log('Person ID ' + req.params.id + ' accessed through person/id/year');
			return;
		}
	}
	res.sendStatus(404);	
});

app.get('/person/:id/name', function(req,res){
	for (var i = 0; i < people.length; i++) {
		if (people[i].id == req.params.id) {
			res.json(people[i].firstName + ' ' + people[i].lastName);
			console.log('Person ID ' + req.params.id + ' accessed through person/id/name!');
			return;
		}
	}
	res.sendStatus(404);
});

app.all('*', function (req, res) {
	res.sendStatus(http_status.NOT_FOUND);
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));