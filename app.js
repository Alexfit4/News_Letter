const express = require("express");
const request = require("body-parser");
const bodyParser = require("body-parser");
const path = require("path");

const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Allows you to use static files css and images
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;

	const data = {
		members: [
			{
				email_address: email,
				status: "subscribed",
				merge: {
					FNAME: firstName,
					LNAME: lastName,
				},
			},
		],
	};

	const jsonData = JSON.stringify(data);

	const url = "https://us7.api.mailchimp.com/lists/8f48ac5080";

	const options = {
		method: "POST",
		auth: "amir:0d425565a1fb0983d8cb12139e3f754b-us7",
	};
	const request = https.request(url, options, (response) => {
		response.on("data", (data) => {
			console.log(JSON.parse(data));
		});
	});

	request.write(jsonData);
	request.end();
});

app.listen(3000, (req, res) => {
	console.log(" server is running on port 3000");
});

// List Id: 8f48ac5080
