const mongoose = require('mongoose');

const schema = mongoose.Schema;

userSchema = new schema({
	name: String,
	email: String,
	phoneNo: String,
	dob: String,
	password: String,
});

User = mongoose.model('User', userSchema);

module.exports = User;
