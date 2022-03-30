const mongoose = require('mongoose')

const Project=new mongoose.Schema({
	projectName: {
		type: String
		},
	projectId: {
			type: String
			},
	domain:{
		type:String
	},
	projectLead:{
		type:String
	}
})

const model1 = mongoose.model('ProjectData', Project)
module.exports= model1