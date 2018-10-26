/* homework1
 * Aaron Santucci
 * CS 336
 */

const express = require('express')
const app = express()
const port = 3000

var people = JSON.parse(`
[
    {"id": "0", "firstName": "Aaron", "lastName":"Santucci", "startDate": "1996-05-10T23:18:10.328Z"},
    {"id": "1", "firstName": "Neil", "lastName":"Sutherland", "startDate": "1998-07-10T23:18:10.328Z"},
    {"id": "2", "firstName": "David", "lastName":"O'Brien", "startDate": "1995-08-05T23:18:10.328Z"}
]
`);

app.get('/people', (req, res) => {
    res.json(people);
});

app.get('/person/:id', (req, res) => {
    var request = req.params.id;
    var response = getPerson(req.params.id);
    if (response != "404") {
        res.json(response);
    } else {
        res.sendStatus(404);
    }
});

app.get('/person/:id/name', (req, res) => {
    var request = req.params.id;
    var response = getName(req.params.id);
    if (response != "404") {
        res.json(response);
    } else {
        res.sendStatus(404);
    }
});

app.get('/person/:id/years', (req, res) => {
    var years = getYears(req.params.id);
    if (years != "404") {
        res.json(years);
    } else {
        res.sendStatus(404);
    }
});

function getPerson(id) {
    for (var i = 0; i < people.length; i++) {
        if (people[i].id == id) {
            return people[i];
        }
    }
    return '404';
}

function getName(id) {
    for (var i = 0; i < people.length; i++) {
        if (people[i].id == id) {
            return (people[i].firstName + " " + people[i].lastName);
        }
    }
    return '404';
}

function getYears(id) {
    var today = new Date();
    for (var i = 0; i < people.length; i++) {
        if (people[i].id == id) {
            var startDate = new Date(people[i].startDate)
            var numYears = (Math.floor((today - startDate) / (1000*60*60*24*365)));
            return numYears;
        }
    }
    return '404';
}

app.all("*", (req, res) => {
    res.sendStatus(404);
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));