var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');

var messages = [
  { text: "Hi", owner: "Turant" },

  { text: "Jonas is crying", owner: "Murthy" },
];
var users = [{
	firstName:"a",
	id:0,
	email: 'a',
	password:'a'
}];

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

var api = express.Router();
var auth= express.Router();

api.get("/messages", (req, res) => {
  res.json(messages);
});



api.get("/messages/:user", (req, res) => {
  var user = req.params.user;
  var result = messages.filter((message) => message.owner == user);
  res.json(result);
});

api.post("/messages", (req, res) => {
  messages.push(req.body);
  res.json(req.body);
});

auth.post("/login", (req,res)=>{
	var user =users.find(user=>{
	console.log(user);
	console.log(req.body);
	console.log(req.url);
	return user.email==req.body.email;
	});
	if (!user) sendAuthError(res);
	if (user.password == req.body.password) sendToken(user,res);
	else sendAuthError(res);
});



function sendAuthError(res){
	return res.json({success: false, message: "Email or Password Incorrect"});
}

auth.post("/register",(req,res)=>{
	
	var index =users.push(req.body)-1;
	var user = users[index];
	user.id=index;
	
	sendToken(user,res);
	
});
function sendToken(user,res){
	var token = jwt.sign(user.id,'123');
	res.json({firstName:user.firstName, token});
}

app.use("/api", api);
app.use("/auth", auth);
app.listen(63145);
