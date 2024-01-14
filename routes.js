const express = require('express');
const User = require('./db/models/user');

const router = express.Router();

router.get('/', function (req, res, next) {
	return res.render('index.ejs');
});

router.post('/', function(req, res, next) {
	console.log(req.body);
	
	var data = req.body;

	User.findOne({ email: data.email }, function(err, user) {
		if(user) {
			res.send({"Failure": "Email already in use"});
		} else {
			var newUser = new User({
				name: data.name,
				email: data.email,
				phoneNo: data.phoneNo,
				dob: data.dob,
				password: data.password[0]
			});

			newUser.save(function(err, user) {
				if (err) {
					console.log('Error in saving user data:');
					console.log(err);
					res.send({"Failure": "Registration unsuccessful<br />Please try again later"});
				} else
					res.send({ "Success": "You are registered and may login now" });
			});
		}
	});
});

router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});

router.post('/login', function (req, res, next) {
	//console.log(req.body);

	User.findOne({ email: req.body.email }, function(err, user) {
		if (!user) {
			res.send({ "Failure": "Entered email is not registered" });
		} else {
			if(user.password != req.body.password) {
				res.send({ "Failure": "Incorrect password" });
			} else {
				//res.send({ "Success": "Login successful"});

				res.send({
					"name": user.name, 
					"email": user.email,
					"phoneNo": user.phoneNo,
					"dob": user.dob
				});
			}
		}
	});
});

router.get('/forgotpass', function (req, res, next) {
	res.render("forgot.ejs");
});

router.post('/forgotpass', function (req, res, next) {
	//console.log(req.body);

	User.findOne({ email: req.body.email }, function(err, user) {
		if (!user) {
			res.send({ "Failure": "Entered email is not registered" });
		} else {
			user.password = req.body.password[0];

			user.save(function(err, user) {
				if (err) {
					console.log('Error in saving user data:');
					console.log(err);
					res.send({"Failure": "Password updation unsuccessful<br />Please try again later"});
				} else
					res.send({ "Success": "Password changed successfully" });
			});
		}
	});
	
});

module.exports = router;
