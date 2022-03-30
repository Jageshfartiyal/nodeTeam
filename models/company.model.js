const mongoose = require('mongoose')

const Company=new mongoose.Schema({
	companyId: {
			type: String
			},
    companyName:{
        type: String
    },
    companyProject:{
        type: String
    },
    created: {
             type: Date,
             default: Date.now
             }
	
})

const model2 = mongoose.model('CompanyData',Company)
module.exports= model2