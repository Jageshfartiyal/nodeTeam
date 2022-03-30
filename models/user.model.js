const mongoose = require('mongoose')

const User = new mongoose.Schema({
		firstName: {
			 type: String
			 },
		lastName: {
				type: String
				},	 
		empId: {
				type: String
				},
		 email: {
			type: String,
			unique: [true, "email already exists in database!"],
			lowercase: true,
			trim: true,
			validate: {
			  validator: function (v) {
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
			  },
			  message: '{VALUE} is not a valid email!'
			}
		
		  },
		  contact:{
			type:String
		  },
		  designation: {
			type: String,
			
		  },
		  country: {
			type: String,
			
		  },
		  timeZone: {
			type: String,
			
		  },
		password: { 
			type: String,
			
			 },
		created: {
			type: Date,
			default: Date.now
			}
		
	}
)


const model = mongoose.model('UserData', User)


module.exports = model
