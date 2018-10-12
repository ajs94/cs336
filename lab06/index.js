/* lab06
 * Aaron Santucci
 * CS 336
 */

var express = require('express')
var app = express()
var httpStatus = require('http-status-codes');
var bodyParser = require('body-parser');
var port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/request', function(req, res) {
	res.sendStatus(httpStatus.OK);
});

app.head('/request', function(req, res) {
	res.sendStatus(httpStatus.CREATED);
});

app.put('/request', function(req, res) {
	res.send("json: " + req.body.arg + "\n");
});

app.post('/request', function(req, res) {
    res.send("json: " + req.body.arg + "\n");
});

app.post('/forms', function (req, res) {
	res.send('Got a post request from /forms \nPosted message:'
	+ req.body.user_name + '@' + req.body.user_email + ' says: ' + req.body.user_message + '\n');
});

app.delete('/request', (req, res) => {
	res.sendStatus(httpStatus.OK);
});

app.all("*", (req, res) => {
    res.sendStatus(httpStatus.NO_CONTENT);
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));