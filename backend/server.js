var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var messages = [
  { text: "Hi", owner: "Turant" },
  { text: "Jonas is crying", owner: "Murthy" },
];

var questions = [
  {
    value: "First textbox",
    key: "dropdown1",
    label: "Kindly provide the values",
    required: true,
    controlType: "dropdown",
    type: "",
    options: [
      { key: "solid", value: "Solid" },
      { key: "great", value: "Great" },
      { key: "good", value: "Good" },
      { key: "unproven", value: "Unproven" },
    ],
    order: 3,
  },
  {
    value: "First textbox",
    key: "dropdown1",
    label: "Kindly provide the values",
    required: true,
    controlType: "dropdown",
    type: "",
    options: [
      { key: "solid", value: "Solid" },
      { key: "great", value: "Great" },
      { key: "good", value: "Good" },
      { key: "unproven", value: "Unproven" },
    ],
    order: 3,
  },
];

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
api.get("/messages", (req, res) => {
  res.json(messages);
});

api.get("/questions", (req, res) => {
  res.json(questions);
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
app.use("/api", api);
app.listen(63145);
