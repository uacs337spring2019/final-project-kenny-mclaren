const express = require("express");
const app = express();

const bodyParser = require ('body-parser');
const jsonParser = bodyParser.json();

const fs = require("fs");

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", 
		"Origin, X-Requested-With, Content-Type, Accept");
 	next();
})

app.use(express.static('public'));

app.post ('/', jsonParser, function (req, res) {
	let used = false;
	let passed = false;
	let cleared = false;
	const text = req.body.sup;
	const user = req.body.user;
	const pass = req.body.pass;
	let unicorns = fs.readdirSync('unicorns');
	for (var e = unicorns.length - 1; e >= 0; e--) {
		let thisUnicorn = fs.readFileSync('unicorns/' + unicorns[e], 'utf8');
		if (thisUnicorn == user) {
			used = true;
		}
	}
	let puppies = fs.readdirSync('puppies');
	for (var y = puppies.length - 1; y >= 0; y--) {
		let thisPuppy = fs.readFileSync('puppies/' + puppies[y], 'utf8');
		if (thisPuppy == pass) {
			passed = true;
		}
	}
	console.log(used);
	console.log(passed);
	if (used && passed) {
		cleared = true;
	}
	if (cleared) {
		let currentNum = fs.readFileSync('numbers.txt', 'utf8');
		let thisNum = parseInt(currentNum) + 1;
		let newNum = thisNum.toString();
		let fileName = 'posts/' + newNum + '.txt';
		fs.writeFile('numbers.txt', newNum, function(err) {
			if (err) {
				return console.log(err);
			}
			console.log("Numbers updated");
		});
		fs.writeFile(fileName, text, function(err) {
			if (err) {
				return console.log(err);
			}
			console.log("Post created!");
		});
		res.send("Post created!");
	}
	else {
		res.send("Incorrect Login");
	}
});

app.get('/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	let posts = fs.readdirSync('posts');
	let jsend = {};
	for (var i = posts.length - 1; i >= 0; i--) {
		let sendText = fs.readFileSync('posts/' + posts[i], 'utf8');
		jsend[i] = sendText;
	}
	res.send(jsend);
})

app.listen(3014);
